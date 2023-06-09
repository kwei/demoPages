import { storeScheme } from '@/app/indexedDB/constants'
import { IndexedDB, storeConfigType } from './indexedDBService'

const SHOULD_OPEN_DB_FIRST = 'Should open DB connection first by clicking "Create DB" button.'

const dbService = () => {
    const defaultDBName = 'my-app'
    let IndexedDBService: IndexedDB | null = null

    const createDB = (dbName?: string) => {
        return new Promise(async (resolve) => {
            IndexedDBService = new IndexedDB(dbName ?? defaultDBName)
            await IndexedDBService.openDB()
            IndexedDBService.closeDB()
            resolve('Create DB Success')
        })
    }

    const createStore = (config: storeConfigType) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                IndexedDBService.closeDB()
                if (!IndexedDBService.storeExisted(config.name)) IndexedDBService.newVersion()
                IndexedDBService.setStore(config)
                await IndexedDBService.openDB().then(() => console.log('createStore success'))
                IndexedDBService.closeDB()
                resolve('Create Store Success')
            }
        })
    }

    const removeStore = (name: string) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                IndexedDBService.closeDB()
                if (IndexedDBService.storeExisted(name)) {
                    IndexedDBService.newVersion()
                    await IndexedDBService.rmStore(name)
                }
                IndexedDBService.closeDB()
                resolve('Delete Store Success')
            }
        })
    }
    
    const getData = (storeName: string, id: IDBValidKey) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                await IndexedDBService.openDB()
                resolve(await IndexedDBService.getData(storeName, id))
                IndexedDBService.closeDB()
            }
        })
    }
    
    const getAllData = (storeName: string) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                await IndexedDBService.openDB()
                resolve(IndexedDBService.getAllData(storeName))
                IndexedDBService.closeDB()
            }
        })
    }
    
    const addData = (storeName: string, data: storeScheme) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                await IndexedDBService.openDB()
                await IndexedDBService.addData(storeName, data)
                .catch((msg: string) => reject(msg))
                IndexedDBService.closeDB()
                resolve('Add Data Success')
            }
        })
    }
    
    const updateData = (storeName: string, data: storeScheme) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                await IndexedDBService.openDB()
                await IndexedDBService.updateData(storeName, data)
                IndexedDBService.closeDB()
                resolve('Update Data Success')
            }
        })
    }
    
    const deleteData = (storeName: string, id: IDBValidKey) => {
        return new Promise(async (resolve, reject) => {
            if (!IndexedDBService) reject(SHOULD_OPEN_DB_FIRST)
            else {
                await IndexedDBService.openDB()
                await IndexedDBService.deleteData(storeName, id)
                IndexedDBService.closeDB()
                resolve('Delete Data Success')
            }
        })
    }
    
    const deleteDB = (dbName?: string) => {
        return new Promise(async (resolve) => {
            if (!IndexedDBService) {
                IndexedDBService = new IndexedDB(dbName ?? defaultDBName)
                IndexedDBService.closeDB()
                await IndexedDBService.deleteDB(dbName)
            } else {
                IndexedDBService.closeDB()
                await IndexedDBService.deleteDB(dbName)
            }
            resolve('Delete DB Success')
        })
    }
    
    return {
        createDB,
        createStore,
        removeStore,
        getData,
        getAllData,
        addData,
        updateData,
        deleteData,
        deleteDB
    }
}

const dbHandler = Object.freeze(dbService())
export default dbHandler