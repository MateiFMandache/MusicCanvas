import sys
import wave
import struct
import json
from math import floor, ceil

FRAME_RATE = 44100
CHUNK_TIME = 2
CHUNK_SIZE = FRAME_RATE * CHUNK_TIME

# The arguments of the script should be the file path for the track data,
# followed by the path to the output pipe
file_path = sys.argv[1]
pipe_path = sys.argv[2]
with open(file_path, "r") as file:
    track_object = json.loads(file.read())

duration = track_object["duration"]
freq = track_object["frequency"]

number_of_frames = int(FRAME_RATE * duration)
frames_per_cycle = FRAME_RATE / freq
number_of_chunks = ceil(number_of_frames/CHUNK_SIZE)
last_chunk_size = number_of_frames - (number_of_chunks - 1) * CHUNK_SIZE

with open(pipe_path, "wb") as pipe:
    audio = wave.open(pipe, 'wb')
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(FRAME_RATE)
    audio.setnframes(number_of_frames)

    # keep track of amplitude of way and manipulate it step by step
    amplitude = 0
    for chunk_index in range(number_of_chunks):
        normalised_list = []
        # last chunk has different size to the others
        last_chunk = (chunk_index == number_of_chunks - 1)
        for _ in range(last_chunk_size if last_chunk else CHUNK_SIZE):
            normalised_list.append(floor(32760*amplitude))
            # amplitude ranges between -1 and 1
            amplitude += 2/frames_per_cycle
            if amplitude > 1:
                amplitude -= 2
        byte_list = b"".join([struct.pack('<h', x) for x in normalised_list])
        audio.writeframesraw(byte_list)
    try:
        audio.close()
    except OSError as err:
        # Ignore error that comes up because pipe is not seekable.
        # This error happens while wave checks to see if nframes is
        # correct, which it should be unless there's a bug.
        pass
print("All done")