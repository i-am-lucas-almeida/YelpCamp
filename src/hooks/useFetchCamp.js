import { useState, useEffect } from "react";

import { db } from "../firebase/config";

import {
    doc,
    getDoc
} from "firebase/firestore";

export const useFetchCamp = (docCollection, id) => {

    const [document, setDocument] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {

            if (cancelled) return;

            setLoading(true);

            try {

                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);
                setDocument(docSnap.data());

                setLoading(false);

            } catch (error) {

                setError(true);
                setLoading(false);

            }

        }

        loadDocument();

    }, [docCollection, id, cancelled]);

    useEffect(() => {

        return () => setCancelled(true);

    }, []);

    return { document, loading, error };

};