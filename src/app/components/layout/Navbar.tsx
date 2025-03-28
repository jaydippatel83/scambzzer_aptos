"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background  dark:bg-black dark:border-border-dark sticky top-0 z-50">
      <Link
        href="/"
        className="text-xl font-mono text-foreground dark:text-green-300 cursor-pointer hover:opacity-80 hover:text-white-300 transition"
      >
        <Image
          src="/assets/logo.png"
          alt="scambuzzer"
          width={180}
          height={38}
          className="w-full h-full"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <Link
          href="https://chromewebstore.google.com/detail/bongbeoheinfbmhcmbipkejailmkmibc/preview?hl=en-GB&authuser=0"
          className="px-4 py-2 text-sm bg-green-500 text-black border border-transparent rounded-md hover:bg-transparent hover:text-green-500 hover:border-green-500 transition-all"
          download
          target="blank"
        >
          Download
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
