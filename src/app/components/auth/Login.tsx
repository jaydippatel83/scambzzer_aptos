import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-medium text-center text-gray-700 mb-8">
        Login with
      </h2>

      <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`}>
        <button
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition-colors w-full mb-5"
          onClick={() => console.log("Google login clicked")}
        >
          <Image
            src={"/assets/google.png"}
            alt="google"
            width={24}
            height={24}
          ></Image>
          Continue With Google
        </button>
      </Link>
    </div>
  );
};

export default SignIn;
