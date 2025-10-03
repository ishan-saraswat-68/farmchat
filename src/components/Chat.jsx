import { useState } from "react";
import { addDoc, collection } from 'firebase/firestore'
export const Chat = () =>{
    const [newMessage,setNewMessage] = useState("")

    const messagesRef = collection(db, "messages");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(newMessage === "")return

        await addDoc(messagesRef, )
    }
    return (<div className="chat-app">
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input className="new-message-input" 
            placeholder="Type your message here ..."
            onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button" type="type">
                Send
            </button>
        </form>
    </div>)
}