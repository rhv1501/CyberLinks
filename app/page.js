"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Typed from "typed.js";
export default function Home() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Meet The Best Url Shortner",
        "That Effortlessly Shortens Your Urls",
        "Gives You The Best Experience",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: false,
      onComplete: () => {},
      onStringTyped: () => {},
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <main className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-600  min-h-screen">
        <div className="container mx-auto px-4 h-screen flex items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8 lg:gap-12">
            <div className="flex-1 flex justify-center lg:justify-end">
              <Image
                alt="CyberLinks URL Shortener"
                src={"/vector.gif"}
                width={400}
                height={400}
                className="w-full max-w-md h-auto object-contain"
                priority
              />
            </div>

            <div className="flex-1 flex flex-col gap-6 justify-center items-center lg:items-start text-white">
              <div className="min-h-[4rem] flex justify-center lg:justify-start items-center">
                <p
                  className="text-2xl lg:text-4xl font-bold font-mono text-center lg:text-left"
                  ref={el}
                />
              </div>
              <p className="font-mono text-gray-200 font-semibold text-center lg:text-left text-lg">
                No Tracking And No Login Required
              </p>
              <div className="mt-4">
                <Link
                  href="/shorten"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
