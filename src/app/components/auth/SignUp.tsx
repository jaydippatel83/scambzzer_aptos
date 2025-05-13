import Image from "next/image";
import React from "react";

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-medium text-center text-gray-700 mb-8">
        Register with
      </h2>

      <button
        className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition-colors w-full mb-5"
        onClick={() => console.log("Google signup clicked")}
      >
        <Image
          src={"/assets/google.png"}
          alt="google"
          width={24}
          height={24}
        ></Image>
        Signup With Google
      </button>

      <div className="flex items-center justify-center mt-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <p className="text-sm text-center text-gray-600 mt-6">
        By signing up, you agree to our{" "}
        <a href="#" className="text-teal-500 hover:text-teal-700">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-teal-500 hover:text-teal-700">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default SignUp;
