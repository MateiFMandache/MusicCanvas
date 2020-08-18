double timbre_factor(Note * note);

double dynamics_factor(Note * note, int * done);

double pitch_bend(Note * note);

double vibrato(Note * note);

double tremolo(Note * note);


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
        if (note->use_trem) {
            amplitude *= tremolo(note);
        }

        wave[i] += (short)amplitude;

        // update position variables
        double current_frequency = note->frequency;

        if (note->use_bend) {
            current_frequency *= pitch_bend(note);
        }
        if (note->use_vib) {
            current_frequency *= vibrato(note);
        }

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
    double pos = note->time_position;
    // update position in dynamics profile
    while (pos > note->dyn_times[note->dyn_index + 1]) {
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
    int index = note->dyn_index;
    double volume_coefficient_two = (pos - note->dyn_times[index])/note->dyn_width;
    double volume_coefficient_one = 1 - volume_coefficient_two;
    return (note->dyn_volumes[index] * volume_coefficient_one
            + note->dyn_volumes[index + 1] * volume_coefficient_two);
}

double pitch_bend(Note * note) {
    double pos = note->time_position;
    int points = note->bend_points;
    // update position. bend_index is index of NEXT control point.
    while (note->bend_index < points && pos > note->bend_times[note->bend_index]) {
        note->bend_index++;
        if (note->bend_index < points) {
            note->bend_width = (note->bend_times[note->bend_index]
                                - note->bend_times[note->bend_index - 1]);
        }
    }

    int index = note->bend_index;
    if (index == 0) {
        // before first control point
        return note->bend_deviations[index];
    } else if (index == points) {
        // after last control point
        return note->bend_deviations[index - 1];
    } else {
        // linearly interpolate between two control points
        double bend_coefficient_two = (pos - note->bend_times[index - 1])/note->bend_width;
        double bend_coefficient_one = 1 - bend_coefficient_two;
        return (note->bend_deviations[index - 1] * bend_coefficient_one
                + note->bend_deviations[index] * bend_coefficient_two);
    }
}

double vibrato(Note * note) {
    double pos = note->time_position;
    // current rate of vibrato
    double rate;
    if (!note->rate_function) {
        rate = note->rate;
    } else {
        // update position in rate function.
        // rate_index is index of NEXT control point.
        while (note->rate_index < note->rate_points
                && pos > note->rate_times[note->rate_index]) {
            note->rate_index++;
            note->rate_width = (note->rate_times[note->rate_index]
                                 - note->rate_times[note->rate_index - 1]);
        }
        int rate_index = note->rate_index;
        if (rate_index == 0) {
            // before first control point
            rate = note->rate_rates[rate_index];
        } else if (rate_index == note->rate_points) {
            // after last control point
            rate = note->rate_rates[rate_index - 1];
        } else {
            // between two control points. Linearly interpolate.
            double rate_coefficient_two = (pos - note->rate_times[rate_index - 1])
                                            /note->rate_width;
            double rate_coefficient_one = 1 - rate_coefficient_two;
            rate = (note->rate_rates[rate_index - 1] * rate_coefficient_one
                    + note->rate_rates[rate_index] * rate_coefficient_two);
        }
    }
    // current range of vibrato
    double range;
    if (!note->range_function) {
        range = note->range;
    } else {
        // update position in range function.
        // range_index is index of NEXT control point.
        while (note->range_index < note->range_points
                && pos > note->range_times[note->range_index]) {
            note->range_index++;
            note->range_width = (note->range_times[note->range_index]
                                 - note->range_times[note->range_index - 1]);
        }
        int range_index = note->range_index;
        if (range_index == 0) {
            // before first control point
            range = note->range_ranges[range_index];
        } else if (range_index == note->range_points) {
            // after last control point
            range = note->range_ranges[range_index - 1];
        } else {
            // between two control points. Linearly interpolate.
            double range_coefficient_two = (pos - note->range_times[range_index - 1])
                                            /note->range_width;
            double range_coefficient_one = 1 - range_coefficient_two;
            range = (note->range_ranges[range_index - 1] * range_coefficient_one
                    + note->range_ranges[range_index] * range_coefficient_two);
        }
    }
    // update index in vibrato shape
    while (note->vib_position > note->vib_times[note->vib_index + 1]) {
        note->vib_index++;
        if (note->vib_index == note->vib_points - 1) {
            // reached the end, so start again from begining
            note->vib_position -= 1.0;
            note->vib_index = 0;
        }
        note->vib_width = (note->vib_times[note->vib_index + 1]
                            - note->vib_times[note->vib_index]);
    }
    // find current displacement by linearly interpolating vib_displacements
    double displacement_coefficient_two = (note->vib_position
                                            - note->vib_times[note->vib_index])
                                            /note->vib_width;
    double displacement_coefficient_one = 1 - displacement_coefficient_two;
    double current_displacement = (note->vib_displacements[note->vib_index]
                                    * displacement_coefficient_one
                                    + note->vib_displacements[note->vib_index + 1]
                                    * displacement_coefficient_two);

    // increment position in vib shape
    note->vib_position += rate / FRAME_RATE;
    if (current_displacement > 0) {
        // linearly interpolate between 1 (original note) and
        // range (sharpest note) based on current displacement
        return 1 + (range - 1) * current_displacement;
    } else {
        // linearly interpolate between 1 (original note) and
        // 1/range (flattest note) based on current displacement
        return 1 + (1 - 1/range) * current_displacement;
    }
}

double tremolo(Note * note) {
    double pos = note->time_position;
    // current rate of tremolo
    double trate;
    if (!note->trate_function) {
        trate = note->trate;
    } else {
        // update position in rate function.
        // trate_index is index of NEXT control point.
        while (note->trate_index < note->trate_points
                && pos > note->trate_times[note->trate_index]) {
            note->trate_index++;
            note->trate_width = (note->trate_times[note->trate_index]
                                 - note->trate_times[note->trate_index - 1]);
        }
        int trate_index = note->trate_index;
        if (trate_index == 0) {
            // before first control point
            trate = note->trate_rates[trate_index];
        } else if (trate_index == note->trate_points) {
            // after last control point
            trate = note->trate_rates[trate_index - 1];
        } else {
            // between two control points. Linearly interpolate.
            double trate_coefficient_two = (pos - note->trate_times[trate_index - 1])
                                            /note->trate_width;
            double trate_coefficient_one = 1 - trate_coefficient_two;
            trate = (note->trate_rates[trate_index - 1] * trate_coefficient_one
                    + note->trate_rates[trate_index] * trate_coefficient_two);
        }
    }
    // update index in tremolo shape
    while (note->trem_position > note->trem_times[note->trem_index + 1]) {
        note->trem_index++;
        if (note->trem_index == note->trem_points - 1) {
            // reached the end, so start again from begining
            note->trem_position -= 1.0;
            note->trem_index = 0;
        }
        note->trem_width = (note->trem_times[note->trem_index + 1]
                            - note->trem_times[note->trem_index]);
    }
    // find current volume by linearly interpolating trem_volumes
    double volume_coefficient_two = (note->trem_position
                                     - note->trem_times[note->trem_index])
                                     /note->trem_width;
    double volume_coefficient_one = 1 - volume_coefficient_two;
    double current_volume = (note->trem_volumes[note->trem_index]
                             * volume_coefficient_one
                             + note->trem_volumes[note->trem_index + 1]
                             * volume_coefficient_two);

    // increment position in trem shape
    note->trem_position += trate / FRAME_RATE;

    return current_volume;
}
