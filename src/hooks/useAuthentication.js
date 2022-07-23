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

            let systemErrorMessage;

            if (error.message.includes("email-already")) {

                systemErrorMessage = "Email já cadastrado.";

            } else {

                systemErrorMessage = "Ocorreu algum erro, tente novamente.";

            }

            setError(systemErrorMessage);

            setLoading(false);

        }

    };

    const logoutUser = () => {

        checkIfIsCancelled();

        signOut(auth);

        return { logoutUser };

    };

    const loginUser = async (data) => {

        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);

        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {

                systemErrorMessage = "Usuário não existe.";

            } else if (error.message.includes("wrong-password")) {

                systemErrorMessage = "Senha incorreta.";

            } else {

                systemErrorMessage = "Ocorreu algum erro, tente novamente.";

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
        loginUser,
        logoutUser,
        error,
        loading
    };

};