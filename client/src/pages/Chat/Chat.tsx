import "./Chat.css";
import { useState, useEffect } from "react";
import { getChats, createChat } from "../../utils/api";
import type { Chat as ChatType } from "../../utils/api";

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

const handleCreateChat = async () => {
const title = newChatTitle.trim() || 'New Chat';
try {
 const res = await createChat(title);
 if (res.data) {
setIsCreatingChat(false);
                setNewChatTitle("");
  setChats((prev) => [res.data, ...prev]);
setActiveChatId(res.data._id)
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

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button className="chat__new-btn" type="button" onClick={() => { setIsCreatingChat(true); }}>
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
      <div className="chat__main">{/*message chat coming soon*/}</div>
    </div>
  );
}
