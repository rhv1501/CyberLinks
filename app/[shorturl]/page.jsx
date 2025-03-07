// app/[shorturl]/page.js
import { redirect } from "next/navigation";
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
    try {
      redirect(doc.url);
    } catch (e) {
      console.error("Error in redirecting:", e);
    }
  } else {
    redirect("/error");
  }
}
