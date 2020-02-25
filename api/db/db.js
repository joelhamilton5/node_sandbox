const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://host.docker.internal:27017";
// const url = "mongodb://localhost:27017";

var _db;

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
            if(err) console.log(err);

            _db  = client.db('test');
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    }
};