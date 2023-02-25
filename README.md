# musala-test

this code is connected to database instance in mongodb atlas. on wild card ip address. simply runing `yarn`, then `yarn start` will startup the project.
dummy data is already in the atlas and necessary details to safly connect to the db is included in `.env` file. don't need to manually add anything since
`yarn start` will be run on nodemon with `env-variables`

if you run the code in `vsCode`, please install below extension and then you can test the end-points with `rest.http` file already included in the code base

[Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
```
Name: REST Client
Id: humao.rest-client
Description: REST Client for Visual Studio Code
Version: 0.25.1
Publisher: Huachao Mao
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
```

or else the server will be started in [http://localhost:4200](http://localhost:4200) port by default

examples for endpoints and for request bodies

gateway related endpoints
```
// get all gateways
GET http://localhost:4200/gateways

// add a gateway
POST http://localhost:4200/gateways
Content-Type: application/json

{
  "serialNumber": "en2dp234",
  "name": "PC 567",
  "ipv4": "121.221.67.124",
  "peripheralDevices": ["63f8a805d60d97473a2b60b9", "63f8a7f7d60d97473a2b60b7", "63f8a7e8d60d97473a2b60b5", "63f8a7ddd60d97473a2b60b3"]
}

// get a single gateway
GET http://localhost:4200/gateways/63f8ac8ad60d97473a2b60bb

// update a gateway
PATCH http://localhost:4200/gateways/63f8ac8ad60d97473a2b60bb
Content-Type: application/json

{ 
  "peripheralDevices": ["63f8a7ddd60d97473a2b60b3"]
}

// delete a gateway
DELETE http://localhost:4200/gateways/63f8ac8ad60d97473a2b60bb
```

404 check
```
// 404 route
GET http://localhost:4200/something
```


devices relate dend points 
```
// get all devices
GET http://localhost:4200/devices

// add a device
POST http://localhost:4200/devices
Content-Type: application/json

{
  "uid": 502972,
  "vendor": "foxconn",
  "status": "online"
}

// get a single device
GET http://localhost:4200/devices/63f851d8d60d97473a2b6093

// update a device
PATCH http://localhost:4200/devices/63f851d8d60d97473a2b6093
Content-Type: application/json

{
  "vendor": "hp"
}

// delete a gateway
DELETE http://localhost:4200/devices/63f851d8d60d97473a2b6093

```
