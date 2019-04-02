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

rm -rf dist && yarn && TESTNET=$FLAG yarn run build

docker rmi $img_name

docker rmi $PREFIX/$img_name:v1

docker build --no-cache -t ${img_name} .

docker tag ${img_name}:latest $PREFIX/$img_name:v1

#docker push nexus.alphacario.com:8089/aci-frontend:v1
