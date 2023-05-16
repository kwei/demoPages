import { IndexedDB } from './indexedDBService'

const dbService = () => {
    const defaultDBName = 'my-app'
    let IndexedDBService: IndexedDB | null = null

    const createDB = (dbName?: string) => {
        IndexedDBService = new IndexedDB(dbName ?? defaultDBName)
        IndexedDBService.openDB()
        IndexedDBService.closeDB()
    }

    const createStore = (name: string, primaryKey: string, autoIncrement: boolean) => {
        return new Promise(async () => {
            if (!IndexedDBService) return
            IndexedDBService.closeDB()
            IndexedDBService.newVersion()
            IndexedDBService.setStore({ name, primaryKey, autoIncrement })
            await IndexedDBService.openDB().then(() => console.log('createStore success'))
            IndexedDBService.closeDB()
        })
    }
    
    const getData = (storeName: string, id: IDBValidKey) => {
        return new Promise(async (resolve) => {
            if (!IndexedDBService) return
            await IndexedDBService.openDB()
            resolve(IndexedDBService.getData(storeName, id))
            IndexedDBService.closeDB()
        })
    }
    
    const getAllData = (storeName: string) => {
        return new Promise(async (resolve) => {
            if (!IndexedDBService) return
            await IndexedDBService.openDB()
            resolve(IndexedDBService.getAllData(storeName))
            IndexedDBService.closeDB()
        })
    }
    
    const addData = (storeName: string, data: unknown) => {
        return new Promise(async () => {
            if (!IndexedDBService) return
            await IndexedDBService.openDB()
            await IndexedDBService.addData(storeName, data)
            IndexedDBService.closeDB()
        })
    }
    
    const updateData = (storeName: string, data: unknown) => {
        return new Promise(async () => {
            if (!IndexedDBService) return
            await IndexedDBService.openDB()
            await IndexedDBService.updateData(storeName, data)
            IndexedDBService.closeDB()
        })
    }
    
    const deleteData = (storeName: string, id: IDBValidKey) => {
        return new Promise(async () => {
            if (!IndexedDBService) return
            await IndexedDBService.openDB()
            await IndexedDBService.deleteData(storeName, id)
            IndexedDBService.closeDB()
        })
    }
    
    const deleteDB = (dbName?: string) => {
        if (!IndexedDBService) return
        IndexedDBService.closeDB()
        IndexedDBService.deleteDB(dbName)
    }
    
    return {
        createDB,
        createStore,
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