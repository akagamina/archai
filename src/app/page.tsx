/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { storage } from "../../firebase-config";
import uploadImageAndGetDesignSuggestions from "@/services/gpt4Service";
import { useUser } from "@/context/UserContext";
import { CameraIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

function WebcamCapture() {
  const { setLoading } = useUser();
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = useState<any>();

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
      window.open(suggestions?.data[0].url, "_blank");
      setLoading(false);
    } catch (error) {
      console.error("Error in uploadImage: ", error);
      setLoading(false);
    }
  };

  return (
    <main className="main-wrapper relative overflow-hidden">
      <section id="hero-section">
        <div className="relative overflow-hidden bg-black text-white">
          <div className="pb-28 pt-28 md:pb-40 lg:pt-28 xl:pb-[90px] xl:pt-[122px]">
            <div className="global-container">
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,_1fr)_0.7fr]">
                <div>
                  <h1 className="jos mb-6 max-w-md break-words font-clashDisplay text-5xl font-medium leading-none text-white md:max-w-full md:text-6xl lg:text-7xl xl:text-8xl xxl:text-[100px]">
                    Enhance Creativity with AI-Driven Design
                  </h1>
                  <p className="jos mb-11">
                    Welcome to a new era of design innovation with TureAI. Our
                    platform revolutionizes the way visual content is created,
                    transforming images through AI to inspire limitless
                    creativity. Experience instant transformation of visuals,
                    and let AI extend your imagination. Join us and unleash your
                    design potential 24/7.
                  </p>
                  <Link
                    href="/take-a-shot"
                    className="jos button relative z-[1] inline-flex items-center gap-3 rounded-[50px] border-none bg-colorViolet py-[18px] text-white after:bg-colorOrangyRed hover:text-white"
                  >
                    Start Designing for Free
                    <Image
                      width={24}
                      height={24}
                      src="/img/th-2/icon-white-long-arrow-right.svg"
                      alt="icon-white-long-arrow-right"
                    />
                  </Link>
                </div>

                <div className="hero-img overflow-hidden rounded-2xl bg-black text-right">
                  <Image
                    src="/img/content-2.webp"
                    alt="hero-img-2"
                    loading="lazy"
                    width="1296"
                    height="640"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[80%] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#5636C7] to-[#5028DD] blur-[250px]"></div>
          <div className="absolute bottom-0 left-1/2 h-[77px] w-full -translate-x-1/2 bg-[url(/img/th-2/arc-top-shape-1.svg)] bg-cover bg-center bg-no-repeat"></div>
        </div>
      </section>

      <section id="feature-section">
        <div className="pb-20 pt-1 xl:pb-[130px] xl:pt-[53px]">
          <div className="global-container">
            <div className="jos mb-10 text-left sm:mx-auto sm:text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]">
              <h2 className="font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]">
                Features That Empower Your Creativity
              </h2>
            </div>

            <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              <li
                className="jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row"
                data-jos_delay="0.1"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-inherit p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]">
                  <Image
                    src="/img/th-2/icon-feature-1.svg"
                    alt="icon-feature-1"
                    width="49"
                    height="45"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-5">
                  <div className="font-clashDisplay text-[24px] font-medium leading-6  lg:leading-5">
                    Innovative Transformation
                  </div>
                  <p>
                    Elevate images with AI-powered transformations that
                    reimagine the possibilities of visual design.
                  </p>
                </div>
              </li>

              <li
                className="jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row"
                data-jos_delay="0.2"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-inherit p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]">
                  <Image
                    src="/img/th-2/icon-feature-2.svg"
                    alt="icon-feature-2"
                    width="45"
                    height="45"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-5">
                  <div className="font-clashDisplay text-[24px] font-medium leading-6  lg:leading-5">
                    Intuitive Interface
                  </div>
                  <p>
                    Our user-friendly platform makes design accessible to
                    everyone, regardless of skill level.
                  </p>
                </div>
              </li>

              <li
                className="jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row"
                data-jos_delay="0.3"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-inherit p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]">
                  <Image
                    src="/img/th-2/icon-feature-3.svg"
                    alt="icon-feature-3"
                    width="36"
                    height="45"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-5">
                  <div className="font-clashDisplay text-[24px] font-medium leading-6 ">
                    Smart Iteration
                  </div>
                  <p>
                    The AI learns from each interaction, improving suggestions
                    and variations for your designs.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="global-container">
        <div className="h-[1px] w-full bg-[#EAEDF0]"></div>
      </div>

      <section id="content-section-1">
        <div className="pb-20 pt-20 md:pb-36 md:pt-32 lg:pb-28 xl:pb-[220px] xl:pt-[130px] xxl:pt-[200px]">
          <div className="global-container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_.8fr)_1fr] xl:gap-28 xxl:gap-[134px]">
              <div
                className="jos order-2 mt-16 rounded-md md:order-1 md:mt-0"
                data-jos_animation="fade-up"
              >
                <Image
                  src="/img/content-3.webp"
                  alt="th2-content-img-1.png"
                  width="520"
                  height="564"
                  className="rounded-lg"
                />
              </div>

              <div
                className="jos order-1 md:order-2"
                data-jos_animation="fade-right"
              >
                <div className="mb-6">
                  <h2 className="font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]">
                    Human-Like Creativity, AI Efficiency
                  </h2>
                </div>

                <div className="text-lg leading-[1.66]">
                  <p className="mb-7 last:mb-0">
                    Our AI doesn't just modify images; it understands your
                    intent and the context of your design goals. It's like
                    conversing with a designer who speaks the language of
                    creativity.
                  </p>
                  <ul className="mt-12 flex flex-col gap-y-6 font-clashDisplay text-[22px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]">
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Speak naturally about your design goals.
                    </li>
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Enjoy interactions that feel collaborative and intuitive.
                    </li>
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Express your style, and let the AI bring it to life.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="content-section-2">
        <div className="pb-20 md:pb-36 lg:pb-28 xl:pb-[220px]">
          <div className="global-container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1fr)_.8fr] xl:gap-28 xxl:gap-[134px]">
              <div
                className="jos order-2 mt-16 rounded-md md:mt-0"
                data-jos_animation="fade-up"
              >
                <Image
                  src="/img/content-4.webp"
                  alt="th2-content-img-2.png"
                  width="520"
                  height="564"
                  className="rounded-lg"
                />
              </div>

              <div className="jos order-1" data-jos_animation="fade-right">
                <div className="mb-6">
                  <h2 className="font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]">
                    Your Favorite Tools, Integrated
                  </h2>
                </div>

                <div className="text-lg leading-[1.66]">
                  <p className="mb-7 last:mb-0">
                    TureAI integrates seamlessly with your existing design
                    workflow. Connect with popular software and platforms, and
                    keep your creative process flowing without interruptions.
                  </p>
                  <ul className="mt-12 flex flex-col gap-y-6 font-clashDisplay text-[18px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]">
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Explore Integrations
                    </li>
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Connect with your favorite design tools.
                    </li>
                    <li className="relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet">
                      Enhance your workflow without disruptions.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq-section">
        <div className="pb-40 xl:pb-[220px]">
          <div className="global-container">
            <div className="jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]">
              <h2 className="font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]">
                FAQs About AI and Design
              </h2>
            </div>

            <ul className="accordion flex flex-col gap-y-6">
              <li
                className="jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] active"
                data-jos_delay="0.1"
              >
                <div className="accordion-header flex items-center justify-between">
                  <h5 className="font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]">
                    What is AI-Driven Design?
                  </h5>
                  <div className="accordion-icon is-blue">
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus.svg"
                      alt="plus"
                    />
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus-white.svg"
                      alt="plus-white"
                    />
                  </div>
                </div>
                <div className="accordion-content text-lg text-[#2C2C2C]">
                  <p>
                    It's the use of artificial intelligence to create or modify
                    visual content, offering unique design suggestions
                    influenced by your preferences.
                  </p>
                </div>
              </li>

              <li
                className="jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px]"
                data-jos_delay="0.1"
              >
                <div className="accordion-header flex items-center justify-between">
                  <h5 className="font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]">
                    How Does TureAI Enhance Creativity?
                  </h5>
                  <div className="accordion-icon is-blue">
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus.svg"
                      alt="plus"
                    />
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus-white.svg"
                      alt="plus-white"
                    />
                  </div>
                </div>
                <div className="accordion-content text-lg text-[#2C2C2C]">
                  <p>
                    Our platform uses AI to expand upon your ideas, offering
                    design alternatives that you might not have considered.
                  </p>
                </div>
              </li>

              <li
                className="jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px]"
                data-jos_delay="0.1"
              >
                <div className="accordion-header flex items-center justify-between">
                  <h5 className="font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]">
                    Can I Integrate TureAI into My Existing Workflow?
                  </h5>
                  <div className="accordion-icon is-blue">
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus.svg"
                      alt="plus"
                    />
                    <Image
                      width={24}
                      height={24}
                      src="/img/plus-white.svg"
                      alt="plus-white"
                    />
                  </div>
                </div>
                <div className="accordion-content text-lg text-[#2C2C2C]">
                  <p>
                    Absolutely! Our tool is designed to fit into your current
                    design process, enhancing your capabilities without
                    disrupting your workflow.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WebcamCapture;
