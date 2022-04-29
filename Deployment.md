<h2>  
Deployment
</h2>
<p> 
  The app can be deployed with/out docker.
</p>  
<p align="center"></p> 

## Prerequisits
- Clone the repository
```bash
git clone https://github.com/trackterraorg/trackterra-api.git
```
Create a .env file and copy contents of .env.sample file to .env and configure the parameters based on your setup
<br>  

## Using Docker
- Install docker
```bash
sudo apt install docker.io
```
- Install docker compose
Refer to [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) tutorial to install docker compose.
Make sure the version is 2.2.3

- Navigate to trackterra-api directory after clone or your custom directory
```bash
cd trackterra-api
```

- Build and run using docker compose
```bash
docker-compose --project-directory=. -f docker-compose.dev.yml up --build
```

## Without Docker

- Install mongo 5
    - Follow the link  [this](https://thishosting.rocks/install-mongodb-ubuntu/) tutorial.
    - Make sure you see v5 or newer after running 
    ```bash
        mongo --version
    ```

- Install redis
    - Follow the link  [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) tutorial.
    - Or sudo apt install redis-server

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

- Navigate to trackterra-api directory after clone or your custom directory
```bash
cd trackterra-api
```

- Install modules 
```bash
yarn install
```

## Running the app  

Run in production mode
```bash
yarn start:prod
```

Run in dev mode
```bash
yarn start:dev
```

## Test API
- The services should be up and running
    - Navigate to <IP/Domain>:2052/docs to view swagger ui
    - Navigate to <IP/Domain>:2052/graphql to view graphql

- After navigating to swagger try to parse a wallet by
    - Navigating to /api/v1/wallets/parse/{address} section of the docs
    - Click on the url to collapse the view
    - Click on try it out to parse a wallet
    - Enter wallet address and execute to see the result

## UI
Refer to the instruction [here](https://github.com/trackterraorg/trackterra-ui/blob/main/README.md) to deploy UI