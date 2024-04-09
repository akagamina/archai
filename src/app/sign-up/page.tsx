"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../firebase-config";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpWithEmail = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await getIdToken(result.user);
      console.log("token: ", token);
      // Kullanıcı kaydı başarılı
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Google ile kayıt başarılı
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign Up
          </h2>
          <form className="mt-8 space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={handleSignUpWithEmail}
            >
              Sign Up with Email
            </button>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              onClick={handleSignUpWithGoogle}
            >
              Sign Up with Google
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex items-center justify-center p-12">
        {/* Sol taraf için içerik */}
      </div>
    </div>
  );
}
