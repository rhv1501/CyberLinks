import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }) {
  const { shorturl } = await params;

  const client = await clientPromise;
  const db = client.db("CyberLinks");
  const urlData = await db.collection("urls").findOne({ shorturl });

  if (!urlData) {
    throw new Error("URL not found");
  }

  await db.collection("urls").updateOne({ shorturl }, { $inc: { visits: 1 } });

  redirect(urlData.url);
}
