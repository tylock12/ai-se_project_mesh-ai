import "./Chat.css";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getChats, getChat, createChat, sendMessage } from "../../utils/api";
import type { Chat as ChatType, Message } from "../../utils/api";

type MobileContext = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

export default function Chat() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } =
    useOutletContext<MobileContext>();

  // Chat list
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  // Active chat
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  // Message input
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Scrolling
  const messagesEndRef = useRef<HTMLLIElement>(null);

  // Tracks the current chat so a late reply doesn't land in the wrong chat
  const activeChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  // Load the list of chats once
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await getChats();
        setChats(res.data ?? []);
      } catch {
        setChatsError("Failed to load chats");
      } finally {
        setIsLoadingChats(false);
      }
    };

    loadChats();
  }, []);

  // Load messages whenever the active chat changes
  useEffect(() => {
    if (!activeChatId) return;
    let cancelled = false;

    const loadMessages = async () => {
      setMessages([]);
      setMessagesError(null);
      setIsLoadingMessages(true);
      try {
        const res = await getChat(activeChatId);
        if (!cancelled) setMessages(res.data?.messages ?? []);
      } catch {
        if (!cancelled) setMessagesError("Failed to load messages");
      } finally {
        if (!cancelled) setIsLoadingMessages(false);
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [activeChatId]);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const closeNewChatInput = () => {
    setIsCreatingChat(false);
    setNewChatTitle("");
  };

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || "New Chat";
    setChatsError(null);
    try {
      const res = await createChat(title);
      const newChat = res.data;
      if (newChat) {
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newChat._id);
        closeNewChatInput();
        setIsMobileMenuOpen(false);
      }
    } catch {
      setChatsError("Failed to create chat");
    }
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setIsMobileMenuOpen(false);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !activeChatId || isSending) return;

    const chatId = activeChatId;

    const userMessage: Message = {
      _id: crypto.randomUUID(),
      chatId,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const res = await sendMessage(activeChatId, text);
      const saved = res.data;
      if (saved) {
        setMessages((prev) => [
          ...prev.filter((msg) => msg._id !== userMessage._id),
          ...saved,
        ]);
      }
    } catch {
      if (activeChatIdRef.current === chatId) {
        const errorMessage: Message = {
          _id: crypto.randomUUID(),
          chatId,
          role: "assistant",
          content: "Something went wrong. Please try again.",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreateChat();
    if (e.key === "Escape") closeNewChatInput();
  };

  return (
    <div className="chat">
      <aside
        className={`chat__sidebar${isMobileMenuOpen ? " chat__sidebar_open" : ""}`}
      >
        <button
          className="chat__sidebar-new-btn"
          type="button"
          onClick={() => setIsCreatingChat(true)}
        >
          + New Chat
        </button>

        {isLoadingChats && <p className="chat__sidebar-message">Loading…</p>}
        {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

        {isCreatingChat && (
          <input
            className="chat__title-input"
            type="text"
            placeholder="Chat name"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        )}

        <ul className="chat__list">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className={
                chat._id === activeChatId
                  ? "chat__item chat__item_active"
                  : "chat__item"
              }
              role="button"
              tabIndex={0}
              onClick={() => handleSelectChat(chat._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectChat(chat._id);
                }
              }}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </aside>

      <div className="chat__main">
        {!activeChatId && !isLoadingMessages && !messagesError && (
          <div className="chat__empty">
            <h2 className="chat__empty-title">
              Create a new chat or select an existing one to start the
              conversation
            </h2>
            <button
              className="chat__new-btn"
              type="button"
              onClick={() => {
                setIsCreatingChat(true);
                setIsMobileMenuOpen(true);
              }}
            >
              Start New Chat
            </button>
          </div>
        )}

        {activeChatId && isLoadingMessages && (
          <p className="chat__no-messages">Loading messages…</p>
        )}

        {activeChatId && messagesError && (
          <div className="chat__error">{messagesError}</div>
        )}

        {activeChatId && !isLoadingMessages && !messagesError && (
          <>
            {messages.length > 0 ? (
              <ul className="chat__messages">
                {messages.map((msg) => (
                  <li
                    key={msg._id}
                    className={
                      msg.role === "user"
                        ? "chat__message chat__message_user"
                        : "chat__message chat__message_assistant"
                    }
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </li>
                ))}
                {isSending && (
                  <li className="chat__message chat__message_assistant chat__message_thinking">
                  Thinking...
                  </li>
                )}
                <li ref={messagesEndRef} />
              </ul>
            ) : (
              <p className="chat__no-messages">
                Create new chat or select an existing one to start the
                conversation
              </p>
            )}

            <div className="chat__input-bar">
              <textarea
                className="chat__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isSending}
                placeholder="Ask any question"
                rows={1}
              />
              <button
                className="chat__send"
                type="button"
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                aria-label="Send message"
              ></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
