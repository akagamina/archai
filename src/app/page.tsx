"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { storage } from "../../firebase-config";
import uploadImageAndGetDesignSuggestions from "@/services/gpt4Service";
import { useUser } from "@/context/UserContext";
import { CameraIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

function WebcamCapture() {
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = useState<any>();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? null);
  }, [webcamRef]);
  const { user } = useUser();

  const uploadImage = async () => {
    const imageBlob = await (await fetch(image)).blob();

    const imageFile = new File([imageBlob], `image/${user?.uid}`, {
      type: "image/png",
    });
    const suggestions = await uploadImageAndGetDesignSuggestions(imageFile);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="relative">
        {image ? (
          <Image
            width={400}
            height={400}
            src={image}
            alt="Captured"
            className="w-full h-auto"
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
            height={720}
          />
        )}
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

export default WebcamCapture;