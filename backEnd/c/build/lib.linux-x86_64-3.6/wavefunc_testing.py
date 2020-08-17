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
        "num_snapshots": 2,
        "times": (0.2, 0.7),
        "snapshots": (timbre2, timbre1)
    },
    "dynamics_profile": {
        "num_points": 3,
        "times": (0.0, 0.5, 1.0),  # First time must be 0.0
        "volumes": (0.0, 1.0, 0.0)
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
byte_list2 = wavefunc.wavefunc(FRAME_RATE, note_data)
byte_list3 = wavefunc.wavefunc(FRAME_RATE, note_data)
print(time.time() - start)
audio.writeframesraw(byte_list1)
audio.writeframesraw(byte_list2)
audio.writeframesraw(byte_list3)
audio.close()
