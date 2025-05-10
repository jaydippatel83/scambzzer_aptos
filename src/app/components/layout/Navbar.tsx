import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
          <nav className="hidden md:flex items-center gap-8">
            <a href="#statistics" className="text-gray-600 hover:text-gray-900">
              Statistics
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a
              href="mailto:contact@scambuzzer.com"
              className="text-gray-600 hover:text-gray-900"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
