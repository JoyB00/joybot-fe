import { useState, useRef, useEffect } from "react";
import { BiChat } from "react-icons/bi";

export default function Sidebar({ chatHistory, onMessageClick }) {
    // State untuk mengontrol visibilitas sidebar
    const [isOpen, setIsOpen] = useState(false);

    // Referensi untuk sidebar
    const sidebarRef = useRef(null);

    // Fungsi untuk membuka dan menutup sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Menutup sidebar jika klik di luar sidebar
    useEffect(() => {
        // Event listener untuk klik di luar sidebar
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false); // Menutup sidebar jika klik di luar
            }
        };

        // Menambahkan event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Membersihkan event listener saat komponen dibersihkan
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex justify-start">
                <button
                    onClick={toggleSidebar} // Menggunakan fungsi toggle
                    className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden focus:outline-none bg-transparent gap-x-2"
                >
                    <BiChat size={20} />
                    <p>History chat</p>
                </button>
            </div>

            <aside
                ref={sidebarRef} // Menghubungkan ref ke sidebar
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-950 xl:bg-cyan-950/40">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-white group"
                            >
                                <BiChat size={20} />
                                <span className="ms-3">History Chat</span>
                            </a>
                        </li>
                        <div className="space-y-2 overflow-y-auto max-h-80">
                            {chatHistory
                                .filter((message) => message.sender === "user")
                                .map((message, index) => (
                                    <div
                                        key={index}
                                        className="bg-cyan-800 text-white p-2 rounded-lg text-sm cursor-pointer hover:bg-cyan-950"
                                        onClick={() => onMessageClick(index)}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            {chatHistory.filter((msg) => msg.sender === "user").length === 0 && (
                                <p className="text-gray-400 italic">No messages yet.</p>
                            )}
                        </div>
                    </ul>
                </div>
            </aside>
        </>
    );
}
