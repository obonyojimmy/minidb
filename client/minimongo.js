MiniDb = {};

import { openDB } from 'idb';

const DB_NAME = '_meteor_pwa'
const DB_VERSION = 1

async function getStorageVersion(){
  const dbs = await indexedDB.databases()
  const db = dbs && dbs.find(({name})=> name === DB_NAME )
  // console.log('getStorageVersion-db', db)
 return db?.version || DB_VERSION
}

async function initDB(storeName, ver) {
  const version = ver || await getStorageVersion()
  try {
    const DB = await openDB(DB_NAME, version, {
      upgrade(db) {
        if (storeName && !db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: '_id' })
        }
      },
      async blocking(evt){
        console.log('MiniDb.idb.blocking', storeName, version, evt)
        await DB.close()
      },
      async blocked(evt){
        // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#Using_an_index
        // scroll to section [Version changes while a web app is open in another tab]
        // TODO: Support multiple Tabs with web-workers
        console.log('MiniDb.idb.blocked', storeName, version, evt)
        return initDB(storeName, version)
      },
      terminated(){
        console.log('MiniDb.idb.terminated')
      }
    })

    if (storeName && !DB.objectStoreNames.contains(storeName)) {
      console.log('MiniDb.idb storename missing', storeName)
      return initDB(storeName, version + 1)
    }

    MiniDb.db = DB
    
    return MiniDb.db.objectStoreNames.contains(storeName) // (boolean) return to indicate the collection exists in indexDb
  } catch (error) {
    console.log('MiniDb.idb.error', error)
  }
}

MiniDb.Collection = class MiniDbCollection extends Mongo.Collection {
  constructor(name, opts){
    const collection = super(name, opts)
    this.collection = collection
    this._name = name
    initDB(name).then(c=> {
      // console.log('MiniDb.db', MiniDb.db)
      console.log('Store exists', name, c)
    })
    this._loadDatabase()
  }

  _loadDatabase(){

  }

  _clear(){}

  // find(){}

  // index(){}
}