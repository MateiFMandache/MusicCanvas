double timbre_factor(Note * note);

double dynamics_factor(Note * note, int * done);


int write_notewave(Note * note, int frames_to_write, short wave[]) {
    // Writes the wavefunction given by note to the wavefunction wave.
    // The wavefunctions get superimposed.
    // Returns true if the note finishes, false if it still needs to
    // play.
    for (int i = note->start_frame; i < frames_to_write; i++) {
        int note_finished = 0;
        double amplitude = note->max_amplitude;

        amplitude *= timbre_factor(note);
        amplitude *= dynamics_factor(note, &note_finished);
        if (note_finished) {
            freenote(note);
            return 1;
        }

        wave[i] += (short)amplitude;

        // update position variables
        double current_frequency = note->frequency;

        note->timbre_position += ((current_frequency) * TIMBRE_RESOLUTION / FRAME_RATE);
        while (note->timbre_position >= (double) TIMBRE_RESOLUTION)
            note->timbre_position -= (double) TIMBRE_RESOLUTION;
        note->time_position += 1.0 / FRAME_RATE;
    }
    // if this note continues to be played,
    // set start_frame to 0 and return false.
    note->start_frame = 0;
    return 0;
}

double timbre_factor(Note * note) {
    // update position in timbre profile
    int snapshots = note->num_snapshots;
    while (note->timbre_index < snapshots
           && note->time_position > note->timbre_times[note->timbre_index]) {
        note->timbre_index++;
        note->timbre_width = note->timbre_times[note->timbre_index]
                             - note->timbre_times[note->timbre_index - 1];
    }

    double time = note->time_position;
    double pos = note->timbre_position;
    // We linearly interpolate between two points in the timbre
    // profile.
    int timbre_point_one = (int) floor(pos);
    int timbre_point_two = timbre_point_one + 1;
    double timbre_coefficient_two = pos-timbre_point_one;
    double timbre_coefficient_one = 1-timbre_coefficient_two;
    int index = note->timbre_index;
    if (index == 0) {
        // before first timbre control point
        return (note->timbres[0][timbre_point_one]
                  * timbre_coefficient_one
                + note->timbres[0][timbre_point_two]
                  * timbre_coefficient_two);
    } else if (index == snapshots) {
        // after last timbre control point
        return (note->timbres[snapshots - 1][timbre_point_one]
                  * timbre_coefficient_one
                + note->timbres[snapshots - 1][timbre_point_two]
                  * timbre_coefficient_two);
    } else {
        // between two timbre control points. Linearly interpolate
        double snapshot_coefficient_two = (time - note->timbre_times[index-1])
                                          /note->timbre_width;
        double snapshot_coefficient_one = 1 - snapshot_coefficient_two;
        return ((note->timbres[index - 1][timbre_point_one]
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
}

double dynamics_factor(Note * note, int * done) {
    // update position in dynamics profile
    while (note->time_position > note->dyn_times[note->dyn_index + 1]) {
        note->dyn_index++;
        if (note->dyn_index == note->dyn_points - 1) {
            // note has finished playing
            *done = 1;
            return 0.0;
        }
        note->dyn_width = (note->dyn_times[note->dyn_index + 1]
                            - note->dyn_times[note->dyn_index]);
    }
    // calculate volume by linear interpolation
    double pos = note->time_position;
    int index = note->dyn_index;
    double volume_coefficient_two = (pos - note->dyn_times[index])/note->dyn_width;
    double volume_coefficient_one = 1 - volume_coefficient_two;
    /* printf("%f ", (note->dyn_volumes[index] * volume_coefficient_one
            + note->dyn_volumes[index + 1] * volume_coefficient_two)); */
    return (note->dyn_volumes[index] * volume_coefficient_one
            + note->dyn_volumes[index + 1] * volume_coefficient_two);
}
