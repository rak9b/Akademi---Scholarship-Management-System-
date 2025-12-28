import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const MockAuthProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState(null);

    // Mock users database
    const mockUsers = {
        'admin@mail.com': {
            uid: 'admin-uid-123',
            email: 'admin@mail.com',
            displayName: 'System Admin',
            role: 'admin',
            password: 'Admin123'
        },
        'moderator@mail.com': {
            uid: 'moderator-uid-456',
            email: 'moderator@mail.com',
            displayName: 'Support Moderator',
            role: 'moderator',
            password: 'Moderator123'
        },
        'user@mail.com': {
            uid: 'user-uid-789',
            email: 'user@mail.com',
            displayName: 'Elite Student',
            role: 'user',
            password: 'User123'
        }
    };

    // Check for existing session on load
    useEffect(() => {
        const savedUser = localStorage.getItem('akademi_user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('akademi_user');
            }
        }
        setLoader(false);
    }, []);

    const register = async (email, password) => {
        setLoader(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mockUsers[email]) {
                    setLoader(false);
                    reject(new Error('User already exists'));
                } else {
                    const newUser = {
                        uid: `user-uid-${Date.now()}`,
                        email: email,
                        displayName: email.split('@')[0],
                        role: 'user'
                    };
                    mockUsers[email] = { ...newUser, password };
                    setUser(newUser);
                    localStorage.setItem('akademi_user', JSON.stringify(newUser));
                    setLoader(false);
                    resolve({ user: newUser });
                }
            }, 1000);
        });
    };

    const login = async (email, password) => {
        setLoader(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockUser = mockUsers[email];
                if (mockUser && mockUser.password === password) {
                    const userData = {
                        uid: mockUser.uid,
                        email: mockUser.email,
                        displayName: mockUser.displayName,
                        role: mockUser.role
                    };
                    setUser(userData);
                    localStorage.setItem('akademi_user', JSON.stringify(userData));
                    setLoader(false);
                    resolve({ user: userData });
                } else {
                    setLoader(false);
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    };

    const signInWithGoogle = async () => {
        setLoader(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock Google sign-in - create a demo user
                const googleUser = {
                    uid: `google-uid-${Date.now()}`,
                    email: 'demo.google@gmail.com',
                    displayName: 'Google Demo User',
                    role: 'user'
                };
                setUser(googleUser);
                localStorage.setItem('akademi_user', JSON.stringify(googleUser));
                setLoader(false);
                resolve({ user: googleUser });
            }, 1500);
        });
    };

    const signOutUser = async () => {
        setLoader(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                setUser(null);
                localStorage.removeItem('akademi_user');
                setLoader(false);
                resolve();
            }, 500);
        });
    };

    const authInfo = {
        user,
        loader,
        setUser,
        setLoader,
        register,
        login,
        signInWithGoogle,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default MockAuthProvider;