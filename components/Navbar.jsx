"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="bg-gray-500 h-12 flex justify-around items-center px-3 text-white">
        <div className="logo font-bold text-lg font-mono">CyberLinks</div>
        <ul className="hidden lg:flex lg:justify-center lg:gap-4 lg:items-center">
          <Link href="/" className="text-white hover:text-purple-200">
            <li>Home</li>
          </Link>
          <Link href="/shorten" className="text-white hover:text-purple-200">
            <li>Shorten</li>
          </Link>
          <Link href="/" className="text-white hover:text-purple-200">
            <li>Contact us</li>
          </Link>
          <li className="flex gap-2">
            <Link href="https://www.linkedin.com/in/rudresh-h-vyas-286232264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <button
                className="bg-blue-700 p-1 px-3 rounded-lg shadow-lg font-bold"
                type="button"
              >
                LinkedIn
              </button>
            </Link>
            <Link href="https://github.com/rhv1501/CyberLinks" target="__blank">
              <button
                className="bg-black p-1 px-3 rounded-lg shadow-lg font-bold"
                type="button"
              >
                GitHub
              </button>
            </Link>
          </li>
        </ul>
        <ul className="lg:hidden">
          <li>
            <button
              className={"font-bold text-2xl"}
              onClick={() => {
                setOpen(!open);
              }}
              type="button"
            >
              {open === true ? "lll" : "☰"}
            </button>
          </li>
        </ul>
        {open && (
          <ul className="flex flex-col gap-2 z-10 absolute top-12 right-0 bg-black w-full bg-opacity-20 p-2">
            <Link href="/" className="text-white hover:text-purple-200">
              <li>Home</li>
            </Link>
            <Link href="/shorten" className="text-white hover:text-purple-200">
              <li>Shorten</li>
            </Link>
            <Link href="/" className="text-white hover:text-purple-200">
              <li>Contact us</li>
            </Link>
            <li className="flex gap-2">
              <Link href="/">
                <button
                  className="bg-blue-700 p-1 px-3 rounded-lg shadow-lg font-bold"
                  type="button"
                >
                  LinkedIn
                </button>
              </Link>
              <Link href="https://github.com/rhv1501/CyberLinks">
                <button
                  className="bg-black p-1 px-3 rounded-lg shadow-lg font-bold"
                  type="button"
                >
                  GitHub
                </button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
export default Navbar;
