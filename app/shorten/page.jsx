"use client";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const [error, setError] = useState("");

  const handleForm = async () => {
    try {
      setError("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, shorturl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate short URL");
      }

      setGenerated(`${window.location.origin}/${shorturl}`);
      setShorturl("");
      setUrl("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-purple-500 p-6 rounded-lg shadow-lg">
        <h1 className="font-bold text-xl text-center text-white mb-4">
          Shorten your link
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your URL here"
            className="p-3 rounded-lg w-full text-black"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Choose your custom short URL"
            className="p-3 rounded-lg w-full text-black"
            value={shorturl}
            onChange={(e) => setShorturl(e.target.value)}
          />

          <button
            className="bg-purple-700 p-3 rounded-lg shadow-lg font-bold text-white hover:bg-purple-800 transition-colors"
            type="button"
            onClick={handleForm}
            disabled={!url || !shorturl}
          >
            Shorten URL
          </button>
        </div>
      </div>

      {generated && (
        <div className="mt-4 bg-green-100 p-4 rounded-lg max-w-md w-full">
          <p className="text-center text-green-800">
            <span className="font-bold">Your shortened URL:</span>
            <br />
            <a
              href={generated}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {generated}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
