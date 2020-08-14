import wave
import math
import wavefunc

FRAME_RATE = 44100
DURATION = 3

timbre1 = tuple([math.sin(2 * math.pi * x) for x in range(101)])
note1 = {
    "start_frame": 10_000,
    "max_amplitude": 10_000
}
note2 = {
    "start_frame": 5_000,
    "max_amplitude": 10_000
}
note_data = (note1, note2)

audio = wave.open("test.wav", 'wb')
audio.setnchannels(1)
audio.setsampwidth(2)
audio.setframerate(FRAME_RATE)
audio.setnframes(DURATION * FRAME_RATE)
byte_list = wavefunc.wavefunc(FRAME_RATE*DURATION, note_data)
audio.writeframes(byte_list)
audio.close()
