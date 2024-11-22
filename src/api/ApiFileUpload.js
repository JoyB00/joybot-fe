import useAxios from "./constant/index.js";

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await useAxios.post("/file", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}



const ApiFileUpload = {
    uploadFile,
}

export default ApiFileUpload;