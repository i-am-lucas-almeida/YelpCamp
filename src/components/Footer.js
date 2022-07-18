import styles from "../sass/components/Footer.module.scss";

import Logo from "./Logo";

const Footer = () => {

    return (

        <footer className={styles.footer}>

            <Logo link="/home" />

        </footer>

    );

};

export default Footer;
