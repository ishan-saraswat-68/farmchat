import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../firebase-config"
import '../styles/chat.css'

export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );

        const unsuscribe = onSnapshot(
            queryMessages, 
            (snapshot) => {
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({ ...doc.data(), id: doc.id });
                });
                setMessages(messages);
                setLoading(false);
                setError(null);
            },
            (error) => {
                console.error("Firestore error:", error);
                setError(
                    <div>
                        <p>Index required: {error.message}</p>
                        <a 
                            href="https://console.firebase.google.com/project/ishan-saraswat/firestore/indexes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{color: 'blue', textDecoration: 'underline'}}
                        >
                            Click here to create the required index
                        </a>
                        <p style={{fontSize: '12px', marginTop: '10px'}}>
                            Or wait 2-5 minutes if you already created it
                        </p>
                    </div>
                );
                setLoading(false);
            }
        );

        return () => unsuscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trimmedMessage = newMessage.trim();
        if (trimmedMessage === "") {
            setNewMessage("");
            return;
        }

        if (!auth.currentUser) {
            setError("User not authenticated");
            return;
        }

        try {
            await addDoc(messagesRef, {
                text: trimmedMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName || "Anonymous",
                room,
                userId: auth.currentUser.uid // Add user ID for better identification
            });
            setNewMessage("");
            setError(null);
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message: " + error.message);
        }
    }

    // Check if message is from current user
    const isCurrentUser = (messageUser) => {
        return auth.currentUser && 
            (messageUser === auth.currentUser.displayName || 
             messageUser === auth.currentUser.email);
    }

    if (loading) {
        return (
            <div className="chat-app">
                <div className="header">
                    <h1>Welcome to: {room.toUpperCase()}</h1>
                </div>
                <div style={{padding: '20px', textAlign: 'center'}}>
                    Loading messages...
                </div>
            </div>
        );
    }

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            
            {error && (
                <div className="error">
                    {error}
                </div>
            )}
            
            <div className="messages">
                {messages.length === 0 && !error ? (
                    <div className="no-messages">No messages yet. Start the conversation!</div>
                ) : (
                    messages.map((message) => {
                        const isSender = isCurrentUser(message.user);
                        return (
                            <div 
                                key={message.id} 
                                className={`message ${isSender ? 'sender' : 'receiver'}`}
                            >
                                <div className="message-content">
                                    {!isSender && (
                                        <span className="user">{message.user}</span>
                                    )}
                                    <span className="text">{message.text}</span>
                                    {message.createdAt && (
                                        <span className="timestamp">
                                            {new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input 
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    maxLength={500}
                    disabled={!!error}
                />
                <button 
                    className="send-button" 
                    type="submit"
                    disabled={!newMessage.trim() || !!error}
                >
                    Send
                </button>
            </form>
        </div>
    )
}