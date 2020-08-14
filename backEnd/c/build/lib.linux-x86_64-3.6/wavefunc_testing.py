import wave
import math
import wavefunc

FRAME_RATE = 44100
DURATION = 3

timbre1 = [math.sin(2 * math.pi * x/100) for x in range(101)]
timbre2 = [1 - 2*((x/100)-math.floor(x/100)) for x in range(101)]
note1 = {
    "start_frame": 10_000,
    "max_amplitude": 5_000,
    "frequency": 440,
    "timbre": {
        "num_snapshots": 2,
        "times": (0.3, 0.4),
        "snapshots": (timbre2, timbre1)
    }
}
note2 = {
    "start_frame": 5_000,
    "max_amplitude": 5_000,
    "frequency": 330,
    "timbre": {
        "num_snapshots": 1,
        "times": (0.0,),
        "snapshots": (timbre1,)
    }
}
note_data = (note2,)

audio = wave.open("test.wav", 'wb')
audio.setnchannels(1)
audio.setsampwidth(2)
audio.setframerate(FRAME_RATE)
audio.setnframes(DURATION * FRAME_RATE)
byte_list1 = wavefunc.wavefunc(FRAME_RATE, note_data)
byte_list2 = wavefunc.wavefunc(FRAME_RATE, note_data)
byte_list3 = wavefunc.wavefunc(FRAME_RATE, note_data)
audio.writeframesraw(byte_list1)
audio.writeframesraw(byte_list2)
audio.writeframesraw(byte_list3)
audio.close()
