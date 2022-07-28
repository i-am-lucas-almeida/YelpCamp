import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const useUpdateDocument = (docCollection) => {

    const initialState = {
        loading: false,
        error: false,
    };

    const updateReducer = (state, action) => {

        switch (action.type) {

            case "LOADING":
                return { loading: true, error: false };

            case "UPDATED_DOC":
                return { loading: false, error: false };

            case "ERROR":
                return { loading: false, error: action.payload };

            default:
                return state;
        }

    };

    const [response, dispatch] = useReducer(updateReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action);
        }

    };

    const updateDocument = async (uid, data) => {

        checkCancelBeforeDispatch({ type: "LOADING" });

        try {

            const docRef = await doc(db, docCollection, uid);

            const updateCamp = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updateCamp,
            });

        } catch (error) {

            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            });

        }

    };

    useEffect(() => {

        return () => setCancelled(true);

    }, []);

    return { updateDocument, response };
};