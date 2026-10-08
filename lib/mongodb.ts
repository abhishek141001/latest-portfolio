import { Db, MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const databaseName = process.env.MONGODB_DB || "portfolio"

let clientPromise: Promise<MongoClient> | undefined

export function isMongoConfigured() {
  return Boolean(uri)
}

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not configured")

  if (!clientPromise) {
    const client = new MongoClient(uri)
    clientPromise = client.connect()
  }

  return (await clientPromise).db(databaseName)
}
