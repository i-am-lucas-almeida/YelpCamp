import { useEffect } from "react";

const usePageTitle = (title) => {

    useEffect(() => {

        const prevTitle = document.title;
        document.title = title;

        return () => {

            document.title = prevTitle;

        };

    });

};

export default usePageTitle;