import { useEffect, useState, useRef } from "react";

export default function ChatRoom({room, messages, user, socket}) {
    const [chat, setChat] = useState("");
    const [typingUser, setTypingUser] = useState("");
    const [chatMessages, setChatMessages] = useState(messages || []);
    const typingTimeoutRef = useRef(null)

    useEffect(()=>{
        //for displaying message
        socket.on("newMessage", (msg) => {
            setChatMessages((prev)=> [...prev, msg]);
        });
        //for displaying when user is typing
        socket.on("typing", ({username})=>{
            setTypingUser(username)
        });

        //when user stops typing

        socket.on("stopTyping", ()=>{
            setTypingUser("")
        });
        //clean up
        return ()=>{
            socket.off("newMessage");
            socket.off("typing");
            socket.off("stopTyping");
        };
    }, []);
    //somebody to see user typing
    const handleTyping= () => {
        socket.emit("typing", {roomId: room._id, username: user.username});
        //cleartimeout(typing timeout)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

         typingTimeoutRef.current = setTimeout(()=>{
            socket.emit("stopTyping", {roomId: room._id, username: user.username})  
         } ,1000);
    };
    //handle sending a message
    const handleSend = () => {
        if (!chat.trim()) return;
        socket.emit("sendMessage", chat.trim());
        setChat("");
    };
    return (
        <div>
            <h2 className="text-2xl mb-2"> { room.name }</h2>
            <div className="h-60 overflow-y-auto border mb-2 bg-gray-50">
                {chatMessages.map((msg)=> (
                    <p key={msg._id}>
                        <strong>{msg.sender.username}:</strong> {msg.content}
                    </p>
                ))}
            </div>
            
            <div className="mb-2 text-sm text-gray-600">
                { typingUser && `${typingUser} is typing...`}
            </div>
            <div className="flex gap-2">
                <input
                    className="flex-1 p-2 border rounded"
                    value={chat}
                    onChange={(e)=>setChat(e.target.value)}
                    onKeyDown={handleTyping}
                    placeholder="Type a message..."
                />
                <button className="bg-blue-500 text-white px-4 rounded" onClick={handleSend}>
                    send
                </button>
            </div>

        </div>
    )
}