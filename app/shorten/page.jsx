"use client";
import { useState } from "react";

const page = () => {
  const [url, setUrl] = useState("");
  const [Shorturl, setShorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const handleForm = async () => {
    if (!url || !Shorturl) {
      alert("Please fill in both the URL and short URL fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url, shorturl: Shorturl }),
      });
      if (!res.ok) {
        throw new Error(`Failed to generate short URL. Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${Shorturl}`);
      setShorturl("");
      setUrl("");
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <div className="w-[30%] bg-purple-500 p-4 rounded-lg shadow-lg">
          <div className="font-bold text-3xl text-center mb-2">
            Shorten your link
          </div>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Enter your link here"
              className="p-2 rounded-lg w-96 text-black"
              name="url"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              value={url.url}
            />
            <input
              type="text"
              placeholder="Enter your custom short link name"
              className="p-2 rounded-lg w-96 text-black"
              name="shorturl"
              onChange={(e) => {
                setShorturl(e.target.value);
              }}
              value={url.shorturl}
            />
            <button
              className="bg-purple-700 p-2 px-4 rounded-lg shadow-lg font-bold"
              type="button"
              onClick={handleForm}
            >
              Shorten
            </button>
          </div>
        </div>

        {generated && (
          <div className="mt-4">
            <p className="font-bold text-lg text-center">
              Your shortened link:{" "}
              <a href={generated} target="__blank">
                {generated}
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
