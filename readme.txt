npm install
bower install
mongod -dbpath c:\mongodb\data
mongoimport -db DB --collection msg --file msg.json --jsonArray
node server.js