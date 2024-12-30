import { responseMessages } from "@data/response-data/response-messages";

export const getResponseMessage = (key: string) => {
  return responseMessages[key] || "Error occurred. Try again later";
};
