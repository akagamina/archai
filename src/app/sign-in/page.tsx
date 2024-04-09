/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../firebase-config";
import { getId } from "firebase/installations";
import { setCookie } from "cookies-next";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Kullanıcı girişi başarılı
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await getIdToken(result.user);
      setCookie("Bearer", token);
      setCookie("isLoggedIn", true);
      console.log("token: ", token);
      setUser(result.user);
      router.push("/");

      // Google ile giriş başarılı
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        {/* Arka plan animasyonu için bir div veya animasyon bileşeni */}
      </div>
      <div className="login-content">
        <button
          onClick={handleSignInWithGoogle}
          className="px-4 py-2  flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white text-slate-700  hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
