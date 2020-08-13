from distutils.core import setup, Extension

setup(name="wavefunc",
      version="1.0",
      description="Computes wave function for given notes",
      ext_modules=[Extension("wavefunc", ["wavefuncmodule.c"])])
