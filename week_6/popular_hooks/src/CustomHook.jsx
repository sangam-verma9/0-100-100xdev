import { useState, useEffect } from "react";

// Custom Hook
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}

// Using the Custom Hook
function CustomHook() {
    const width = useWindowWidth();

    return <h2>Window Width: {width}px</h2>;
}

export default CustomHook;