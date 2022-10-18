import { useEffect, useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { IPost } from "../types/types";

const TestHook = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [getPost, isLoading, postError] = useFetching( async () => {
        const response = await PostService.getById('1');
        console.log(response);
        console.log('hello');
        console.log(isLoading);
        console.log(!!postError);
    })

    useEffect( () => {
        getPost();
        console.log(postError);
    }, []);

    return (
        <div>
            test
        </div>
    );
};

export default TestHook;