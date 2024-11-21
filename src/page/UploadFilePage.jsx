import { useState } from 'react'
import reactLogo from '../assets/react.svg'

function UploadFilePage() {
    const [count, setCount] = useState(0)
    const [file, setFile]= useState(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1024 * 1024) {
            console.log(file);
            toast.error("Maksimal ukuran file 1MB");
            return;
        }
        if (file) {
            setData({ ...data, avatar: file });
        } else {
            setData({ ...data, avatar: imageDefault });
        }
    };

    return (
        <main className="w-full h-full mx-auto">
            <div>
                <p className="text-2xl text-lg-6xl font-black py-5">🚀 Welcome To JOYBOT 🚀</p>
            </div>
            <div
                className="cursor-pointer h-52 border-dashed border-2 rounded-2xl border-purple-700 overflow-x-auto flex items-center justify-center"  onClick={()=>document.getElementById('fileInput').click()}>
                <div className="text-center px-4">
                    <p className="font-semibold">Choose a file or drag & drop it here</p>
                    <p className="text-xs">Any file you have, but can't work with image format</p>
                    <button className="mt-5 bg-purple-600 font-bold">
                        Browse File
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </main>
    )
}

export default UploadFilePage
