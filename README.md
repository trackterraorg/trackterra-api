<h1 align="center">  
TrackTerra 
</h1>  
    
<p align="center"> 
  This repo is the backend app for the TrackTerra.
  It is built using microservice pattern with REST API & GraphQL API, based on Domain (DDD) using the command query responsibility segregation (CQRS) design pattern.
</p>  
    <p align="center">  
</p>  

## Parser library
The parser lib is the core component of the app. It transform, classify, parse, and export the parsed result to a format interpretable by other parts of the application. It does not store nor read any data from the app. It consists of the following components

### Protocols

The protocols are stored in yaml files located in protocols directory. Each protocol has it is own tx types which are defined in the protocol files. Missing any transaction type in protocol specific file will lead to using a Generic parser to handle the parsing process of the transaction. The attributes that defines each rule in the protocol transaction type are: 
 - name: name of the tx type
 - contract: the contract used to identify the tx type
 - shouldExistAttributes: the attributes that should exist in an event to mark it as the transaction type.
 - shouldNotExistAttributes: the attributes that should not exist in the event to mark it as the transaction type. It used in conjuction with the shouldExistAttributes attribute by the classifier.
 - contractAddressExtractKeys: this is used as the keys to extract the cotract and compare it to the above contract/s.
 - ignoreContract: Is used to ignore the contract comparison and depend on only other attributes.
 - description: the transaction description text
 - tag: the transaction tag.
 - skipForContracts: this attribute is especially useful when ignoring the contract. 
 - isEliminator: is used for transactions with multiple events. By turning this flag on we only account for the event with isElminitor attribute and ignore the other events.
 - requiresOtherEvents: each event is parsed individually. But some events may require data from other events. This way the event will have access to the data of other events.
### Transformer

Transforming the raw block data is the first step in the parsing process. There are two major classes that handle transformation which are event.transformer and log.transformer. 

The event transformer class handles each single events one by one. While the log transformer is a wrapper for the event class to pack and ship the transformed events to the classifier.

### Classifier

After the transformation process the parser uses the classifier class to identify the protocol and type of transactions. Without this step it is hard to assign a specific parser class to handle the parsing process of the events. 
### Parser

The parser component is used to parse the transformed data using the parserClass specified by the classifier. All parsers are located in processor dir. The parsers can be protocol specific or generic parsers. Most parser class utilize the Transfer and Swap engine to perform protocol specific parsing.
### Exporter

The final step is preparing the parsed data to be exported and used by other parts of the app. The exporter is useful to clean up the parsed data and add fees and taxes.
## Prerequists
 - node 14
 - redis
 - mongo 5
 
 These can be installed locally or using docker containers
## Installation  

install packages
```bash  
$ yarn install
```  

## Usage  
  
Mongodb, and redis all need to be started first as our application needs to connect to them.  

Start mongodb  
```bash  
mongod  
```  
  
If you have docker installed  
```bash  
docker run -d -p 27017:27017 mongo  
docker run -d -p 6379:6379 redis  
```  
  
Otherwise, you can install and run redis locally if you choose.  
  
## Setup
Create a .env file and copy contents of .env.sample file to .env and configure the parameters based on your setup
<br>  
## Running the app  

Run in production mode
```bash
yarn start:prod
```

Run in dev mode
```bash
yarn start:dev
```
  
## REST and GRAPHQL  

 - REST: http://localhost:2052//docs
 - GraphQL: http://localhost:2052//graphql  
    
  
## Quick Tips  
  
### Adding a new protocol
Firstly, check if the protocol yaml file if there. If not, create a yaml file for the protocol. All protocols and transaction types are validated upon restarting the services.

One of the challenges of adding new transaction types and protocols is ability to find clues that would distinguish it from other types of txs. This is a manual process and has to be cross-validated manually. 

One way to ease this process is to add a sample tx in protocols.spec file and enable the test flag to test specific txs only. Otherwise the test will go through all listed txs everytime a new transaction is added
## Test  
  
```bash  
# unit tests  
$ yarn test  
  
# Useful when adding new tx types
$ jest libs/parser/tests/protocols.spec.ts  
```  
  
## Special Thanks  
  
  This project wouldn't be possible without this awesome project,
  [UltimateBackend](https://github.com/juicycleff/ultimate-backend).
  
## License  
  
  This project is [MIT licensed](LICENSE).