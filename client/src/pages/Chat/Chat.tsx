import "./Chat.css";
import { useState, useEffect } from "react";
import { getChats, getChat, createChat } from "../../utils/api";
import type { Chat as ChatType } from "../../utils/api";
import type { Message as messageType } from "../../utils/api";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || "New Chat";
    try {
      const res = await createChat(title);
      if (res.data) {
        setIsCreatingChat(false);
        setNewChatTitle("");
        setChats((prev) => [res.data, ...prev]);
        setActiveChatId(res.data._id);
      }
    } catch {
      setChatsError("Failed to create chat");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getChats();
        setChats(res.data ?? []);
      } catch {
        setChatsError("Failed to load chats");
      } finally {
        setIsLoadingChats(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }
    const load = async () => {
      setMessages([]);
      setMessagesError("");
      setIsLoadingMessages(true);
      try {
        const res = await getChat(activeChatId);
        setMessages(res.data?.messages || []);
      } catch {
        setMessagesError("Failed to load messages");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    load();
  }, [activeChatId]);

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button
          className="chat__sidebar-new-btn"
          type="button"
          onClick={() => {
            setIsCreatingChat(true);
          }}
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
            onChange={(e) => {
              setNewChatTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateChat();
              if (e.key === "Escape") {
                setIsCreatingChat(false);
                setNewChatTitle("");
              }
            }}
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
              onClick={() => {
                setActiveChatId(chat._id);
              }}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </aside>
      <div className="chat__main">
        {!messagesError && !isLoadingMessages && !activeChatId && (
          <div className="chat__no-messages">
            <button
              className="chat__new-btn"
              type="button"
              onClick={() => {
                setIsCreatingChat(true);
              }}
            >
              + New Chat
            </button>
          </div>
        )}

        {!messagesError &&
          !isLoadingMessages &&
          activeChatId &&
          messages.length === 0 && (
            <div className="chat__no-messages">
              {/* "Chat selected but no messages" Figma frame. */}
            </div>
          )}

        {activeChatId && isLoadingMessages && (
          <p className="chat__no-messages">loading message</p>
        )}

        {activeChatId && messagesError && (
          <div className="chat__error">{messagesError}</div>
        )}

        {activeChatId &&
          !isLoadingMessages &&
          !messagesError &&
          messages.length > 0 && (
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
            </ul>
          )}
      </div>
    </div>
  );
}
