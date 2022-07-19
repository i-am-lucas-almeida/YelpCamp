import styles from "../sass/components/NavbarForm.module.scss";

import { Link } from "react-router-dom";

import Logo from "./Logo";

const NavbarForm = ({ link }) => {

    return (

        <div>

            <nav className={styles.navbar}>

                <Logo link={link} />

                <Link to="/home">
                    <p>
                        &larr; <span>Voltar para a home</span>
                    </p>
                </Link>

            </nav>

        </div>

    );

};

export default NavbarForm;