import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Terms of Use
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="https://x.com/scambuzzercom"
                className="text-gray-400 hover:text-gray-600"
                aria-label="X (Twitter)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/scambuzzer"
                className="text-gray-400 hover:text-gray-600"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ScamBuzzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
