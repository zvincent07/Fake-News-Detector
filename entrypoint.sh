#!/bin/bash
export PYTHONPATH=$PYTHONPATH:$(pwd)
gunicorn run:app 