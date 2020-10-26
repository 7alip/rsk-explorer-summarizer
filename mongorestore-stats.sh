#! /bin/bash

mongorestore --host localhost:27017 --gzip --archive=./MongoDBMainNet.gz --nsInclude=blockDB_1_1_5.statsCollection