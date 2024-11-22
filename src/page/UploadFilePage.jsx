import { useState } from 'react'
import {IoDocumentTextOutline} from "react-icons/io5";
import ApiFileUpload from "../api/ApiFileUpload.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function UploadFilePage() {
    const [file, setFile]= useState(null)
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            console.log(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await toast.promise(
                ApiFileUpload.uploadFile(file),
                {
                    pending: 'Uploading file...',
                    success: 'File uploaded successfully',
                    error: {
                        render: ({ data }) => `Upload failed: ${data?.message || 'Unknown error'}`
                    }
                }
            );
            navigate("/chat/"+file.name);
            return result;
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setFile(null);
        }
    };

    return (
        <main className="w-full h-full mx-auto">
            <div className="pb-5">
                <p className="text-2xl text-lg-6xl font-black">🚀 Welcome To JOYBOT 🚀</p>
                <p className="text-sm ">I hope with our machine can help you to learn something</p>
            </div>
            <div
                className="cursor-pointer min-h-52 border-dashed border-2 rounded-2xl  overflow-x-auto flex items-center justify-center"  onClick={!file?()=>document.getElementById('fileInput').click():undefined}>
                <div className="text-center p-4">
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                        accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx"
                    />
                    {file?(
                        <>
                            <div className="flex justify-center">
                                <IoDocumentTextOutline size={100}/>
                            </div>
                            <p className="py-4">{file.name}</p>
                            <div className="flex justify-center gap-x-2">
                                <button className="mt-2 bg-transparent border-2 border-purple-600 font-bold" onClick={()=>document.getElementById('fileInput').click()}>Change</button>
                                <button className="mt-2 bg-purple-600 font-bold" onClick={handleSubmit}>Submit</button>
                            </div>
                        </>
                    ):
                    <>
                        <p className="text-xl font-semibold">Choose a file here</p>
                        <p className="text-xs">Any file you have, but can't work with image format</p>
                        <button className="mt-5 bg-purple-600 font-bold">
                            Browse File
                        </button>

                    </>
                    }
                </div>

            </div>
        </main>
    )
}

export default UploadFilePage
