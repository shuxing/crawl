const DocumentClient = require('documentdb').DocumentClient;

class DocDB {
    constructor(host, key, database, collection) {
        this.host = host.startsWith('http') ? host : `https://${host}.documents.azure.com:443/`;
        this.key = key;
        this.databaseName = database;
        this.collectionName = collection;
        this.database = null;
        this.collection = null;
        this.client = new DocumentClient(this.host, { masterKey: key });
    }

    ensureDatabaseExist() {
        return new Promise((resolve, reject) => {
            this.client.createDatabase({ id: this.databaseName }, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    this.database = database;
                    resolve(database);
                }
            });
        });
    }

    async ensureCollectionExist() {
        const database = await this.ensureDatabaseExist();
        return new Promise((resolve, reject) => {
            this.client.createCollection(database._self, { id: this.collectionName }, (err, collection) => {
                if (err) {
                    reject(err);
                } else {
                    this.collection = collection;
                    resolve(collection);
                }
            });
        });
    }

    async createDocument(document) {
        if (!this.collection) {
            await this.ensureCollectionExist();
        }
        return new Promise((resolve, reject) => {
            this.client.createDocument(this.collection._self, document, (err, document) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    }
}

module.exports = {
    DocDB: DocDB
};
