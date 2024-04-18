"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import uploadImageAndGetDesignSuggestions from "@/services/gpt4Service";
import { useUser } from "@/context/UserContext";
import { CameraIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

function TakeAShot() {
  const { setLoading } = useUser();
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = useState<any>();
  const [url, setUrl] = useState<string>("");
  console.log("url: ", url);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? null);
  }, [webcamRef]);
  const { user } = useUser();

  const uploadImage = async () => {
    setLoading(true);
    try {
      const imageBlob = await (await fetch(image)).blob();

      const imageFile = new File([imageBlob], `image/${user?.uid}`, {
        type: "image/png",
      });
      const suggestions: any = await uploadImageAndGetDesignSuggestions(
        imageFile
      );
      setLoading(false);
      console.log(suggestions);
      setUrl(suggestions?.data[0]?.url);
    } catch (error) {
      console.error("Error in uploadImage: ", error);
      setLoading(false);
    }
  };

  // if device is mobile return text to use desktop
  if (typeof window !== "undefined" && window.innerWidth > 768) {
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
        {url && <Image src={url} width={500} height={400} alt="Design" />}
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
