import React, { useState } from "react";
import SignIn from "./Login";
import SignUp from "./SignUp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden relative">
        <div className="flex border-b">
          <button
            className={`w-1/2 py-4 font-medium text-lg ${
              activeTab === "login"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-4 font-medium text-lg ${
              activeTab === "register"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-100"
            onClick={onClose}
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

        <div className="p-6">
          {activeTab === "login" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
