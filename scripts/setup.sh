#!/bin/bash
# shellcheck disable=SC2207
PROJECTS=$(jq '.projects | keys[]' ./nest-cli.json)
echo "Service and Library build system started"

# npx nest build "service-wallet"
for VAR in ${PROJECTS} ; do
  # echo "----------------------------"
  BUIL_DCOMMAND="npx nest build ${VAR}" 
  eval $BUIL_DCOMMAND;
done

echo "Service and Library build system completed"
