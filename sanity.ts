import { createClient } from "@sanity/client";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "dng9h7v3",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-10-21", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export default async function getTest(index: number) {
  const test = client
    .fetch(
      `*[_type == "test"][0]{Array[${index}]{name, image{"url": asset->url}, files{"url": asset->url}}}`
    )
    .then((text) => {
      console.log(text);
    });
  return test;
}
