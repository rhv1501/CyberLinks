"use client";
import { useState } from "react";

const page = () => {
const [url,seturl]=useState("");
const [shorturl,setshorturl]=useState("");
const [generated,setGenerated]=useState("");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")   
                setshorturl("")
                console.log(result)
                alert(result.message)

            })
            .catch((error) => console.error(error));
    }

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen">
        <div className="w-full bg-purple-500 p-4 rounded-lg shadow-lg lg:w-[30%]">
          <div className="font-bold text-lg text-center mb-2">
            Shorten your link
          </div>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Enter your link here"
              className="p-2 rounded-lg w-80 text-black lg:w-96"
              name="url"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              value={url}
            />
            <input
              type="text"
              placeholder="Enter your custom short link name"
              className="p-2 rounded-lg w-80 text-black lg:w-96"
              name="shorturl"
              onChange={(e) => {
                setShorturl(e.target.value);
              }}
              value={Shorturl}
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
