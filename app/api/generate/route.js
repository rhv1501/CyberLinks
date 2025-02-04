import clientPromise from "@/lib/mongodb";

export async function POST(Request) {
  if (Request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
    });
  }

  try {
    const body = await Request.json();
    console.log(body);

    const client = await clientPromise;
    const db = client.db("CyberLinks");
    const collection = db.collection("urls");
    const doc = await collection.findOne({ shorturl: body.shorturl });

    if (doc) {
      return new Response(
        JSON.stringify({
          err: true,
          message: "Short URL already exists",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        err: false,
        message: "Short URL generated",
        shorturl: body.shorturl,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        err: true,
        message: "Error connecting to database",
        error: e,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
