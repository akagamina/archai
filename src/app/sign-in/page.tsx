"use client";

import { useState } from "react";
import { supabase } from "@/services/supabaseClientService";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailProviderUrls = {
    "gmail.com": "https://mail.google.com",
    "outlook.com": "https://outlook.live.com",
    "hotmail.com": "https://outlook.live.com",
    "yandex.com": "https://mail.yandex.com",
    "yahoo.com": "https://mail.yahoo.com",
    "aol.com": "https://mail.aol.com",
    "protonmail.com": "https://mail.protonmail.com",
  } as Record<string, string>;

  function determineMailProvider(email: string) {
    const domain = email.split("@")[1];
    return emailProviderUrls[domain] || "https://mail.google.com"; // Default to Gmail if not matched
  }

  // email regex pattern
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

  async function handleSendMagicLink() {
    try {
      setLoading(true);
      const response = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/sign-in/`,
        },
      });
      console.log(response);
      if (response?.error) {
        throw new Error(response?.error?.message);
      }
      const providerUrl = determineMailProvider(email);
      toast.success(
        `Magic link sent! Check your email or visit ${providerUrl}`,
        {
          duration: 3000,
        }
      );
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded w-full">
        {loading ? (
          <div className="">
            <div className="flex flex-col justify-center items-center h-screen">
              <p className="mb-8">
                Please check your{" "}
                <a
                  className="font-semibold underline"
                  href={determineMailProvider(email)}
                >
                  email.
                </a>
              </p>
              <div className="w-16 h-16 border-b-4 border-black rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="max-w-md m-auto">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 border rounded w-full focus-within:outline-none focus-within:border-0 focus-within:ring-0 "
            />
            <button
              onClick={handleSendMagicLink}
              disabled={!email || !emailRegex.test(email)}
              className="mt-4 w-full bg-[#33CC95] text-white py-2 rounded disabled:bg-zinc-400"
            >
              Send Magic Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
