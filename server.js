const {Client} = require('@elastic/elasticsearch');

//create an instance of elastic client
const client = new Client({
    node: 'http://localhost:9200',
    log: 'trace'
});