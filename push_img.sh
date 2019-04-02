#!/bin/bash

set -x

source module_def.sh

if [ -n "$1" ]; then
  FLAG=$1
fi

if [ -n "$2" ]; then
  img_name=$img_name-stg
fi

if [ "prod" == "$FLAG" ]; then
  FLAG=
fi

docker push $PREFIX/$img_name:v1
