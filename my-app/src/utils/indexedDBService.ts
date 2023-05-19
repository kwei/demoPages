import { storeScheme } from "@/app/indexedDB/constants"

export interface storeConfigType {
    name: string
    primaryKey: string
    autoIncrement: boolean
    indexes?: indexType[]
}

export interface indexType {
    name: string
    key: string
    unique?: boolean
    multiEntry?: boolean
}

enum transactionMode {
    readwrite = 'readwrite',
    readonly = 'readonly'
}

export class IndexedDB {
    private _dbname: string
    private _dbVersion?: number
    private _storeConfig: storeConfigType | null
    private _db: IDBDatabase | null

    constructor(dbname?: string, dbVer?: number, storeConfig?: storeConfigType) {
        this._dbname = dbname ?? 'default-indexedDB'
        this._dbVersion = dbVer
        this._storeConfig = storeConfig ?? null
        this._db = null
    }

    public newVersion() {
        this._dbVersion = this._dbVersion ? this._dbVersion + 1 : 1
    }

    public setStore(config: storeConfigType) {
        this._storeConfig = config
    }

    public rmStore(storeName?: string) {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) reject('The browser does not support indexedDB.')
            console.log(`Open indexedDB: [${this._dbname}-${this._dbVersion}]`)
            const req = window.indexedDB.open(this._dbname, this._dbVersion)

            req.onupgradeneeded = (ev) => {
                console.log('onupgradeneeded')
                const target = ev.target as EventTarget & { result: IDBDatabase }
                const db = target.result
                this._storeConfig = null
                if (storeName) {
                    console.log(storeName)
                    if (db.objectStoreNames.contains(storeName)) {  
                        try {
                            db.deleteObjectStore(storeName)
                        } catch {
                            reject(`Failed to delete object store(${storeName}).`)
                        }
                    } else {
                        
                    }
                }
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
                reject('Failed to open indexedDB.')
            }

            req.onblocked = () => {
                reject('Something blocks the connection to indexedDB. Maybe is the older version.')
            }
        })
    }

    public closeDB() {
        if (this._db) this._db.close()
    }

    public deleteDB(dbName?: string) {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                reject('The browser does not support indexedDB.')
            } else {
                console.log(`Delete indexedDB of name ${dbName ?? this._dbname}`)
                const req = window.indexedDB.deleteDatabase(dbName ?? this._dbname)
                req.onsuccess = () => resolve('Delete indexedDB succeed')
                req.onerror = () => reject('Delete indexedDB failed')
            }
        })
    }

    public openDB() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) reject('The browser does not support indexedDB.')
            console.log(`Open indexedDB: [${this._dbname}-${this._dbVersion}]`)
            const req = window.indexedDB.open(this._dbname, this._dbVersion)

            req.onupgradeneeded = (ev) => {
                console.log('onupgradeneeded')
                const target = ev.target as EventTarget & { result: IDBDatabase }
                const db = target.result
                if (this._storeConfig) {
                    console.log(this._storeConfig)
                    if (!db.objectStoreNames.contains(this._storeConfig.name)) {  
                        try {
                            const objectStore = db.createObjectStore(this._storeConfig.name, { 
                                keyPath: this._storeConfig.primaryKey, 
                                autoIncrement: this._storeConfig.autoIncrement 
                            })
                            if (this._storeConfig.indexes) {
                                this._storeConfig.indexes.forEach(indexConfig => {
                                    objectStore.createIndex(indexConfig.name, indexConfig.key, 
                                        { unique: indexConfig.unique ?? false, multiEntry: indexConfig.multiEntry ?? false })
                                })
                            }
                        } catch {
                            reject(`Failed to create object store(${this._storeConfig.name}).`)
                        }
                    } else {
                        
                    }
                }
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
                reject('Failed to open indexedDB.')
            }

            req.onblocked = () => {
                reject('Something blocks the connection to indexedDB. Maybe is the older version.')
            }
        })
    }

    public addData(storeName: string, data: storeScheme) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject('Should open indexedDB first.')
            if (!this._db!.objectStoreNames.contains(storeName)) reject('Should create object store first.')
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.add(data)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject('Failed to add data to object store.')

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject('Transaction error.')
        })
    }

    public updateData(storeName: string, data: storeScheme) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject('Should open indexedDB first.')
            if (!this._db!.objectStoreNames.contains(storeName)) reject('Should create object store first.')
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.put(data)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject('Failed to update data in object store.')

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject('Transaction error.')
        })
    }

    public deleteData(storeName: string, id: IDBValidKey) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject('Should open indexedDB first.')
            if (!this._db!.objectStoreNames.contains(storeName)) reject('Should create object store first.')
            const transaction = this._db!.transaction(storeName, transactionMode.readwrite)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.delete(id)

            req.onsuccess = () => resolve(null)
            req.onerror = () => reject('Failed to delete data in object store.')

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject('Transaction error.')
        })
    }

    public getData(storeName: string, id: IDBValidKey) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject('Should open indexedDB first.')
            if (!this._db!.objectStoreNames.contains(storeName)) reject('Should create object store first.')
            const transaction = this._db!.transaction(storeName, transactionMode.readonly)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.get(id)

            req.onsuccess = (ev) => {
                const target = ev.target as EventTarget & { result: IDBDatabase }
                resolve(target.result)
            }
            req.onerror = () => reject('Failed to get data in object store.')

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject('Transaction error.')
        })
    }

    public getAllData(storeName: string) {
        return new Promise((resolve, reject) => {
            if (!this._db) reject('Should open indexedDB first.')
            if (!this._db!.objectStoreNames.contains(storeName)) reject('Should create object store first.')
            const transaction = this._db!.transaction(storeName, transactionMode.readonly)
            const objectStore = transaction.objectStore(storeName)

            const req = objectStore.getAll()

            req.onsuccess = (ev) => {
                const target = ev.target as EventTarget & { result: IDBDatabase }
                resolve(target.result)
            }
            req.onerror = () => reject('Failed to get all data in object store.')

            transaction.oncomplete = () => console.log('Transaction complete!')
            transaction.onerror = () => reject('Transaction error.')
        })
    }
}

function configComparison(configList: storeConfigType[], config: storeConfigType) {
    return configList.map((c, index) => {
        if (c.primaryKey === config.primaryKey && c.name === config.name && c.autoIncrement === config.autoIncrement) {
            return index
        }
        return -1
    })
}