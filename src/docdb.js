const DocumentClient = require('documentdb').DocumentClient;

class DocDB {
    constructor(host, key, database, collection) {
        this.host = host.startsWith('http') ? host : `https://${host}.documents.azure.com:443/`;
        this.key = key;
        this.database = database;
        this.collection = collection;
        this.client = new DocumentClient(this.host, { masterKey: key });
    }

    ensureDatabaseExist() {
        return new Promise((resolve, reject) => {
            this.client.createDatabase({ id: this.database }, (err, database) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(database);
                }
            });
        });
    }

    async ensureCollectionExist() {
        const database = await this.ensureDatabaseExist();
        return new Promise((resolve, reject) => {
            this.client.createCollection(database._self, { id: this.collection }, (err, collection) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(collection);
                }
            });
        });
    }
}

module.exports = {
    DocDB: DocDB
};
