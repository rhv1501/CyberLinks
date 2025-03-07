// app/[shorturl]/page.js
import { permanentRedirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export async function generateMetadata({ params }) {
  const { shorturl } = await params;
  return {};
}

export default async function Page({ params }) {
  const param = await params;
  const shorturl = param.shorturl;
  const client = await clientPromise;
  const db = client.db("CyberLinks");
  const collection = db.collection("urls");
  const doc = await collection.findOne({ shorturl });

  if (doc) {
    permanentRedirect(doc.url);
  } else {
    permanentRedirect("/error");
  }
}
