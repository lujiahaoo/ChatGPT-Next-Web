import type {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "openai";

export type ChatRequest = CreateChatCompletionRequest;
export type ChatResponse = CreateChatCompletionResponse;
<<<<<<< HEAD
=======

export type Updater<T> = (updater: (value: T) => void) => void;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
