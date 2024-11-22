import { useEffect, useState } from "react";
import { marked } from "marked";

const TypingMarkdown = ({ text, speed = 50 }) => {
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setTypedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: marked(typedText), // Markdown di-render secara bertahap
            }}
        />
    );
};

export default TypingMarkdown;
