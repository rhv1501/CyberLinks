import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.url || !body.shorturl) {
      return new Response(
        JSON.stringify({
          error: "Missing URL or short URL",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Basic validation
    const validShortUrl = /^[a-zA-Z0-9-_]+$/.test(body.shorturl);
    if (!validShortUrl) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid short URL format. Use only letters, numbers, hyphens and underscores",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const fullUrl = body.url.startsWith("http")
      ? body.url
      : `https://${body.url}`;

    try {
      new URL(fullUrl);
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid URL format",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = await clientPromise;
    const db = client.db("CyberLinks");
    const collection = db.collection("urls");

    // Check for existing shorturl
    const existing = await collection.findOne({ shorturl: body.shorturl });
    if (existing) {
      return new Response(
        JSON.stringify({
          error: "This short URL is already taken",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create new short URL
    await collection.insertOne({
      url: fullUrl,
      shorturl: body.shorturl,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        shorturl: body.shorturl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
