double cent2factor(double cent_deviation);

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
    }

    // pitch bend
    note->use_bend = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "use_pitch_bend"));
    if (note->use_bend) {
        PyObject * bend_info = PyDict_GetItemString(note_data, "pitch_bend");
        note->bend_points = (int) PyLong_AsLong(
            PyDict_GetItemString(bend_info, "num_points"));
        PyObject* py_bend_times = PyDict_GetItemString(bend_info, "times");
        note->bend_times = (double *) malloc(note->bend_points * sizeof(double));
        for (int i = 0; i < note->bend_points; i++) {
            note->bend_times[i] = PyFloat_AsDouble(
                PyTuple_GetItem(py_bend_times, (Py_ssize_t) i));
        }
        PyObject* py_bend_deviations = PyDict_GetItemString(bend_info,
                                                            "cent_deviations");
        note->bend_deviations = (double *) malloc(note->bend_points * sizeof(double));
        for (int i = 0; i < note->bend_points; i++) {
            // convert from cents to factor
            note->bend_deviations[i] = cent2factor(PyFloat_AsDouble(
                PyTuple_GetItem(py_bend_deviations, (Py_ssize_t) i)));
        }
        note->bend_index = 0;
    }

    // vibrato
    note->use_vib = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "use_vibrato"));
    if (note->use_vib) {
        PyObject * vib_info = PyDict_GetItemString(note_data, "vibrato");
        note->rate_function = (int) PyLong_AsLong(
            PyDict_GetItemString(vib_info, "rate_function"));
        if (!note->rate_function) {
            // simple case: rate is just a number
            note->rate = PyFloat_AsDouble(
                PyDict_GetItemString(vib_info, "rate"));
        } else {
            // rate varies as given by some control points
            note->rate_points = (int) PyLong_AsLong(
                PyDict_GetItemString(vib_info, "rate_points"));
            note->rate_times = (double *) malloc(note->rate_points * sizeof(double));
            note->rate_rates = (double *) malloc(note->rate_points * sizeof(double));
            PyObject* py_rate_times = PyDict_GetItemString(vib_info, "rate_times");
            PyObject* py_rate_rates = PyDict_GetItemString(vib_info, "rate_rates");
            for (int i = 0; i < note->rate_points; i++) {
                note->rate_times[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_rate_times, (Py_ssize_t) i));
                note->rate_rates[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_rate_rates, (Py_ssize_t) i));
            }
            note->rate_index = 0;
        }
        note->range_function = (int) PyLong_AsLong(
            PyDict_GetItemString(vib_info, "range_function"));
        if (!note->range_function) {
            // simple case: range is just a number
            note->range = cent2factor(PyFloat_AsDouble(
                PyDict_GetItemString(vib_info, "range")));
        } else {
            // range varies as given by some control points
            note->range_points = (int) PyLong_AsLong(
                PyDict_GetItemString(vib_info, "range_points"));
            note->range_times = (double *) malloc(note->range_points * sizeof(double));
            note->range_ranges = (double *) malloc(note->range_points * sizeof(double));
            PyObject* py_range_times = PyDict_GetItemString(vib_info, "range_times");
            PyObject* py_range_ranges = PyDict_GetItemString(vib_info, "range_ranges");
            for (int i = 0; i < note->range_points; i++) {
                note->range_times[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_range_times, (Py_ssize_t) i));
                    // convert vibrato ranges from cents to factor
                note->range_ranges[i] = cent2factor(PyFloat_AsDouble(
                    PyTuple_GetItem(py_range_ranges, (Py_ssize_t) i)));
            }
            note->range_index = 0;
        }
        note->vib_points = (int) PyLong_AsLong(
            PyDict_GetItemString(vib_info, "shape_points"));
        note->vib_times = (double *) malloc(note->vib_points * sizeof(double));
        note->vib_displacements = (double *) malloc(note->vib_points * sizeof(double));
        PyObject* py_vib_times = PyDict_GetItemString(vib_info, "shape_times");
        PyObject* py_vib_displacements = PyDict_GetItemString(vib_info,
                                                                "shape_displacements");
        for (int i = 0; i < note->vib_points; i++) {
            note->vib_times[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_vib_times, (Py_ssize_t) i));
            note->vib_displacements[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_vib_displacements, (Py_ssize_t) i));
        }
        note->vib_index = 0;
        note->vib_position = 0.0;
        note->vib_width = note->vib_times[1] - note->vib_times[0];
    }

    //tremolo
    note->use_trem = (int) PyLong_AsLong(
        PyDict_GetItemString(note_data, "use_tremolo"));
    if (note->use_trem) {
        PyObject * trem_info = PyDict_GetItemString(note_data, "tremolo");
        note->trate_function = (int) PyLong_AsLong(
            PyDict_GetItemString(trem_info, "rate_function"));
        if (!note->trate_function) {
            // simple case: rate is just a number
            note->trate = PyFloat_AsDouble(
                PyDict_GetItemString(trem_info, "rate"));
        } else {
            // rate varies as given by some control points
            note->trate_points = (int) PyLong_AsLong(
                PyDict_GetItemString(trem_info, "rate_points"));
            note->trate_times = (double *) malloc(note->trate_points * sizeof(double));
            note->trate_rates = (double *) malloc(note->trate_points * sizeof(double));
            PyObject* py_trate_times = PyDict_GetItemString(trem_info, "rate_times");
            PyObject* py_trate_rates = PyDict_GetItemString(trem_info, "rate_rates");
            for (int i = 0; i < note->trate_points; i++) {
                note->trate_times[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_trate_times, (Py_ssize_t) i));
                note->trate_rates[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_trate_rates, (Py_ssize_t) i));
            }
            note->trate_index = 0;
        }
        note->trem_points = (int) PyLong_AsLong(
            PyDict_GetItemString(trem_info, "shape_points"));
        note->trem_times = (double *) malloc(note->trem_points * sizeof(double));
        note->trem_volumes = (double *) malloc(note->trem_points * sizeof(double));
        PyObject* py_trem_times = PyDict_GetItemString(trem_info, "shape_times");
        PyObject* py_trem_volumes = PyDict_GetItemString(trem_info, "shape_volumes");
        for (int i = 0; i < note->trem_points; i++) {
            note->trem_times[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_trem_times, (Py_ssize_t) i));
            note->trem_volumes[i] = PyFloat_AsDouble(
                    PyTuple_GetItem(py_trem_volumes, (Py_ssize_t) i));
        }
        note->trem_index = 0;
        note->trem_position = 0.0;
        note->trem_width = note->trem_times[1] - note->trem_times[0];
    }
}

// natural logarithm of a deviation of 1 cent
const double LOG_CENT = log(2) / 1200;

double cent2factor(double cent_deviation) {
    // converts a pitch deviation given in cents to a pitch bend factor
    return exp(cent_deviation * LOG_CENT);
}
