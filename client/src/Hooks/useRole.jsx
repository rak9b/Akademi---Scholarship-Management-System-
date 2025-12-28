import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/MockAuthProvider";

const useRole = () => {
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const { user, loader } = useContext(AuthContext);
    const [userId, setUserId] = useState(null)
    
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            
            // If user object already has role (from mock auth), use it directly
            if (user.role) {
                setRole(user.role);
                setUserId(user.uid);
                setLoading(false);
                return;
            }
            
            // Otherwise, fetch from API
            fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setRole(data.role || 'user')
                        setUserId(data._id)
                    } else {
                        setRole('user');
                        setUserId(user.uid);
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.warn('API fetch failed, using default role:', err);
                    setRole('user');
                    setUserId(user.uid);
                    setLoading(false);
                });
        } else if (!loader) {
            setLoading(false);
        }
    }, [user?.email, user?.role, user?.uid, loader]);

    return { user, userId, loader, role, loading, error };
};

export default useRole;
