import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const Page = async ({ params }) => {
  const shorturl = params.shorturl;
  const client = await clientPromise;
  const db = client.db("CyberLinks");
  const collection = db.collection("urls");
  const doc = await collection.findOne({ shorturl: shorturl });

  if (doc) {
    return NextResponse.redirect(doc.url);
  } else {
    return NextResponse.redirect("/error");
  }

  return (
    <>
      <div>Redirecting...</div>
    </>
  );
};

export default Page;
