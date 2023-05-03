import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type ChatCompletionResponseMessage } from "openai";
import {
  ControllerPool,
  requestChatStream,
  requestWithPrompt,
} from "../requests";
import { isMobileScreen, trimTopic } from "../utils";

import Locale from "../locales";
import { showToast } from "../components/ui-lib";
<<<<<<< HEAD:app/store/app.ts
=======
import { DEFAULT_CONFIG, ModelConfig, ModelType, useAppConfig } from "./config";
import { createEmptyMask, Mask } from "./mask";
import { StoreKey } from "../constant";
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts

export type Message = ChatCompletionResponseMessage & {
  date: string;
  streaming?: boolean;
  isError?: boolean;
  id?: number;
<<<<<<< HEAD:app/store/app.ts
=======
  model?: ModelType;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
};

export function createMessage(override: Partial<Message>): Message {
  return {
    id: Date.now(),
    date: new Date().toLocaleString(),
    role: "user",
    content: "",
    ...override,
<<<<<<< HEAD:app/store/app.ts
  };
}

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

export interface ChatConfig {
  historyMessageCount: number; // -1 means all
  compressMessageLengthThreshold: number;
  sendBotMessages: boolean; // send bot's message or not
  submitKey: SubmitKey;
  avatar: string;
  fontSize: number;
  theme: Theme;
  tightBorder: boolean;
  sendPreviewBubble: boolean;
  sidebarWidth: number;

  disablePromptHint: boolean;

  modelConfig: {
    model: string;
    temperature: number;
    max_tokens: number;
    presence_penalty: number;
=======
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
  };
}

export const ROLES: Message["role"][] = ["system", "user", "assistant"];

<<<<<<< HEAD:app/store/app.ts
const ENABLE_GPT4 = true;

export const ALL_MODELS = [
  {
    name: "gpt-4",
    available: ENABLE_GPT4,
  },
  {
    name: "gpt-4-0314",
    available: ENABLE_GPT4,
  },
  {
    name: "gpt-4-32k",
    available: ENABLE_GPT4,
  },
  {
    name: "gpt-4-32k-0314",
    available: ENABLE_GPT4,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
  },
];

export function limitNumber(
  x: number,
  min: number,
  max: number,
  defaultValue: number,
) {
  if (typeof x !== "number" || isNaN(x)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, x));
}

export function limitModel(name: string) {
  return ALL_MODELS.some((m) => m.name === name && m.available)
    ? name
    : ALL_MODELS[4].name;
}

export const ModalConfigValidator = {
  model(x: string) {
    return limitModel(x);
  },
  max_tokens(x: number) {
    return limitNumber(x, 0, 32000, 2000);
  },
  presence_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  temperature(x: number) {
    return limitNumber(x, 0, 2, 1);
  },
};

const DEFAULT_CONFIG: ChatConfig = {
  historyMessageCount: 4,
  compressMessageLengthThreshold: 1000,
  sendBotMessages: true as boolean,
  submitKey: SubmitKey.CtrlEnter as SubmitKey,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: false,
  sendPreviewBubble: true,
  sidebarWidth: 300,

  disablePromptHint: false,

  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
  },
};

=======
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
export interface ChatStat {
  tokenCount: number;
  wordCount: number;
  charCount: number;
}

export interface ChatSession {
  id: number;

  topic: string;
<<<<<<< HEAD:app/store/app.ts
  sendMemory: boolean;
=======

>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
  memoryPrompt: string;
  messages: Message[];
  stat: ChatStat;
  lastUpdate: number;
  lastSummarizeIndex: number;

  mask: Mask;
}

<<<<<<< HEAD:app/store/app.ts
const DEFAULT_TOPIC = Locale.Store.DefaultTopic;
=======
export const DEFAULT_TOPIC = Locale.Store.DefaultTopic;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
export const BOT_HELLO: Message = createMessage({
  role: "assistant",
  content: Locale.Store.BotHello,
});

function createEmptySession(): ChatSession {
  return {
    id: Date.now() + Math.random(),
    topic: DEFAULT_TOPIC,
    sendMemory: true,
    memoryPrompt: "",
    messages: [],
    stat: {
      tokenCount: 0,
      wordCount: 0,
      charCount: 0,
    },
    lastUpdate: Date.now(),
    lastSummarizeIndex: 0,
    mask: createEmptyMask(),
  };
}

