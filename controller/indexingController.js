const {Client} = require('@elastic/elasticsearch');

//create an instance of elastic client
const client = new Client({
    node: 'http://localhost:9200',
    log: 'trace'
});


//declare the index function
const indexDocument = async function(index, body){
    const {body: response} = await client.index({
        index: index,
        body: body
    });

    return response;
}


//below code creates a new index using indexDocument function with the index name and body
indexDocument('my_index', {
    title: 'Full text search with ElasticSearch on docker',
    content:'here is the content of the text.....'
}).then(response => console.log(response))
.catch(err => console.log(err));


//declare the search function
const searchDocuments = async function(query) {
    const {body} = await client.search({
        index: 'my_index',
        body: {
            query: {
                match: {
                    content: query
                }
            }
        }
    });

    return body.hits.hits;
}

//below code searches for the text in the index
searchDocuments('ElasticSearch on Docker').then(response => console.log(response))
.catch(error => console.log(error));