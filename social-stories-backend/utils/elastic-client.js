/**
 * Singleton for Elasticsearch Client
 * @module elastic-client
 */

const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://elasticsearch:9200' });

/** Export the client. */
module.exports = client;