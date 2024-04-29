// services/openaiService.ts

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { OpenAI } from "openai";
import { storage } from "../../firebase-config";

const clientOptions = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(clientOptions);

const uploadImageAndGetDesignSuggestions = async (imageFile: File) => {
  try {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    const prompt =
      "What’s in this image? Analyze the room. Act like architect. Max 3 sentences 50 characters in total.";

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",

          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    const suggestions =
      response?.choices?.[0]?.message?.content ?? "Default Value if Null";

    const secondResponse = await openai.images.generate({
      prompt: `Design a room based on the image and the following description: ${suggestions}`,
      model: "dall-e-3",
      response_format: "url",
    });

    return secondResponse;
  } catch (error) {
    console.error("Error in uploadImageAndGetDesignSuggestions: ", error);
    return error;
  }
};

export default uploadImageAndGetDesignSuggestions;
