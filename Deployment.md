<h2>  
Deploy
</h2>
<p> 
  The app can be deployed with/out docker. But it is highly recommend that docker is used due to complexity of the deployment process
</p>  
<p align="center"></p> 

## Using Docker

- Install docker
```bash
sudo apt install docker.io
```

- Install docker compose
Refer to [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) tutorial to install docker compose 

- Install jq
```bash
apt install jq
```

- Install yq 4.18.1
```bash
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.18.1/yq_linux_amd64
sudo chmod a+x /usr/local/bin/yq
```

- Clone the repository
```bash
git clone https://github.com/trackterraorg/trackterra-api.git
```

- Navigate to trackterra-api directory after clone or your custom directory
```bash
cd trackterra-api
```

- Create a .env file in the trackterra-api root and add the following variables
DOCKER_REGISTRY=registry.hub.docker.com
DOCKER_REPO=trackterra
IMAGE_TAG=latest

- Pull the images
```bash
docker-compose --env .env up
```

This step usually takes several minutes the first time.

- Install consul to use it's cli. Example: adding and remove keys
```bash
apt install consul
```
Note: do not run the consul on the host machine.

- Instead of manually entering the configs, we run this script to populate configs.
```bash
sh scripts/register.sh
```

After running this command you should be able to see this 
```bash
Service Registration system started
server/api-gateway
Registering io.trackterra.api.gateway
```

as well as other services

- Navigate to <IP/Domain>:8500 to view configurations
    - Navigate to Key/Value in the sidebar
    - Click trackterra then config in the list
    - You should see the config file for each service.

- It is required to make some changes to the config params to make sure that the services communicate with mongo, eventstore, redis.
    - Set the fcd node uri
    - In mongodb section, replace localhost with mongo
    - In eventstore section, replace localhost with eventstore
    - In redis section, replace localhost with redis
Make changes to other config params based on your custom configurations.
Repeat this process for all listed services.

- Restart containers to load new config changes
```bash
docker restart $(docker ps -q)
```

- It may be required to restart only wallet-service again
    - docker container ls (To view list of containers)
    - locate container id associated with wallet-service
    - docker restart <wallet-service-id>

- Navigate to cosul ui to view services
    - <IP/Domain>:8500
    - If all services are checked then continue from here otherwise revise the previous steps and make sure that you have not missed any of the above instructions

- The services should be up and running
    - Navigate to <IP/Domain>:2052/docs to view swagger ui
    - Navigate to <IP/Domain>:2052/graphql to view graphql

- After navigating to swagger try to parse a wallet by
    - Navigating to /api/v1/wallets/parse/{address} section of the docs
    - Click on the url to collapse the view
    - Click on try it out to parse a wallet
    - Enter wallet address and execute to see the result

- To further protect the node, cosul ui should be disabled by either
    - disabling port 8500 after your config is done
    - disable ui flag when running the container
    - protect it by setting u ACL which can be found here 
    https://www.consul.io/docs/security/acl