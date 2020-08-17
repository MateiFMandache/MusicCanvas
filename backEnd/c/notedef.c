typedef struct {
    int start_frame;
    double frequency;
    short max_amplitude;
    double time_position;

    // timbre
    int num_snapshots;
    double * timbre_times;
    double ** timbres;
    // position
    double timbre_position;
    int timbre_index;
    // width of time between previous and next mini-timbres
    double timbre_width;

    // dynamics frofile
    int dyn_points;
    double * dyn_times;
    double * dyn_volumes;
    //position
    int dyn_index;
    // width of time between previous and next control points
    double dyn_width;
} Note;
