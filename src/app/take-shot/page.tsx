/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import uploadImageAndGetDesignSuggestions from "@/services/gpt4Service";
import { useUser } from "@/context/UserContext";
import { CameraIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Head from "next/head";

function TakeAShot() {
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = useState<any>();
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? null);
  }, [webcamRef]);
  const { user, setLoading } = useUser();

  const uploadImage = useCallback(async () => {
    setLoading(true);
    try {
      const imageBlob = await (await fetch(image)).blob();

      const imageFile = new File([imageBlob], `image/${user?.uid}`, {
        type: "image/png",
      });
      const suggestions: any = await uploadImageAndGetDesignSuggestions(
        imageFile
      );
      console.log(suggestions);
      setLoading(false);
    } catch (error) {
      console.error("Error in uploadImage: ", error);
      setLoading(false);
    }
  }, [image, setLoading, user?.uid]);

  // if device is mobile return text to use desktop

  // detect if the device is mobile via agent string
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (typeof window !== "undefined" && window.innerWidth > 768 && !isMobile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-black">
          Please use a mobile phone to access this feature
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[100svh] justify-center items-center p-4">
      <Head>
        <title>Enhance Creativity with AI-Driven Design | TureAI</title>
      </Head>
      <div className="relative">
        {image ? (
          <>
            <Image
              width={500}
              height={400}
              src={image}
              alt="Captured"
              className="w-full h-auto"
            />
          </>
        ) : (
          <Webcam
            audio={false}
            videoConstraints={{
              facingMode: "environment",
            }}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
            height={720}
          />
        )}
        {/* {url && <img src={url} width={500} height={400} alt="Design" />} */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
          {image ? (
            <button
              onClick={uploadImage}
              className="p-3 bg-white rounded-full shadow-md"
            >
              <PhotoIcon className="w-6 h-6 text-gray-800" />
            </button>
          ) : (
            <button
              onClick={capture}
              className="p-3 bg-white rounded-full shadow-md"
            >
              <CameraIcon className="w-6 h-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TakeAShot;
