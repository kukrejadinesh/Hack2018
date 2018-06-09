
// ADD THIS PART TO YOUR CODE
"use strict";

var documentClient = require("documentdb").DocumentClient;
const uriFactory = require('documentdb').UriFactory;

module.exports = function(context, req, res) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
        /**
         * Routes the request to the table controller to the correct method.
         *
         * @param {Function.Context} context - the table controller context
         * @param {Express.Request} req - the actual request
         */
        var res = context.res;
        var id = context.bindings.id;
        context.log(req.method);
        switch (req.method) {
            case 'GET':
            console.log("in get");
           // context.log("id " + id);
                // if (id) {
                //     context.log("getOneItem");
                //     getOneItem(req, res, id);
                // } else {
                     context.log("getAllItems");
              //      getAllItems(req, res);
               // }
                break;

            case 'POST':
                if (req.query.name || (req.body && req.body.name)) 
                {
                    insertItem(req, res);
                } 
                else 
                {
                    context.res = {
                                    status: 400,
                                    body: "Please pass a name on the query string or in the request body"
                            };
                }
                break;

            case 'PATCH':
                patchItem(req, res, id);
                break;

            case 'PUT':
                replaceItem(req, res, id);
                break;

            case 'DELETE':
                deleteItem(req, res, id);
                break;

            default:
                context.log("in default");
                res.status(405).json({ error: "Operation not supported", message: `Method ${req.method} not supported` });
                break;
        }

        function getOneItem(req, res, id) {
           // var resoutput = 
            res.status(200).json({ id: id, message: "getOne" });
        }

        function getAllItems(req, res) {
         //   documentClient client;
            var documentClient = require("documentdb").DocumentClient;
                    
            var endpoint = 'https://ctcosmosdb.documents.azure.com:443/';
            var primaryKey = 'Yv4Hsqibs3YhOXAINNhl3tXAxpLvCrjlFu0ScxMBrRoVADPABBPDdXTwmuU7yAK7dBM9hdndnSFehI1ziNlAEg==';
            var client = new documentClient(endpoint, { "masterKey": primaryKey });
            var databaseId = 'alarmdb';
            var getCollectionId = 'alarmcollection';
          //  var databaseUrl = 'dbs/alarmdb';    
            var collectionUrl;// = `${databaseUrl}/colls/Profile`;


            console.log(`Getting collection:\n${getCollectionId}\n`);
             collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, getCollectionId);

             return new Promise((resolve, reject) => {
             client.readCollection(collectionUrl, (err, result) => {
          
             if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) 
                {
                    context.res = {
                                status: 400,
                                body:"fail"
                                };
                } else {
                    reject(err);
                }
             } 
             else 
             {
                resolve(result);
             }
        });
    });








            var querySpec = {
                'query': 'SELECT * FROM c ',
            };



       //      client.queryDocuments(collectionUrl, querySpec).then(function(results) {
         //    if(err) return console.log(err);
          //    response.json(results); 

            //     console.log(results);
            // });
            // var documents = context.bindings.documents;
            // for (var i = 0; i < documents.length; i++) {
            //     var document = documents[i];
            //     // operate on each document
            // }       
            // console.log(document);
         //   context.done();

        //    res.status(200).json({ query: req.query, message: document });
        }

        function insertItem(req, res) 
        {
            context.log(req.body);
            //context.log(req.body.clickType);

            // if(context.bindings.req.body.clickType == "SINGLE"){
            //         var vstatus = "Order Placed";
            //     }else{
            //         var vstatus = "Order Cancelled";
            //     }
            //var clickType = req.body
            //var message = 'Service Bus queue message created at ';
            // var message = JSON.stringify({
            //     classificationText: "\Classifications\Request Class\Corrective Maintenance\Repair\Equipment\Espresso\Leaking Coffee",
            //     priorityCode: "1 - High",
            //     managedServiceInd: "FALSE",
            //     facilitiesAssetId: "EQ-1263249",
            //     contractName: "MS-FIRST SERVICE NETWORKS",
            //     facilitiesEventName: "",
            //     description: "additional detail for service here",
            //     riskRelatedInd: "FALSE"
            // });
            // context.log(message);   
            //context.bindings.outputSbQueue = message;
            //context.done();
            context.bindings.alarmDocument = JSON.stringify({
                                 "alarm-1": {

                                    "alarmId": "alarm-1",

                                    "time": "7:45",

                                    "order": "caffe latte",

                                    "store": "SODO 8",

                                    "snoozeTime": 10,

                                    "prepTime": 30,

                                    "isActive": false

                                  },

                                  "alarm-2": {

                                    "alarmId": "alarm-2",

                                    "time": "7:47",

                                    "order": "caffe mocha",

                                    "store": "SODO 8",

                                    "snooze-time": 10,

                                    "prep-time": 30,

                                    "isActive": false

                                  },

                                  "alarm-3": {

                                    "alarmId": "alarm-3",

                                    "time": "8:25",

                                    "order": "drip stuff",

                                    "store": "SODO TWELVE",

                                    "snooze-time": 15,

                                    "prep-time": 66,

                                    "isActive": false

                                  }

                                });
            res.status(200).json({ body: req.body, message: "insert data called" });
        }

        function patchItem(req, res, id) 
        {
            res.status(405).json({ error: "Not Supported", message: "PATCH operations are not supported" });
        }

        function replaceItem(req, res, id)
        {
            res.status(200).json({ body: req.body, id: id, message: "replace" });
        }

        function deleteItem(req, res, id) 
        {
            res.status(200).json({ id: id, message: "delete" });
        }

        //context.res = {
        // status: 200, /* Defaults to 200 */
        //     body: "Hello " + (req.query.name || req.body.name)
        //     };
    
   context.done();
};



