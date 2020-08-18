void freenote(Note * note) {
    // function to be called when a note has finished
    // playing and its associated memory needs to be freed
    free(note->timbre_times);
    for (int i = 0; i < note->num_snapshots; i++) {
        free(note->timbres[i]);
    }
    free(note->timbres);

    free(note->dyn_times);
    free(note->dyn_volumes);

    if (note->use_bend) {
        free(note->bend_times);
        free(note->bend_deviations);
    }

    if (note->use_vib) {
        if (note->rate_function) {
            free(note->rate_times);
            free(note->rate_rates);
        }
        if (note->range_function) {
            free(note->range_times);
            free(note->range_ranges);
        }
        free(note->vib_times);
        free(note->vib_displacements);
    }

    if (note->use_trem) {
        if (note->trate_function) {
            free(note->trate_times);
            free(note->trate_rates);
        }
        free(note->trem_times);
        free(note->trem_volumes);
    }

    free(note);
}
