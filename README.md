# MusicCanvas

The aim of this project is to create an app that allows users to create music by interacting with a simple yet powerful "Music canvas" GUI.
Currently, only the main function of the backend has been completed, while work on the front end is ongoing. Due to performance, not all of the back end is written in Python, as it is too slow. The performance-critical part of the program is written as a Python extension module in C. It deals with the actual calculation of the sound wave. The Python extension module has been completed, and includes support for fatures such as pitch bend, vibrato and tremolo.
