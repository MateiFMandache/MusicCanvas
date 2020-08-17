void extract_data(PyObject* note_data, Note* note) {
    note->start_frame = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "start_frame"));
    note->max_amplitude = PyFloat_AsDouble(
        PyDict_GetItemString(note_data, "max_amplitude"));
    note->frequency = PyFloat_AsDouble(
        PyDict_GetItemString(note_data, "frequency"));

    note->time_position = 0.0;

    // timbre
    PyObject* timbre_info = PyDict_GetItemString(note_data, "timbre");

    int num_snapshots = (int) PyLong_AsLong(
        PyDict_GetItemString(timbre_info, "num_snapshots"));

    note->num_snapshots = num_snapshots;

    PyObject* py_timbre_times = PyDict_GetItemString(timbre_info, "times");
    note->timbre_times = (double *) malloc(num_snapshots * sizeof(double));
    for (int i = 0; i < num_snapshots; i++) {
        note->timbre_times[i] = PyFloat_AsDouble(
            PyTuple_GetItem(py_timbre_times, (Py_ssize_t) i));
    }
    PyObject* py_snapshots = PyDict_GetItemString(timbre_info, "snapshots");
    note->timbres = (double **) malloc(num_snapshots * sizeof(double *));
    for (int i = 0; i < num_snapshots; i++) {
        note->timbres[i] = (double *) malloc((TIMBRE_RESOLUTION + 1) * sizeof(double));
        PyObject * py_snapshot = PyTuple_GetItem(py_snapshots, (Py_ssize_t) i);
        for (int j = 0; j < TIMBRE_RESOLUTION + 1; j++) {
            note->timbres[i][j] = PyFloat_AsDouble(
                PyList_GetItem(py_snapshot, (Py_ssize_t) j));
        }
    }

    note->timbre_position = 0.0;
    note->timbre_index = 0;
    note->timbre_width = 0.0;

    // dynamics profile
    PyObject* dynamics_info = PyDict_GetItemString(note_data, "dynamics_profile");
    note->dyn_points = (int) PyLong_AsLong(
        PyDict_GetItemString(dynamics_info, "num_points"));
    PyObject* py_dyn_times = PyDict_GetItemString(dynamics_info, "times");
    note->dyn_times = (double *) malloc(note->dyn_points * sizeof(double));
    for (int i = 0; i < note->dyn_points; i++) {
        note->dyn_times[i] = PyFloat_AsDouble(
            PyTuple_GetItem(py_dyn_times, (Py_ssize_t) i));
    }
    PyObject* py_dyn_volumes = PyDict_GetItemString(dynamics_info, "volumes");
    note->dyn_volumes = (double *) malloc(note->dyn_points * sizeof(double));
    for (int i = 0; i < note->dyn_points; i++) {
        note->dyn_volumes[i] = PyFloat_AsDouble(
            PyTuple_GetItem(py_dyn_volumes, (Py_ssize_t) i));
    }
    note->dyn_index = 0;
    if (note->dyn_points >= 2) {
        note->dyn_width = note->dyn_times[1] - note->dyn_times[0];
    } else {
        note->dyn_width = 0.0;
    }
}
