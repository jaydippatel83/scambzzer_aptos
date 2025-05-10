'use client';
import React, { useState, useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCredentialResponse: any;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  handleCredentialResponse,
}) => {


  useEffect(() => {
    if (!isOpen) return; // Wait until modal is open
  
    const interval = setInterval(() => {
      const target = document.getElementById("google-signin");
        // @ts-ignore
      if (target && window.google && window.google.accounts?.id) {
          // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!,
          callback: handleCredentialResponse,
        });
    // @ts-ignore
        window.google.accounts.id.renderButton(target, {
          theme: "outline",
          size: "large",
          width: 240,
        });
  
        clearInterval(interval); // Rendered successfully
      }
    }, 100); // Check every 100ms
  
    return () => clearInterval(interval); // Cleanup
  }, [isOpen]);
  
 
  // useEffect(() => {
   
  //    // @ts-ignore
  //    if (window.google) {
  //     // @ts-ignore
  //     window.google.accounts.id.initialize({
  //       client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
  //       callback: handleCredentialResponse,
  //     });

  //     // @ts-ignore
  //     window.google.accounts.id.renderButton(
  //       document.getElementById("google-signin"),
  //       {
  //         theme: "outline",
  //         size: "large",
  //       }
  //     );
  //   }
  // }, []);

  

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        <div className="flex justify-end p-2">
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

        <div className="px-8 pb-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>

          {/* Social login divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social login buttons */}
          <div id="google-signin" style={{display: "flex", justifyContent: "center"}}/>

          {/* Account creation link */}
          {/* <div className="mt-4 text-center">
            <a
              href="#"
              onClick={(e) => openSignUpnModal(e)}
              className="text-teal-600 hover:underline text-sm"
            >
              I don't have an account
            </a>
          </div> */}

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

export default LoginModal;
