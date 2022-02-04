#!/bin/bash
# shellcheck disable=SC2207
PROJECTS=$(jq -r '.projects[] | select(.type == "application") | .root' ./nest-cli.json)
echo $PROJECTS
BOOTSTRAP_PATH=src/bootstrap.yaml
CONFIG_PATH=config.app.yaml

echo "Service Registration system started"

for PROJECT_DIR in ${PROJECTS} ; do
  echo $PROJECT_DIR
  if [ ! -f "./${PROJECT_DIR}/${BOOTSTRAP_PATH}" ]; then
    echo "./${PROJECT_DIR}/${BOOTSTRAP_PATH} not found, skipping service"
    continue
  fi

  SVC_NAME=$(yq e '.service.name' ./"${PROJECT_DIR}"/${BOOTSTRAP_PATH} )

  echo "Registering ${SVC_NAME}"

  if [ ! -f "./${PROJECT_DIR}/${CONFIG_PATH}" ]; then
    echo "./${PROJECT_DIR}/${CONFIG_PATH} not found, skipping service"
    continue
  fi

  echo "**** ${PROJECT_DIR}"

  consul kv put trackterra/config/"${SVC_NAME}" \@./"${PROJECT_DIR}"/${CONFIG_PATH}
done

echo "Service Registration system completed"
