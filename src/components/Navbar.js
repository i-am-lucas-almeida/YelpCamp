import styles from "../sass/components/Navbar.module.scss";

import { useAuthentication } from "../hooks/useAuthentication";
import { userAuthValue } from "../context/AuthContext";

import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

const Navbar = () => {

    const { user } = userAuthValue();

    return (

        <nav className={styles.navbar}>

            <Logo link="/home" />

            <div className={styles.navbar__auth}>

                {!user && (

                    <div>

                        <Link to="/login" className={styles.navbar__auth_login}>

                            Login

                        </Link>

                        <LinkButton
                            text="Criar conta"
                            link="/signup"
                        />

                    </div>

                )}

                {user && (

                    <>

                        <p>usuário</p>

                        <p>logout</p>

                    </>

                )}

            </div>

        </nav>

    );

};

export default Navbar;