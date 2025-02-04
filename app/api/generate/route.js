import clientPromise from "@/lib/mongodb";

// Update this to your actual frontend domain
const ALLOWED_ORIGIN = "https://cyber-links.vercel.app";

// Helper function to set CORS headers
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
  // Handle preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: setCorsHeaders(),
    });
  }

  try {
    console.log("Received POST request to /api/generate");
    const body = await request.json();
    console.log("Request body:", body);

    const startTime = Date.now();
    const client = await clientPromise;
    console.log("MongoDB client connected");

    const db = client.db("CyberLinks");
    const collection = db.collection("urls");

    // Log how long the DB query takes
    const doc = await collection.findOne({ shorturl: body.shorturl });
    console.log("Database query time:", Date.now() - startTime, "ms");

    if (doc) {
      console.log("Short URL already exists");
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

    await collection.insertOne({ shorturl: body.shorturl });

    console.log("Short URL generated successfully");
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
