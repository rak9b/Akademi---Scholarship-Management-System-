import { useState } from "react";

const useCreateUser = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const createUser = (user) => {
        if (!user?.email) return;

        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };

        fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => setError(err.message || 'An error occurred'))
    };

    return { createUser, data, error };
};

export default useCreateUser;
