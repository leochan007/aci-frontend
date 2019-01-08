#!/bin/bash

set -x

docker stop local_test_stg

docker rm -v local_test_stg

docker run --name local_test_stg --publish 127.0.0.1:18090:80 \
  --detach \
  nexus.alphacario.com:8089/aci-frontend-ts-stg:v1
