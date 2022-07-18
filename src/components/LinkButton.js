import styles from "../sass/components/LinkButton.module.scss";

import { Link } from "react-router-dom";

const LinkButton = ({ text, link }) => {

    return (

        <Link to={link}>

            <button className={styles.button}>
                {text}
            </button>

        </Link>

    );

};

export default LinkButton;