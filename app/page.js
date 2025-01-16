"use client";
import Image from "next/image";
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
      <main className="bg-gray-900">
        <section className="grid-cols-1 grid lg:grid-cols-2 h-[50vh]">
          <div className="flex justify-start relative w-auto">
            <Image alt="image not found" src={"/vector.png"} fill="true" />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center text-white">
            <div className="min-h-[3rem] flex justify-center items-center">
              <p className="text-2xl font-bold font-mono" ref={el} />
            </div>
            <p className="font-mono text-gray-200 font-semibold">
              No Tracking And No Login Required
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
