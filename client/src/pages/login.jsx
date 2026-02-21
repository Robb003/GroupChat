import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { registerUser } from "../Services/api";

export default function Login ({ setUser }) {
    const [username, setUserName] = useState("");
    const  navigate = useNavigate();

    //how the frontend communicates with the backened

    const handleLogin = async () => {
    const res = await registerUser(username);
    setUser(res.data);
    navigate("/");
};

    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-96">
                <h1 className="text-xl font-bold mb-4">Join Chat</h1>
                <input
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Username"
                    value = {username}
                    onChange={(e)=>setUserName(e.target.value)}
                />
                <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
                    Enter 
                </button>
            </div>
        </div>
    )
};