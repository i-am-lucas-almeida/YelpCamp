import styles from "../sass/components/ListCards.module.scss";

const ListCards = ({ children }) => {

    return (

        <ul className={styles.list}>
            {children}
        </ul>

    );

};

export default ListCards;