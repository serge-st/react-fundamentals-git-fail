import axios from "axios";
import { useState } from "react"

type FetchingReturn = [() => Promise<void>, boolean, string];

export const useFetching = (callback: () => void): FetchingReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log(JSON.stringify(err, null, 2))
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}