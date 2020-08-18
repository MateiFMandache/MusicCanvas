#define PY_SSIZE_T_CLEAN
#include <Python.h>
#include <math.h>

// maximum number of notes that can play at a time
#define MAX_CONCURRENCY 16

#define TIMBRE_RESOLUTION 100
#define FRAME_RATE 44100

#include "notedef.c"
#include "extractdata.c"
#include "freenote.c"
#include "writewave.c"


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
            if (!write_notewave(active_notes[i], frames_to_write, wave)) {
                // if note hasn't finished yet...
                still_playing_notes[still_playing_index] = notes[i];
                still_playing_index++;
            }
        }
    }

    // add on wavefunction for new notes
    for (int i = 0; i < number_of_notes; i++) {
        notes[i] = (Note * ) malloc(sizeof(Note));
        extract_data(PyTuple_GetItem(notes_data, i), notes[i]);
        if (!write_notewave(notes[i], frames_to_write, wave))  {
            // if note hasn't finished yet...
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
