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

    free(note);
}
