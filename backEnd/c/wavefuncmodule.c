#define PY_SSIZE_T_CLEAN
#include <Python.h>

static PyObject*
wavefunc(PyObject* self, PyObject* args)
{
    static int current_frame = 0;

    int frames_to_write;
    PyObject* note_data;

    if (!PyArg_ParseTuple(args, "iO", &frames_to_write, &note_data))
        return NULL;

    short output_nums[frames_to_write];

    int i;
    for (i=0; i < frames_to_write; i++) {

        output_nums[i] = (short)22000;

        current_frame++;
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
