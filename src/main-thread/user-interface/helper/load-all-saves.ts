import StorageAdapter from '../../../shared/storage/StorageAdapter';

function loadSaveConfig(dbName: string) {
    return new Promise((resolve, reject) => {
        try {
            new StorageAdapter(dbName as string).readAll('config').then((config) => {
                resolve(config[0]);
            });
        } catch {
            reject();
        }
    });
}

export default async function loadAllSaves() {
    const dbs = (await indexedDB.databases()).filter((db) => {
        return db.name !== 'firebaseLocalStorageDb';
    });

    const settled = await Promise.allSettled(dbs.map((db) => {
        return loadSaveConfig(db.name!);
    }));

    const successful = settled.map((save) => {
        if (save.status === 'fulfilled') {
            return save.value;
        }
    });

   return successful.filter((save) => !!save);
}