interface ChatStore {
  sessions: ChatSession[];
  currentSessionIndex: number;
  globalId: number;
  clearSessions: () => void;
<<<<<<< HEAD:app/store/app.ts
  removeSession: (index: number) => void;
  moveSession: (from: number, to: number) => void;
  selectSession: (index: number) => void;
  newSession: () => void;
  deleteSession: (index?: number) => void;
=======
  moveSession: (from: number, to: number) => void;
  selectSession: (index: number) => void;
  newSession: (mask?: Mask) => void;
  deleteSession: (index: number) => void;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
  currentSession: () => ChatSession;
  onNewMessage: (message: Message) => void;
  onUserInput: (content: string) => Promise<void>;
  summarizeSession: () => void;
  updateStat: (message: Message) => void;
  updateCurrentSession: (updater: (session: ChatSession) => void) => void;
  updateMessage: (
    sessionIndex: number,
    messageIndex: number,
    updater: (message?: Message) => void,
  ) => void;
  resetSession: () => void;
  getMessagesWithMemory: () => Message[];
  getMemoryPrompt: () => Message;

  clearAllData: () => void;
}

function countMessages(msgs: Message[]) {
  return msgs.reduce((pre, cur) => pre + cur.content.length, 0);
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [createEmptySession()],
      currentSessionIndex: 0,
      globalId: 0,

      clearSessions() {
        set(() => ({
          sessions: [createEmptySession()],
          currentSessionIndex: 0,
        }));
      },

      selectSession(index: number) {
        set({
          currentSessionIndex: index,
        });
      },

      moveSession(from: number, to: number) {
        set((state) => {
          const { sessions, currentSessionIndex: oldIndex } = state;

          // move the session
          const newSessions = [...sessions];
          const session = newSessions[from];
          newSessions.splice(from, 1);
          newSessions.splice(to, 0, session);

          // modify current session id
          let newIndex = oldIndex === from ? to : oldIndex;
          if (oldIndex > from && oldIndex <= to) {
            newIndex -= 1;
          } else if (oldIndex < from && oldIndex >= to) {
            newIndex += 1;
          }

          return {
            currentSessionIndex: newIndex,
            sessions: newSessions,
          };
        });
      },

<<<<<<< HEAD:app/store/app.ts
      moveSession(from: number, to: number) {
        set((state) => {
          const { sessions, currentSessionIndex: oldIndex } = state;

          // move the session
          const newSessions = [...sessions];
          const session = newSessions[from];
          newSessions.splice(from, 1);
          newSessions.splice(to, 0, session);

          // modify current session id
          let newIndex = oldIndex === from ? to : oldIndex;
          if (oldIndex > from && oldIndex <= to) {
            newIndex -= 1;
          } else if (oldIndex < from && oldIndex >= to) {
            newIndex += 1;
          }

          return {
            currentSessionIndex: newIndex,
            sessions: newSessions,
          };
        });
      },

      newSession() {
=======
      newSession(mask) {
        const session = createEmptySession();

        set(() => ({ globalId: get().globalId + 1 }));
        session.id = get().globalId;

        if (mask) {
          session.mask = { ...mask };
          session.topic = mask.name;
        }

>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        set((state) => ({
          currentSessionIndex: 0,
          sessions: [session].concat(state.sessions),
        }));
      },

<<<<<<< HEAD:app/store/app.ts
      deleteSession(i?: number) {
        const deletedSession = get().currentSession();
        const index = i ?? get().currentSessionIndex;
        const isLastSession = get().sessions.length === 1;
        if (!isMobileScreen() || confirm(Locale.Home.DeleteChat)) {
          get().removeSession(index);

          showToast(
            Locale.Home.DeleteToast,
            {
              text: Locale.Home.Revert,
              onClick() {
                set((state) => ({
                  sessions: state.sessions
                    .slice(0, index)
                    .concat([deletedSession])
                    .concat(
                      state.sessions.slice(index + Number(isLastSession)),
                    ),
                }));
              },
            },
            5000,
          );
        }
=======
      deleteSession(index) {
        const deletingLastSession = get().sessions.length === 1;
        const deletedSession = get().sessions.at(index);

        if (!deletedSession) return;

        const sessions = get().sessions.slice();
        sessions.splice(index, 1);

        let nextIndex = Math.min(
          get().currentSessionIndex,
          sessions.length - 1,
        );

        if (deletingLastSession) {
          nextIndex = 0;
          sessions.push(createEmptySession());
        }

        // for undo delete action
        const restoreState = {
          currentSessionIndex: get().currentSessionIndex,
          sessions: get().sessions.slice(),
        };

        set(() => ({
          currentSessionIndex: nextIndex,
          sessions,
        }));

        showToast(
          Locale.Home.DeleteToast,
          {
            text: Locale.Home.Revert,
            onClick() {
              set(() => restoreState);
            },
          },
          5000,
        );
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
      },

      currentSession() {
        let index = get().currentSessionIndex;
        const sessions = get().sessions;

        if (index < 0 || index >= sessions.length) {
          index = Math.min(sessions.length - 1, Math.max(0, index));
          set(() => ({ currentSessionIndex: index }));
        }

        const session = sessions[index];

        return session;
      },

      onNewMessage(message) {
        get().updateCurrentSession((session) => {
          session.lastUpdate = Date.now();
        });
        get().updateStat(message);
        get().summarizeSession();
      },

      async onUserInput(content) {
<<<<<<< HEAD:app/store/app.ts
=======
        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;

>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        const userMessage: Message = createMessage({
          role: "user",
          content,
        });

        const botMessage: Message = createMessage({
          role: "assistant",
          streaming: true,
          id: userMessage.id! + 1,
<<<<<<< HEAD:app/store/app.ts
=======
          model: modelConfig.model,
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        });

        // get recent messages
        const recentMessages = get().getMessagesWithMemory();
        const sendMessages = recentMessages.concat(userMessage);
        const sessionIndex = get().currentSessionIndex;
        const messageIndex = get().currentSession().messages.length + 1;

        // save user's and bot's message
        get().updateCurrentSession((session) => {
          session.messages.push(userMessage);
          session.messages.push(botMessage);
        });

        // make request
        console.log("[User Input] ", sendMessages);
        requestChatStream(sendMessages, {
          onMessage(content, done) {
            // stream response
            if (done) {
              botMessage.streaming = false;
              botMessage.content = content;
              get().onNewMessage(botMessage);
              ControllerPool.remove(
                sessionIndex,
                botMessage.id ?? messageIndex,
              );
            } else {
              botMessage.content = content;
              set(() => ({}));
            }
          },
          onError(error, statusCode) {
            const isAborted = error.message.includes("aborted");
            if (statusCode === 401) {
              botMessage.content = Locale.Error.Unauthorized;
<<<<<<< HEAD:app/store/app.ts
            } else if (!error.message.includes("aborted")) {
=======
            } else if (!isAborted) {
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
              botMessage.content += "\n\n" + Locale.Store.Error;
            }
            botMessage.streaming = false;
            userMessage.isError = !isAborted;
            botMessage.isError = !isAborted;

            set(() => ({}));
            ControllerPool.remove(sessionIndex, botMessage.id ?? messageIndex);
          },
          onController(controller) {
            // collect controller for stop/retry
            ControllerPool.addController(
              sessionIndex,
              botMessage.id ?? messageIndex,
              controller,
            );
          },
          modelConfig: { ...modelConfig },
        });
      },

      getMemoryPrompt() {
        const session = get().currentSession();

        return {
          role: "system",
          content:
            session.memoryPrompt.length > 0
              ? Locale.Store.Prompt.History(session.memoryPrompt)
              : "",
          date: "",
        } as Message;
      },

      getMessagesWithMemory() {
        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;
        const messages = session.messages.filter((msg) => !msg.isError);
        const n = messages.length;

        const context = session.mask.context.slice();

        // long term memory
        if (
<<<<<<< HEAD:app/store/app.ts
          session.sendMemory &&
=======
          modelConfig.sendMemory &&
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
          session.memoryPrompt &&
          session.memoryPrompt.length > 0
        ) {
          const memoryPrompt = get().getMemoryPrompt();
          context.push(memoryPrompt);
        }

        // get short term and unmemoried long term memory
        const shortTermMemoryMessageIndex = Math.max(
          0,
<<<<<<< HEAD:app/store/app.ts
          n - config.historyMessageCount,
=======
          n - modelConfig.historyMessageCount,
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        );
        const longTermMemoryMessageIndex = session.lastSummarizeIndex;
        const oldestIndex = Math.max(
          shortTermMemoryMessageIndex,
          longTermMemoryMessageIndex,
        );
<<<<<<< HEAD:app/store/app.ts
        const threshold = config.compressMessageLengthThreshold;
=======
        const threshold = modelConfig.compressMessageLengthThreshold;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts

        // get recent messages as many as possible
        const reversedRecentMessages = [];
        for (
          let i = n - 1, count = 0;
          i >= oldestIndex && count < threshold;
          i -= 1
        ) {
          const msg = messages[i];
          if (!msg || msg.isError) continue;
          count += msg.content.length;
          reversedRecentMessages.push(msg);
        }

        // concat
        const recentMessages = context.concat(reversedRecentMessages.reverse());

        return recentMessages;
      },

      updateMessage(
        sessionIndex: number,
        messageIndex: number,
        updater: (message?: Message) => void,
      ) {
        const sessions = get().sessions;
        const session = sessions.at(sessionIndex);
        const messages = session?.messages;
        updater(messages?.at(messageIndex));
        set(() => ({ sessions }));
      },

      resetSession() {
        get().updateCurrentSession((session) => {
          session.messages = [];
          session.memoryPrompt = "";
        });
      },

      summarizeSession() {
        const session = get().currentSession();

        // should summarize topic after chating more than 50 words
        const SUMMARIZE_MIN_LEN = 50;
        if (
          session.topic === DEFAULT_TOPIC &&
          countMessages(session.messages) >= SUMMARIZE_MIN_LEN
        ) {
<<<<<<< HEAD:app/store/app.ts
          requestWithPrompt(session.messages, Locale.Store.Prompt.Topic).then(
            (res) => {
              get().updateCurrentSession(
                (session) =>
                  (session.topic = res ? trimTopic(res) : DEFAULT_TOPIC),
              );
            },
          );
=======
          requestWithPrompt(session.messages, Locale.Store.Prompt.Topic, {
            model: "gpt-3.5-turbo",
          }).then((res) => {
            get().updateCurrentSession(
              (session) =>
                (session.topic = res ? trimTopic(res) : DEFAULT_TOPIC),
            );
          });
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        }

        const modelConfig = session.mask.modelConfig;
        let toBeSummarizedMsgs = session.messages.slice(
          session.lastSummarizeIndex,
        );

        const historyMsgLength = countMessages(toBeSummarizedMsgs);

        if (historyMsgLength > modelConfig?.max_tokens ?? 4000) {
          const n = toBeSummarizedMsgs.length;
          toBeSummarizedMsgs = toBeSummarizedMsgs.slice(
            Math.max(0, n - modelConfig.historyMessageCount),
          );
        }

        // add memory prompt
        toBeSummarizedMsgs.unshift(get().getMemoryPrompt());

        const lastSummarizeIndex = session.messages.length;

        console.log(
          "[Chat History] ",
          toBeSummarizedMsgs,
          historyMsgLength,
          modelConfig.compressMessageLengthThreshold,
        );

        if (
<<<<<<< HEAD:app/store/app.ts
          historyMsgLength > config.compressMessageLengthThreshold &&
          session.sendMemory
=======
          historyMsgLength > modelConfig.compressMessageLengthThreshold &&
          session.mask.modelConfig.sendMemory
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
        ) {
          requestChatStream(
            toBeSummarizedMsgs.concat({
              role: "system",
              content: Locale.Store.Prompt.Summarize,
              date: "",
            }),
            {
              overrideModel: "gpt-3.5-turbo",
              onMessage(message, done) {
                session.memoryPrompt = message;
                if (done) {
                  console.log("[Memory] ", session.memoryPrompt);
                  session.lastSummarizeIndex = lastSummarizeIndex;
                }
              },
              onError(error) {
                console.error("[Summarize] ", error);
              },
            },
          );
        }
      },

      updateStat(message) {
        get().updateCurrentSession((session) => {
          session.stat.charCount += message.content.length;
          // TODO: should update chat count and word count
        });
      },

      updateCurrentSession(updater) {
        const sessions = get().sessions;
        const index = get().currentSessionIndex;
        updater(sessions[index]);
        set(() => ({ sessions }));
      },

      clearAllData() {
        localStorage.clear();
        location.reload();
      },
    }),
    {
<<<<<<< HEAD:app/store/app.ts
      name: LOCAL_KEY,
      version: 1.2,
=======
      name: StoreKey.Chat,
      version: 2,
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
      migrate(persistedState, version) {
        const state = persistedState as any;
        const newState = JSON.parse(JSON.stringify(state)) as ChatStore;

        if (version < 2) {
          newState.globalId = 0;
          newState.sessions = [];

          const oldSessions = state.sessions;
          for (const oldSession of oldSessions) {
            const newSession = createEmptySession();
            newSession.topic = oldSession.topic;
            newSession.messages = [...oldSession.messages];
            newSession.mask.modelConfig.sendMemory = true;
            newSession.mask.modelConfig.historyMessageCount = 4;
            newSession.mask.modelConfig.compressMessageLengthThreshold = 1000;
            newState.sessions.push(newSession);
          }
        }

<<<<<<< HEAD:app/store/app.ts
        if (version < 1.2) {
          state.sessions.forEach((s) => (s.sendMemory = true));
        }

        return state;
=======
        return newState;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6:app/store/chat.ts
      },
    },
  ),
);
