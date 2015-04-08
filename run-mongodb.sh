#!/usr/bin/env bash

DIRNAME=`dirname $0`
DB_DIR=${DIRNAME}/mongodb-data

if [ "$1" == "clean" ]; then
	echo "Removing db dir $DB_DIR"
	rm -rf $DB_DIR
fi;

mkdir $DB_DIR
mongod  --dbpath $DB_DIR
