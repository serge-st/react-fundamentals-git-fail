import { useEffect, useRef } from "react";

export const useObserver = (
        ref: React.MutableRefObject<HTMLDivElement>, 
        canLoad: boolean, 
        isLoading: boolean,
        callback: () => void,
) => {
    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;
        // @ts-ignore
        if (observer.current) observer.current.disconnect();
        // @ts-ignore
        const cb = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        }
        // @ts-ignore
        observer.current = new IntersectionObserver(cb);
        // @ts-ignore
        observer.current.observe(ref.current);
    }, [isLoading]);
}