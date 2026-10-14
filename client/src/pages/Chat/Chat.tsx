import "./Chat.css";
import { useState, useEffect } from "react";
import { getChats, getChat, createChat, sendMessage } from "../../utils/api";
import type { Chat as ChatType, Message } from "../../utils/api";
import ReactMarkdown from "react-markdown";
import { useOutletContext } from "react-router-dom";

type MobileContext = {
 isMobileMenuOpen: boolean;
 setIsMobileMenuOpen: (open: boolean) => void;
};

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useOutletContext<MobileContext>();


  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || "New Chat";
    try {
      const res = await createChat(title);
      const data = res.data;
        if(data){
          setChats((prev) => [data, ...prev]);
          setActiveChatId(data._id);
          setIsMobileMenuOpen(false);
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

const handleSend = async () => {
 const text = input.trim();
 if (!text || !activeChatId || isSending) return;

 const userMessage: Message = {
   _id: Date.now().toString(),
   chatId: activeChatId,
   role: "user",
   content: text,
   createdAt: new Date().toISOString(),
 };

setMessages((prev) => [...prev, userMessage]);
setInput("");
setIsSending(true);
 try {
   const res = await sendMessage(activeChatId, text);
   if (res.data) {
     setMessages((prev) => [...prev, res.data!]);
   }
 } catch {
const errorMessage: Message = {
  _id: Date.now().toString(),
  chatId: activeChatId,
  role: 'assistant',
  content: 'Something went wrong. Please try again.',
  createdAt: new Date().toISOString(),
};
setMessages((prev) => [...prev, errorMessage]);
 } finally {
   setIsSending(false);
 }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
 if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   handleSend();
 }
};

  return (
    <div className="chat">
<aside
 className={`chat__sidebar${
   isMobileMenuOpen ? ' chat__sidebar_open' : ''
 }`}
>        <button
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
                setIsMobileMenuOpen(false);
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
                setIsMobileMenuOpen(true);
              }}
            >
              + New Chat
            </button>
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
           (<>
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
            </ul>
           ) : <p className="chat__no-messages">no messages yet</p>}
            <div className="chat__input-bar">
  <textarea
    className="chat__input"
     value={input}
     onChange={(e) => setInput(e.target.value)}
     onKeyDown={handleKeyDown}
     disabled={isSending}
 
    placeholder="Ask any question"

    rows={1}
  />
  <button
    className="chat__send"
    type="button"
      onClick={() => {
        handleSend();
      }}
    aria-label="Send message"
  ></button>
</div>
          </>)}
      </div>
    </div>
  );
}
