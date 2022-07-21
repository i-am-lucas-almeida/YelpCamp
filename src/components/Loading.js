import styles from "../sass/components/Loading.module.scss";

export const PageLoading = () => {

    return (

        <div className={styles.page_loading}>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>

    );

};

export const FormLoading = () => {

    return (

        <div className={styles.spinner}>
            <span></span>
            <span></span>
            <span></span>
        </div>

    );

};