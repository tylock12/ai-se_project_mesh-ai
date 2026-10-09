import "./Chat.css";
import { useState, useEffect } from "react";
import { getChats, createChat } from "../../utils/api";
import { Chat as ChatType } from "../../utils/api";

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

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
      <h2>Chats</h2>
      {isLoadingChats ? (
        <p>Loading chats...</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>{chat.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

