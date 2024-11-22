import useAxios from "./constant/index.js";

const sendMessage = async (data) => {
    try {
        return await useAxios.post("/chat", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        throw error.response || error;
    }
}

const ApiChat = {
    sendMessage
}

export default ApiChat;