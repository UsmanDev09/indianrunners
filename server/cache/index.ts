import logger from "../config/logger";

// DOES NOT WORK FOR NESTED HASHES USING HGET GIVES ERROR
const mongoose = require('mongoose');
const { Query } = mongoose;

const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6360';

const client = redis.createClient({url:redisUrl});

client.get = util.promisify(client.get);
// client.hget = util.promisify(client.get).bind(client)
const exec = mongoose.Query.prototype.exec;

interface CacheOptions {
    key?: string;
}

declare module 'mongoose' {
    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
      cache(options?: CacheOptions): this;
    }
}
  

mongoose.Query.prototype.cache = function(options: CacheOptions = {}) {
    this.hashKey = JSON.stringify(options.key || '');
   
    this.useCache = true;
   
    return this;
}

mongoose.Query.prototype.exec = async function () {
    
    if(!this.useCache) {
        return exec.apply(this, arguments)
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery, {
        collection: this.mongooseCollection.name
    }));

    const cachedValue = await client.get(key);
    
    if(cachedValue) {
        const doc = JSON.parse(cachedValue);

        return Array.isArray(doc) 
        ? doc.map(d => new this.model(d)) 
        : new this.model(doc); 

    }

    const result = await exec.apply(this, arguments);

    client.set(this.hashKey, key, JSON.stringify(result));

    return result;

}

