const mongoose = require ('mongoose')
const util =require ('util')
const redis = require ('redis')



const client =redis.createClient(`redis://127.0.0.1:6379`);
client.on("connected", (err) => {
  console.error("Redis connected");
}); 
client.on("error", (err) => {
  console.error(err);
}); 

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.enableCache = true;
    this.hashKey = JSON.stringify(options.key || 'default');

    return this;
};

mongoose.Query.prototype.exec = async function() {
    if (!this.enableCache) {
        console.log('Data Source: Database');
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getFilter(), {
        collection: this.mongooseCollection.name,
    }));

    const cachedValue = await client.hget(this.hashKey, key);

    if (cachedValue) {
        const parsedCache = JSON.parse(cachedValue);

        console.log('Data Source: Cache');

        return Array.isArray(parsedCache) 
                ?  parsedCache.map(doc => new this.model(doc)) 
                :  new this.model(parsedCache);
    }

    const result = await exec.apply(this, arguments);
    
    client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 300);

    console.log('Data Source: Database');
    return result;
};

module.exports = {
    clearCache(hashKey) {
        console.log('Cache cleaned');
        client.del(JSON.stringify(hashKey));
    }
}