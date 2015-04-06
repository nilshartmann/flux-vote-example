#! /bin/bash

# Workaround to make gulp use harmony features

iojs --harmony-classes `which gulp` $*

