#!/usr/bin/env bash
set -e

npm install
npm run seed:run:document
npm run start:dev
