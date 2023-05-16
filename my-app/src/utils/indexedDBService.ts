interface storeConfigType {
    name: string
    primaryKey: string
    autoIncrement: boolean
}

enum transactionMode {
    readwrite = 'readwrite',
    readonly = 'readonly'
}

export class IndexedDB {
    private _dbname: string
    private _dbVersion?: number
    private _storeConfigs: storeConfigType[]
    private _db: IDBDatabase | null

    constructor(dbname?: string, dbVer?: number, storeConfigs?: storeConfigType[]) {
        this._dbname = dbname ?? 'default-indexedDB'
        this._dbVersion = dbVer
        this._storeConfigs = storeConfigs ?? []
        this._db = null
    }

    public newVersion() {
        this._dbVersion = this._dbVersion ? this._dbVersion + 1 : 1
    }

    public setStore(config: storeConfigType) {
        if (this._storeConfigs.indexOf(config) === -1) this._storeConfigs.push(config)
    }

    public closeDB() {
        if (this._db) this._db.close()
    }

    public deleteDB(dbName?: string) {
        if (!('indexedDB' in window)) {
            console.error('The browser does not support indexedDB.')
        } else {
            console.log(`Delete indexedDB of name ${dbName ?? this._dbname}`)
            const req = window.indexedDB.deleteDatabase(dbName ?? this._dbname)
            req.onsuccess = () => console.log('Delete indexedDB succeed')
            req.onerror = () => console.log('Delete indexedDB failed')
        }
    }

    public openDB() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) reject(new Error('The browser does not support indexedDB.'))
            console.log(`Open indexedDB: [${this._dbname}-${this._dbVersion}]`)
            const req = window.indexedDB.open(this._dbname, this._dbVersion)

            req.onupgradeneeded = (ev) => {
                console.log('onupgradeneeded')
                const target = ev.target as EventTarget & { result: IDBDatabase }
                const db = target.result
                this._storeConfigs.forEach(storeConfig => {
                    if (!db.objectStoreNames.contains(storeConfig.name)) {
                        console.log(storeConfig)
                        try {
                            db.createObjectStore(storeConfig.name, { 
                                keyPath: storeConfig.primaryKey, 
                                autoIncrement: storeConfig.autoIncrement 
                            })
                        } catch {
                            reject(new Error(`Failed to create object store(${storeConfig.name}).`))
                        }
                    }
                })
            }

            req.onsuccess = (ev) => {
                console.log('onsuccess')
                const target = ev.target as EventTarget & { result: IDBDatabase }
                this._db = target.result
                console.log('Current database version:', this._db.version);
                this._dbVersion = this._db.version
                resolve(null)
            }

            req.onerror = () => {
                reject(new Error('Failed to open indexedDB.'))
            }

            req.onblocked = () => {
                reject(new Error('Something blocks the connection to indexedDB. Maybe is the older version.'))
            }
        })
    }

    public addData(storeName: string, data: unknown) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject(new Error('Should open indexedDB first.'))
            if (!this._db!.objectStoreNames.contains(storeName)) reject(new Error('Should create object store first.'))
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.add(data)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject(new Error('Failed to add data to object store.'))

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject(new Error('Transaction error.'))
        })
    }

    public updateData(storeName: string, data: unknown) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject(new Error('Should open indexedDB first.'))
            if (!this._db!.objectStoreNames.contains(storeName)) reject(new Error('Should create object store first.'))
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.put(data)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject(new Error('Failed to update data in object store.'))

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject(new Error('Transaction error.'))
        })
    }

    public deleteData(storeName: string, id: IDBValidKey) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject(new Error('Should open indexedDB first.'))
            if (!this._db!.objectStoreNames.contains(storeName)) reject(new Error('Should create object store first.'))
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.delete(id)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject(new Error('Failed to delete data in object store.'))

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject(new Error('Transaction error.'))
        })
    }

    public getData(storeName: string, id: IDBValidKey) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject(new Error('Should open indexedDB first.'))
            if (!this._db!.objectStoreNames.contains(storeName)) reject(new Error('Should create object store first.'))
            const transaction = this._db!.transaction(storeName, transactionMode.readonly)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.get(id)

            req.onsuccess = (ev) => {
                const target = ev.target as EventTarget & { result: IDBDatabase }
                resolve(target.result)
            }
            req.onerror = () => reject(new Error('Failed to get data in object store.'))

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject(new Error('Transaction error.'))
        })
    }

    public getAllData(storeName: string) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject(new Error('Should open indexedDB first.'))
            if (!this._db!.objectStoreNames.contains(storeName)) reject(new Error('Should create object store first.'))
            const transaction = this._db!.transaction(storeName, transactionMode.readonly)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.getAll()

            req.onsuccess = (ev) => {
                const target = ev.target as EventTarget & { result: IDBDatabase }
                resolve(target.result)
            }
            req.onerror = () => reject(new Error('Failed to get all data in object store.'))

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject(new Error('Transaction error.'))
        })
    }
}

// const INIT_DB_NAME = 'my-app'

// const IndexedDBService = new IndexedDB(INIT_DB_NAME)
// IndexedDBService.openDB()
// export default IndexedDBService;