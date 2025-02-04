import clientPromise from "@/lib/mongodb";

function setCorsHeaders(customHeaders = {}) {
  return {
    ...customHeaders,
    "Access-Control-Allow-Origin": "https://www.cyber-links.vercel.app/", 
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function POST(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: setCorsHeaders(),
    });
  }

  try {
    const body = await request.json();
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
          headers: setCorsHeaders({ "Content-Type": "application/json" }),
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
        headers: setCorsHeaders({ "Content-Type": "application/json" }),
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        err: true,
        message: "Error connecting to database",
        error: e.toString(),
      }),
      {
        headers: setCorsHeaders({ "Content-Type": "application/json" }),
      }
    );
  }
}
