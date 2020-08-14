#define PY_SSIZE_T_CLEAN
#include <Python.h>


typedef struct {
    int start_frame;
    short max_amplitude;
} Note;

void write_note(Note note, short result[], int frames_to_write) {
    for (int i = note.start_frame; i < frames_to_write; i++) {
        result[i] += note.max_amplitude;
    }
}

void extract_data(PyObject* note_data, Note* note) {
    note->start_frame = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "start_frame"));
    note->max_amplitude = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "max_amplitude"));
}

int write_notewave(Note * note, int frames_to_write, short wave[]) {
    for (int index = note->start_frame; index < frames_to_write; index++) {
        wave[index] += note->max_amplitude;
    }
    return 0;
}

static PyObject*
wavefunc(PyObject* self, PyObject* args)
{
    int frames_to_write;
    PyObject* notes_data;

    if (!PyArg_ParseTuple(args, "iO", &frames_to_write, &notes_data))
        return NULL;

    short output_nums[frames_to_write];

    for (int i = 0; i < frames_to_write; i++) {
        output_nums[i] = 0;
    }

    int number_of_notes = (int) PyTuple_Size(notes_data);

    Note * notes[number_of_notes];

    for (int i = 0; i < number_of_notes; i++) {
        notes[i] = (Note * ) malloc(sizeof(Note));
        extract_data(PyTuple_GetItem(notes_data, i), notes[i]);
        if (write_notewave(notes[i], frames_to_write, output_nums))
            free(notes[i]);
        else
            printf("remaining note");
    }

    char * output = (char *) &output_nums;

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
