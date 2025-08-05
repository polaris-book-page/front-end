#!/bin/sh
cd ../
mkdir output
cp -R ./front-end/* ./output
rm -f ./output/README.md
cp -R ./output ./front-end/
