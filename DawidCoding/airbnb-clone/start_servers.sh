#!/bin/bash

# Ir a la carpeta de la API y ejecutar el servidor
cd api
npm run dev &

# Ir a la carpeta del cliente y ejecutar el servidor
cd ../client
npm run dev
