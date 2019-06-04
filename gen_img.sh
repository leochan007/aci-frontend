#!/bin/bash

set -x

source module_def.sh

if [ -n "$1" ]; then
  FLAG=$1
fi

if [ xstg = x"$2" ]; then
  img_name=$img_name-stg
fi

rm -rf dist && yarn

if [ xprod = x"$FLAG" ]; then
  echo 'build_prod...'
  make build_prod
elif [ xtestnet = x"$FLAG" ]; then
  echo 'build_testnet...'
  make build_testnet
elif [ xtestnet_stg = x"$FLAG" ]; then
  echo 'build_testnet_stg...'
  make build_testnet_stg
fi

docker rmi $img_name

docker rmi $PREFIX/$img_name:v1

docker build --no-cache -t $img_name .

docker tag $img_name:latest $PREFIX/$img_name:v1

#docker push nexus.alphacario.com:8089/aci-frontend:v1
