import {IoDocumentTextOutline} from "react-icons/io5";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ApiFileUpload from "../api/ApiFileUpload.js";


export default  function Uploader (){

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
                        render: ({data}) => `Upload failed: ${data?.message || 'Unknown error'}`
                    }
                }
            );
            navigate("/chat/" + file.name);
            return result;
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setFile(null);
        }
    }

    return (
        <div
            className="cursor-pointer min-h-52 lg:w-[30rem] border-dashed border-2 rounded-2xl overflow-x-auto flex items-center justify-center mt-2 bg-sky-900/15"
            onClick={!file ? () => document.getElementById('fileInput').click() : undefined}>
            <div className="text-center p-4">
                <input
                    type="file"
                    id="fileInput"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx"
                />
                {file ? (
                        <>
                            <div className="flex justify-center">
                                <IoDocumentTextOutline size={100}/>
                            </div>
                            <p className="py-4">{file.name}</p>
                            <div className="flex justify-center gap-x-2">
                                <button className="mt-2 bg-transparent border-2 border-cyan-600 font-bold"
                                        onClick={() => document.getElementById('fileInput').click()}>Change
                                </button>
                                <button className="mt-2 bg-cyan-600 font-bold" onClick={handleSubmit}>Submit</button>
                            </div>
                        </>
                    ) :
                    <>
                        <p className="text-xl md:text-3xl font-semibold">Choose a file here</p>
                        <p className="text-xs md:text-sm">Any file you have, but can't work with image format</p>
                        <button className="mt-5 bg-cyan-600 font-bold">
                            Browse File
                        </button>

                    </>
                }
            </div>

        </div>
    )
}