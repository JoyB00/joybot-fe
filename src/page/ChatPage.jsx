import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import ApiChat from "../api/ApiChat.js";
import { TypeAnimation } from "react-type-animation";
import {BsSend} from "react-icons/bs";
import Sidebar from "../component/Sidebar.jsx";

export default function ChatPage() {
    const params = useParams();
    const [data, setData] = useState({
        message: "",
    });
    const [chatHistory, setChatHistory] = useState([]); // Menyimpan semua pesan
    const [loading, setLoading] = useState(false);

    const messageRefs = useRef([]);

    const scrollToMessage = (index) => {
        messageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSend = async (event) => {
        event.preventDefault();
        // Tambahkan pesan pengguna ke dalam riwayat obrolan
        const userMessage = { sender: "user", text: data.message };
        setChatHistory((prev) => [...prev, userMessage]);

        setLoading(true);
        try {
            const result = await ApiChat.sendMessage(data);
            // Tambahkan respons dari API ke dalam riwayat obrolan
            const botResponse = { sender: "bot", text: result.data };
            setChatHistory((prev) => [...prev, botResponse]);
        } catch (e) {
            console.log(e);
        } finally {
            setData({ ...data, message: "" }); // Kosongkan input
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[url('/public/image-from-rawpixel-id-14240344-jpeg.jpg')] bg-cyan-950 bg-blend-overlay p-10">
        <Sidebar chatHistory={chatHistory} onMessageClick={scrollToMessage}/>
            <div className="mt-4 lg:ml-64">
                <div className="text-center">
                    <p className="text-2xl text-lg-6xl font-black">🚀 Welcome To JOYBOT 🚀</p>
                    <div className="flex justify-center gap-x-2">
                        <IoDocumentTextOutline size={20} />
                        <p className="text-xs font-semibold">{params.filename}</p>
                    </div>
                </div>
                <div className="mt-12 text-justify">
                    {/* Tampilkan Riwayat Obrolan */}
                    <div className=" rounded-3xl p-5 min-h-20 max-w-6xl mx-auto">
                        {chatHistory.map((message, index) => (
                            <div className=" gap-x-1 mb-8" key={index}>
                                {message.sender === "bot" ? (
                                        <div className="flex justify-start">
                                            <div className="w-12 h-12 text-white ">
                                                <p className="flex items-center justify-center h-full text-2xl">🐶</p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-white font-semibold text-xl">JoyBot</p>
                                            </div>
                                        </div>
                                ): (
                                    <div className="flex justify-end">
                                        <div className="flex items-center">
                                            <p className="text-white font-semibold text-xl">You</p>
                                        </div>
                                        <div className="w-12 h-12 text-white ">
                                            <p className="flex items-center justify-center h-full text-2xl">🐷</p>
                                        </div>
                                    </div>
                                )}
                                <div
                                    ref={(el) => messageRefs.current[index] = el} // Assign ref ke setiap pesan
                                    className={`p-2 rounded-lg ${
                                        message.sender === "user"
                                            ? "bg-white text-black text-right w-fit ms-auto "
                                            : "bg-cyan-900 text-white text-left w-fit me-auto "
                                    } mb-2`}
                                >
                                    <TypeAnimation
                                        sequence={[message.text]}
                                        wrapper="div"
                                        speed={99}
                                        style={{
                                            whiteSpace: "pre-wrap",
                                        }}
                                        cursor={false}
                                    />
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <>
                                <div className="flex justify-start">
                                    <div className="w-12 h-12 text-white ">
                                        <p className="flex items-center justify-center h-full text-2xl">🚀</p>
                                    </div>
                                    <div className="flex items-center">
                                    <p className="text-white font-semibold text-xl">JoyBot</p>
                                    </div>
                                </div>
                                <div
                                    className={`p-2 rounded-lg bg-cyan-900 text-white text-left w-fit me-auto mb-2`}
                                >
                                    <TypeAnimation sequence={["Loading..."]} wrapper="span" speed={50} cursor={false}/>
                                </div>
                            </>
                        )}
                        {chatHistory.length === 0 && (
                            <div className="p-2 rounded-lg  text-center">
                                <TypeAnimation
                                    sequence={["Welcome to Joybot mada faka", 1000, "Send your question quickly", 1000, "i'm so busy!!", 1000]}
                                    wrapper="span" speed={50} cursor={false} repeat={Infinity}/>
                            </div>
                )}
            </div>
        </div>
            <div className="fixed bottom-0 left-0 w-full p-4 lg:pl-[20rem] lg:pr-12">
                <div className="flex items-center">
                        <input
                            name="message"
                            type="text"
                            value={data.message}
                            placeholder="Type your message..."
                            className="flex-1 p-2 bg-white rounded-s-lg text-black shadow-sm focus:outline-none"
                            onChange={(e) => setData({...data, message: e.target.value})}
                        />
                        <button
                            className="bg-cyan-600 text-white px-4 py-2 rounded-s-none"
                            onClick={handleSend}
                            disabled={data.message === ""}
                        >
                            <div className="flex gap-x-1 items-center">
                                <p>Send</p>
                                <BsSend size={20}/>
                            </div>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
