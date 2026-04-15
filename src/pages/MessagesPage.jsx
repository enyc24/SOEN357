import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

// ─── Hardcoded Data ───────────────────────────────────────────────────────────

const CONVERSATIONS = [
    {
        id: 1,
        name: "David S.",
        initials: "DS",
        color: "#A8BCD4",
        preview: "Wanna try Patty Slaps this Friday?",
        time: "5h",
        messages: [
            { id: 1, sender: "them", senderName: "David S.", text: "Hey! Have you been to Patty Slaps yet?", time: "5:10 PM" },
            { id: 2, sender: "me", text: "Not yet. It is on my wishlist though.", time: "5:12 PM" },
            { id: 3, sender: "them", senderName: "David S.", text: "We should go this Friday. I saw Jordan saved it too.", time: "5:13 PM" },
            {
                id: 4,
                sender: "them",
                type: "restaurant-card",
                restaurant: {
                    name: "Patty Slaps",
                    tags: "Burgers | Downtown | $$ | Open Fri 5 PM",
                    icon: "🍔",
                },
                time: "5:13 PM",
            },
            { id: 5, sender: "me", text: "I am in. Let us go at 7 PM?", time: "5:15 PM" },
        ],
    },
    {
        id: 2,
        name: "Sophie T.",
        initials: "ST",
        color: "#F4A9A8",
        preview: "You should try the rare beef at Pho Saigon.",
        time: "2h",
        messages: [
            { id: 1, sender: "them", senderName: "Sophie T.", text: "You should try the rare beef at Pho Saigon. It is incredible.", time: "3:00 PM" },
            { id: 2, sender: "me", text: "No way. I have been meaning to go there.", time: "3:05 PM" },
            { id: 3, sender: "them", senderName: "Sophie T.", text: "The broth alone is worth it. Go on a weekday for a shorter wait.", time: "3:06 PM" },
        ],
    },
    {
        id: 3,
        name: "Maria G.",
        initials: "MG",
        color: "#7BBF7B",
        preview: "The pizza was insane, by the way.",
        time: "1d",
        messages: [
            { id: 1, sender: "me", text: "Did you end up going to Forno last night?", time: "Yesterday" },
            { id: 2, sender: "them", senderName: "Maria G.", text: "Yes. The pizza was amazing.", time: "Yesterday" },
            { id: 3, sender: "me", text: "I knew it. Their margherita is next level.", time: "Yesterday" },
        ],
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 40 }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: size * 0.35,
                color: "#fff",
                flexShrink: 0,
            }}
        >
            {initials}
        </div>
    );
}

function RestaurantCard({ restaurant }) {
    return (
        <div
            style={{
                background: "#FDF3E3",
                border: "1px solid #E8C98A",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                maxWidth: 340,
            }}
        >
            <div style={{ fontSize: 36, lineHeight: 1 }}>{restaurant.icon}</div>
            <div>
                <div style={{ color: "#B8860B", fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
                    Restaurant shared
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A" }}>{restaurant.name}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{restaurant.tags}</div>
            </div>
        </div>
    );
}

function MessageBubble({ msg }) {
    const isMe = msg.sender === "me";

    if (msg.type === "restaurant-card") {
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                <RestaurantCard restaurant={msg.restaurant} />
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                marginBottom: 10,
            }}
        >
            {!isMe && msg.senderName && (
                <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{msg.senderName}</div>
            )}
            <div
                style={{
                    background: isMe ? "#A0720A" : "#fff",
                    color: isMe ? "#fff" : "#1A1A1A",
                    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "10px 14px",
                    maxWidth: 320,
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow: isMe ? "none" : "0 1px 3px rgba(0,0,0,0.08)",
                }}
            >
                {msg.text}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MessagesPage() {
    const [conversations, setConversations] = useState(CONVERSATIONS);
    const [selectedConversationId, setSelectedConversationId] = useState(CONVERSATIONS[0].id);
    const [inputText, setInputText] = useState("");

    const selectedConversation = useMemo(
        () => conversations.find((conv) => conv.id === selectedConversationId) || conversations[0],
        [conversations, selectedConversationId]
    );

    const handleSend = () => {
        const trimmed = inputText.trim();
        if (!trimmed) return;

        const newMsg = {
            id: Date.now(),
            sender: "me",
            text: trimmed,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === selectedConversation.id
                    ? { ...conv, messages: [...conv.messages, newMsg], preview: trimmed, time: "now" }
                    : conv
            )
        );

        setInputText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    height: "calc(100vh - 56px)",
                    overflow: "hidden",
                    background: "#F5F0EB",
                }}
            >
                {/* ── Conversation List ── */}
                <div
                    style={{
                        width: 320,
                        borderRight: "1px solid #E8E2D8",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #EEE" }}>
                        <h1 style={{ fontSize: 24, color: "#2C2C2A" }}>Messages</h1>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {conversations.map((conv) => {
                            const isActive = conv.id === selectedConversation.id;
                            return (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderBottom: "1px solid #F1ECE3",
                                        background: isActive ? "#FDF3E3" : "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "14px 18px",
                                        textAlign: "left",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Avatar initials={conv.initials} color={conv.color} size={42} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                                            <span style={{ fontWeight: 700, fontSize: 14, color: "#1A1A1A" }}>{conv.name}</span>
                                            <span style={{ fontSize: 12, color: "#999" }}>{conv.time}</span>
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: "#777",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {conv.preview}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Chat Panel ── */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            padding: "16px 22px",
                            borderBottom: "1px solid #E0D8CE",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            background: "#F5F0EB",
                        }}
                    >
                        <Avatar initials={selectedConversation.initials} color={selectedConversation.color} size={36} />
                        <span style={{ fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>{selectedConversation.name}</span>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                        {selectedConversation.messages.map((msg) => (
                            <MessageBubble key={msg.id} msg={msg} />
                        ))}
                    </div>

                    <div
                        style={{
                            padding: "14px 20px",
                            borderTop: "1px solid #E0D8CE",
                            display: "flex",
                            gap: 10,
                            background: "#F5F0EB",
                        }}
                    >
                        <input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Message ${selectedConversation.name.split(" ")[0]}...`}
                            style={{
                                flex: 1,
                                border: "1px solid #DDD",
                                borderRadius: 8,
                                padding: "10px 12px",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                border: "none",
                                borderRadius: 8,
                                padding: "10px 18px",
                                background: "#1A1A1A",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}