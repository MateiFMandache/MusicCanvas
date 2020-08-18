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

    // pitch bend
    // flag for whether pitch bend is used
    int use_bend;
    int bend_points;
    double * bend_times;
    double * bend_deviations;
    // position
    int bend_index;
    // width of time between previous and next control points
    double bend_width;

    // vibrato
    // flag for whether vibrato is used
    int use_vib;
    // flag for whether rate is given as a function
    int rate_function;
    double rate;
    int rate_points;
    double * rate_times;
    double * rate_rates;
    // flag for whether range is given as a function
    int range_function;
    double range;
    int range_points;
    double * range_times;
    double * range_ranges;
    int vib_points;
    double * vib_times;
    double * vib_displacements;
    // position
    int rate_index;
    // width of time between previous and next control points
    double rate_width;
    int range_index;
    // width of time between previous and next control points
    double range_width;
    int vib_index;
    double vib_position;
    // width of time between previous and next control points
    double vib_width;

    //tremolo
    // flag for whether tremolo is used
    int use_trem;
    // flag for whether rate is given as a function
    int trate_function;
    double trate;
    int trate_points;
    double * trate_times;
    double * trate_rates;
    int trem_points;
    double * trem_times;
    double * trem_volumes;
    // position
    int trate_index;
    // width of time between previous and next control points
    double trate_width;
    int trem_index;
    double trem_position;
    // width of time between previous and next control points
    double trem_width;
} Note;
