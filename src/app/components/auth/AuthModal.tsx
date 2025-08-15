import React, { useEffect, useState } from "react";
import SignIn from "./Login";
import SignUp from "./SignUp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "login" | "register";
  setActiveTab?: (activeTab: "login" | "register") => void; // Corrected type
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<
    "login" | "register"
  >(activeTab || "login");

  useEffect(() => {
    if (activeTab) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabChange = (tab: "login" | "register") => {
    if (setActiveTab) {
      // If the parent provided a setter, use it.
      setActiveTab(tab);
    } else {
      // If no setter was provided, manage state internally (uncontrolled component)
      setInternalActiveTab(tab);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden relative">
        <div className="flex border-b">
          <button
            className={`w-1/2 py-4 font-medium text-lg ${
              internalActiveTab === "register"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
          <button
            className={`w-1/2 py-4 font-medium text-lg ${
              internalActiveTab === "login"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>

          <button
            className="h-6 w-6 rounded-full m-3 border-black border-2 flex items-center justify-center hover:bg-gray-100"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
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
          {internalActiveTab === "login" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
