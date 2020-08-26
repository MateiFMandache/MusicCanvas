#!/bin/bash
./node_modules/.bin/babel dev/jsx -d dev/js --presets react
./node_modules/.bin/babel dev/js -d js --presets env
