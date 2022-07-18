import styles from "../sass/components/Navbar.module.scss";

import Logo from "../components/Logo";

const Navbar = ({ children }) => {

    return (

        <nav className={styles.navbar}>

            <Logo link="/home" />

            <div>
                {children}
            </div>

        </nav>

    );

};

export default Navbar;