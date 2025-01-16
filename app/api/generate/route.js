import clientPromise from "@/lib/mongodb";
export async function POST(Request) {
  try {
    const body = await Request.json();
    console.log(body);

    const client = await clientPromise;
    const db = client.db("CyberLinks");
    const collection = db.collection("urls");
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (doc) {
      return Response.json({
        err: true,
        message: "Short URL already exists",
        error: e,
      });
    }
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });
    return Response.json({
      err: false,
      message: "Short URL generated",
      shorturl: body.shorturl,
    });
  } catch (e) {
    return Response.json({
      err: true,
      message: "Error connecting to database",
      error: e,
    });
  }
}
