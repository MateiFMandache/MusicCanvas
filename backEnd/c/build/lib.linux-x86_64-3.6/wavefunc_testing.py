import wave
import math
import time
import wavefunc

FRAME_RATE = 44100
DURATION = 3

timbre1 = [math.sin(2 * math.pi * x/100) for x in range(101)]
timbre2 = [1 - 2*((x/100)-math.floor(x/100)) for x in range(101)]
note1 = {
    "start_frame": 10_000,
    "max_amplitude": 5000.0,
    "frequency": 440,
    "timbre": {
        "num_snapshots": 1,
        "times": (0.2,),
        "snapshots": (timbre1,)
    },
    "dynamics_profile": {
        "num_points": 4,
        "times": (0.0, 0.1, 2.2, 2.3),  # First time must be 0.0.
        # Last time represents note finished.
        "volumes": (0.0, 1.0, 1.0, 0.0)
    },
    "use_pitch_bend": 0,
    "pitch_bend": {
        "num_points": 3,
        "times": (0.3, 0.5, 0.9),
        "cent_deviations": (0.0, 30.0, 0.0)
    },
    "use_vibrato": 0,
    "vibrato": {
        "rate_function": 1,  # flag for whether to use function
        "rate": 4.0,
        "rate_points": 2,
        "rate_times": (0.8, 0.8),
        "rate_rates": (0.0, 2.0),
        "range_function": 1,  # flag for whether to use function
        "range": 30.0,
        "range_points": 2,
        "range_times": (0.7, 2.0),
        "range_ranges": (15.0, 75.0),
        "shape_points": 4,
        "shape_times": (0.0, 0.25, 0.75, 1.0),
        # shape_times must start at 0.0 and end at 1.0
        "shape_displacements": (0.0, 1.0, -1.0, 0.0)
    },
    "use_tremolo": 1,
    "tremolo": {
        "rate_function": 1,  # flag for whether to use function
        "rate": 4.0,
        "rate_points": 2,
        "rate_times": (0.8, 0.8),
        "rate_rates": (0.0, 6.0),
        "shape_points": 3,
        "shape_times": (0.0, 0.5, 1.0),
        # shape_times must start at 0.0 and end at 1.0
        "shape_volumes": (1.0, 0.0, 1.0)
    }
}
note_data = (note1,)

audio = wave.open("test.wav", 'wb')
audio.setnchannels(1)
audio.setsampwidth(2)
audio.setframerate(FRAME_RATE)
audio.setnframes(DURATION * FRAME_RATE)
start = time.time()
byte_list1 = wavefunc.wavefunc(FRAME_RATE, note_data)
byte_list2 = wavefunc.wavefunc(FRAME_RATE, ())
byte_list3 = wavefunc.wavefunc(FRAME_RATE, ())
print(time.time() - start)
audio.writeframesraw(byte_list1)
audio.writeframesraw(byte_list2)
audio.writeframesraw(byte_list3)
audio.close()
