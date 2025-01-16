import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global.clientPromise) {
    client = new MongoClient(uri, options);
    global.clientPromise = client.connect();
  }
  clientPromise = global.clientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
