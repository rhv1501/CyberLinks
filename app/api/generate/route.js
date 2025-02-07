import clientPromise from "@/lib/mongodb";

const ALLOWED_ORIGIN = "https://cyber-links.vercel.app";

function setCorsHeaders(customHeaders = {}) {
  return {
    ...customHeaders,
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
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
    console.log("Request body:", body);
    const client = await clientPromise;
    console.log("MongoDB client connected");

    const db = client.db("cyberlinks");
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

    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });
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
    console.error("Error in POST /api/generate:", e);
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
