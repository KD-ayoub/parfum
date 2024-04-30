import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value.search);

    useEffect(() => {
        const time = setTimeout(() => {
            setDebouncedValue(value.search);
        }, delay);

        return () => clearTimeout(time);
    }, [value, delay]);
    return debouncedValue;
}