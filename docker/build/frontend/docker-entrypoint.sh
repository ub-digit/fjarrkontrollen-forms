#!/bin/bash

# The production/deploy entrypoint.
# Builds app for specific environment and serves through nginx.
set -e

# Specify a default command, in case it wasn't issued:
if [ -z "$1" ]; then set -- nginx -c /home/node/nginx.conf -p $PWD/dist "$@"; fi

# Run the build/serve routine if the command is 'http-server'
if [[ "$1" == "nginx" ]]; then
  # Build app
  set -x
  ember build --environment=$EMBER_ENVIRONMENT
fi
exec "$@"
