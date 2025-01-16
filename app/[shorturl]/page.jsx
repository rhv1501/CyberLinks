import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

const Page = async ({ params }) => {
  const shorturl = params.shorturl;
  const client = await clientPromise;
  const db = client.db("CyberLinks");
  const collection = db.collection("urls");
  const doc = await collection.findOne({ shorturl: shorturl });

  if (doc) {
    redirect(doc.url);
  } else {
    redirect("/error");
  }

  return (
    <>
      <div>Redirecting...</div>
    </>
  );
};

export default Page;
