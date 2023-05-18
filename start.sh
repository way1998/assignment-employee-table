#!/bin/sh

# start express api
cd api
npm start &

# start react client
cd ../client
npm start &