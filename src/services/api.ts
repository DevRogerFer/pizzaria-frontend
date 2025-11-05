import axios from "axios";

function withProtocol(url: string) {
  if (!url) return "http://localhost:3333";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const baseURL = withProtocol(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333");

export const api = axios.create({ baseURL });
