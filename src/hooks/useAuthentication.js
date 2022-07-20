import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {

        if (cancelled) {
            return;
        }

    }

    const createUser = async (data) => {

        checkIfIsCancelled();

        setLoading(true);

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.username
            });

            setLoading(false);

            return user;

        } catch (error) {

            console.log(error.message);

            let systemErrorMessage;

            if (error.message.includes("email-already")) {

                systemErrorMessage = "Email já cadastrado!";

            } else {

                systemErrorMessage = "Ocorreu um erro, por favor, tente novamente.";

            }

            setError(systemErrorMessage);

            setLoading(false);

        }

    };

    useEffect(() => {

        return () => setCancelled(true);

    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    };

};