#define PY_SSIZE_T_CLEAN
#include <Python.h>
#include <math.h>

// maximum number of notes that can play at a time
#define MAX_CONCURRENCY 16

#define TIMBRE_RESOLUTION 100
#define FRAME_RATE 44100


typedef struct {
    int start_frame;
    double frequency;
    short max_amplitude;
    int num_snapshots;
    double * timbre_times;
    double ** timbres;
    double time_position;
    double timbre_position;
    int timbre_index;
    // width of time between previous and next mini-timbres
    double timbre_width;
} Note;

void extract_data(PyObject* note_data, Note* note) {
    note->start_frame = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "start_frame"));
    note->max_amplitude = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "max_amplitude"));
    note->frequency = PyFloat_AsDouble(
        PyDict_GetItemString(note_data, "frequency"));

    PyObject* timbre_info = PyDict_GetItemString(note_data, "timbre");

    int num_snapshots = (int) PyLong_AsLong(
        PyDict_GetItemString(timbre_info, "num_snapshots"));

    note->num_snapshots = num_snapshots;

    PyObject* py_timbre_times = PyDict_GetItemString(timbre_info, "times");
    note->timbre_times = malloc(num_snapshots * sizeof(double));
    for (int i = 0; i < num_snapshots; i++) {
        note->timbre_times[i] = PyFloat_AsDouble(
            PyTuple_GetItem(py_timbre_times, (Py_ssize_t) i));
    }
    PyObject* py_snapshots = PyDict_GetItemString(timbre_info, "snapshots");
    note->timbres = malloc(num_snapshots * sizeof(double *));
    for (int i = 0; i < num_snapshots; i++) {
        note->timbres[i] = malloc((TIMBRE_RESOLUTION + 1) * sizeof(double));
        PyObject * py_snapshot = PyTuple_GetItem(py_snapshots, (Py_ssize_t) i);
        for (int j = 0; j < TIMBRE_RESOLUTION + 1; j++) {
            note->timbres[i][j] = PyFloat_AsDouble(
                PyList_GetItem(py_snapshot, (Py_ssize_t) j));
        }
    }

    note->time_position = 0.0;
    note->timbre_position = 0.0;
    note->timbre_index = 0;
    note->timbre_width = 0.0;
}

int write_notewave(Note * note, int frames_to_write, short wave[]) {
    // Writes the wavefunction given by note to the wavefunction wave.
    // The wavefunctions get superimposed.
    // Returns true if the note finishes, false if it still needs to
    // play.
    for (int i = note->start_frame; i < frames_to_write; i++) {
        double amplitude = (double) note->max_amplitude;

        double time = note->time_position;

        int snapshots = note->num_snapshots;
        double pos = note->timbre_position;
        // We linearly interpolate between two points in the timbre
        // profile.
        int timbre_point_one = (int) floor(pos);
        int timbre_point_two = timbre_point_one + 1;
        int timbre_coefficient_two = pos-timbre_point_one;
        int timbre_coefficient_one = 1-timbre_coefficient_two;
        int index = note->timbre_index;
        if (index == 0) {
            // before first timbre control point
            amplitude *= (note->timbres[0][timbre_point_one]
                            * timbre_coefficient_one
                          + note->timbres[0][timbre_point_two]
                            * timbre_coefficient_two);
        } else if (index == snapshots) {
            // after last timbre control point
            amplitude *= (note->timbres[snapshots - 1][timbre_point_one]
                            * timbre_coefficient_one
                          + note->timbres[snapshots - 1][timbre_point_two]
                            * timbre_coefficient_two);
        } else {
            // between two timbre control points. Linearly interpolate
            double snapshot_coefficient_two = (time - note->timbre_times[index-1])
                                              /note->timbre_width;
            double snapshot_coefficient_one = 1 - snapshot_coefficient_two;
            amplitude *= ((note->timbres[index - 1][timbre_point_one]
                             * timbre_coefficient_one
                           + note->timbres[index - 1][timbre_point_two]
                             * timbre_coefficient_two) *
                             snapshot_coefficient_one
                          + (note->timbres[index][timbre_point_one]
                             * timbre_coefficient_one
                           + note->timbres[index][timbre_point_two]
                             * timbre_coefficient_two) *
                             snapshot_coefficient_two);
        }

        wave[i] += (short)amplitude;

        // update position variables

        note->timbre_position += ((note->frequency) * TIMBRE_RESOLUTION / FRAME_RATE);
        if (note->timbre_position >= 100.0)
            note->timbre_position -= 100.0;
        note->time_position += 1.0 / FRAME_RATE;
        while (note->timbre_index < snapshots
               && note->time_position > note->timbre_times[note->timbre_index]) {
            note->timbre_index++;
            note->timbre_width = note->timbre_times[note->timbre_index]
                                 - note->timbre_times[note->timbre_index - 1];
        }
    }
    // if this note continues to be played,
    // set start_frame to 0 and return false.
    note->start_frame = 0;
    return 0;
}

static PyObject*
wavefunc(PyObject* self, PyObject* args)
{
    int frames_to_write;
    PyObject* notes_data;

    if (!PyArg_ParseTuple(args, "iO", &frames_to_write, &notes_data))
        return NULL;
    // initialise wave function
    short wave[frames_to_write];

    for (int i = 0; i < frames_to_write; i++) {
        wave[i] = 0;
    }

    static Note * active_notes[MAX_CONCURRENCY];
    // flag representing if this is the start of the wavefunction
    static int first_run = 1;
    if (first_run) {
        for (int i = 0; i < MAX_CONCURRENCY; i++) {
            active_notes[i] = NULL;
        }
    }

    Note * still_playing_notes[MAX_CONCURRENCY];
    for (int i = 0; i < MAX_CONCURRENCY; i++) {
        still_playing_notes[i] = NULL;
    }
    int still_playing_index = 0;

    int number_of_notes = (int) PyTuple_Size(notes_data);

    Note * notes[number_of_notes];

    // add on wavefunction for notes that are still playing
    for (int i = 0; i < MAX_CONCURRENCY; i++) {
        if (active_notes[i] != NULL) {
            if (write_notewave(active_notes[i], frames_to_write, wave)) {
                free(notes[i]);
            } else {
                still_playing_notes[still_playing_index] = notes[i];
                still_playing_index++;
            }
        }
    }

    // add on wavefunction for new notes
    for (int i = 0; i < number_of_notes; i++) {
        notes[i] = (Note * ) malloc(sizeof(Note));
        extract_data(PyTuple_GetItem(notes_data, i), notes[i]);
        if (write_notewave(notes[i], frames_to_write, wave)) {
            free(notes[i]);
        } else {
            still_playing_notes[still_playing_index] = notes[i];
            still_playing_index++;
        }
    }

    for (int i = 0; i < MAX_CONCURRENCY; i++) {
        active_notes[i] = still_playing_notes[i];
    }

    first_run = 0;

    char * output = (char *) &wave;

    return PyBytes_FromStringAndSize(output, 2*frames_to_write);
}

static PyMethodDef WaveFuncMethods[] =
{
     {"wavefunc", wavefunc, METH_VARARGS,
     "Calculates the wave function for the input notes"},
     {NULL, NULL, 0, NULL}
};

static struct PyModuleDef wavefuncmodule = {
    PyModuleDef_HEAD_INIT,
    "easy",
    "Easy number function",
    -1,
    WaveFuncMethods
};


PyMODINIT_FUNC
PyInit_wavefunc(void)
{
     return PyModule_Create(&wavefuncmodule);
}
