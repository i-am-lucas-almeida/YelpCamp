import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const useInsertDocument = (docCollection) => {

    const initialState = {
        loading: false,
        error: false,
    };

    const insertReducer = (state, action) => {

        switch (action.type) {

            case "LOADING":
                return { loading: true, error: false };

            case "INSERTED_DOC":
                return { loading: false, error: false };

            case "ERROR":
                return { loading: false, error: action.payload };

            default:
                return state;
        }

    };

    const [response, dispatch] = useReducer(insertReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action);
        }

    };

    const insertDocument = async (document) => {

        checkCancelBeforeDispatch({ type: "LOADING" });

        try {

            const newDocument = { ...document, createdAt: Timestamp.now() };

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
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

    return { insertDocument, response };
};