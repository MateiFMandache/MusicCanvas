import wave
import math
import wavefunc

FRAME_RATE = 44100
DURATION = 3

timbre1 = tuple([math.sin(2 * math.pi * x) for x in range(101)])
note1 = (440, ((0.0, timbre1),), ((0.0, 1.0), (2.5, 0.0)))
note2 = ()
note3 = ()
note_data = (1, (note1, ))

audio = wave.open("test.wav", 'wb')
audio.setnchannels(1)
audio.setsampwidth(2)
audio.setframerate(FRAME_RATE)
audio.setnframes(DURATION * FRAME_RATE)
byte_list = wavefunc.wavefunc(FRAME_RATE*DURATION, note_data)
audio.writeframes(byte_list)
audio.close()
