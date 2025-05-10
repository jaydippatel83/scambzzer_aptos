import React, { useState } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onCloseSignUp: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onCloseSignUp }) => {
  const [email, setEmail] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Continue with email:", email);
    // Implement your login logic here
  };  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        <div className="flex justify-end p-2">
          <button
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100"
            onClick={onCloseSignUp}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        
         

          {/* Social login divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full border border-gray-300 rounded p-3 hover:bg-gray-50">
              <div className="flex items-center">
                <img
                  src="/assets/google.png"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                <span>Sign Up with Google</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Terms text */}
          <div className="mt-6 text-xs text-gray-500 text-center">
          
            <div className="mt-2">
              <a href="#" className="text-gray-700 hover:underline">
                Terms and Conditions
              </a>{" "}
              ·{" "}
              <a href="#" className="text-gray-700 hover:underline">
                Privacy Policy
              </a>{" "}
              ·{" "}
              <a href="#" className="text-gray-700 hover:underline">
                CA Notice at Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
