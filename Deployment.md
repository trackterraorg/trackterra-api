<h2>  
Deployment
</h2>
<p> 
  The app can be deployed with/out docker. But it is highly recommend that docker is used due to complexity of the deployment process
</p>  
<p align="center"></p> 

## Prerequisits
- Install jq
```bash
apt install jq
```

- Install yq 4.18.1
```bash
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.18.1/yq_linux_amd64
sudo chmod a+x /usr/local/bin/yq
```

- Install docker
```bash
sudo apt install docker.io
```

- Install consul
```bash
apt install consul
```
Make sure you see v 1.5 or newer after running 
```bash
consul -v
```
## Using Docker

- Install docker compose
Refer to [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) tutorial to install docker compose.
Make sure the version is 2.2.3

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
This step usually takes several minutes the first time. 
```bash
docker-compose --env .env up
```
Once it is finished you will see the services keep restarting because they can not connect to mongo, redis. At this moment, go to the follwing the step once pulling the images finished.

- Instead of manually entering the configurations, we run this script to populate configs.
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
## Without Docker

- Run consul, mongo, redis, eventstore using docker
    ```bash
    consul agent -server -ui -node=server-1 -bootstrap-expect=1 -client=0.0.0.0 -bind=67.205.178.222 -data-dir=/var/lib/consul

    docker run -d -p 27017:27017 mongo
    
    docker run -d -p 6379:6379 redis

    docker run --name eventstore -it -d -p 2113:2113 -p 1113:1113 \
    eventstore/eventstore:release-5.0.8 --insecure --run-projections=All \
    --enable-external-tcp
    ```

- (optional) Refer to [this](https://learn.hashicorp.com/tutorials/consul/deployment-guide#configure-systemd) tutorial to setup service for consul

- Install node
    - Follow the option 2 section of  [this](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) tutorial.
    - Make sure you see v14 or newer after running 
    ```bash
        node -v
    ```

- Install yarn
    ```bash
    npm install --global yarn
    ```
    Make sure you see v 1.22.17 or newer after running 
    ```bash
        yarn -v
    ```

- Clone the repository
```bash
git clone https://github.com/trackterraorg/trackterra-api.git
```

- Navigate to trackterra-api directory after clone or your custom directory
```bash
cd trackterra-api
```

- Install modules 
```bash
apt-get install g++
sudo apt-get install -y build-essential python
yarn install
```

- Instead of manually entering the configurations, we run this script to populate configs.
```bash
sh scripts/register.sh
```

- Build the application
```bash
sh scripts/setup.sh
```

- Install pm2 or any process management tool
```bash
npm install pm2@latest -g
```

- Start the services
```bash
pm2 start dist/server/api-gateway/main.js
pm2 start dist/server/service-parser/main.js
pm2 start dist/server/service-contract/main.js
pm2 start dist/server/service-wallet/main.js
```

## Test API
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

## UI
Refer to the instruction [here](https://github.com/trackterraorg/trackterra-ui/blob/main/README.md) to deploy UI