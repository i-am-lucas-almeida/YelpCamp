import styles from "../sass/components/Navbar.module.scss";

import { Link } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { userAuthValue } from "../context/AuthContext";

import Logo from "../components/Logo";
import { TbLogout } from "react-icons/tb";

import LinkButton from "./LinkButton";

const Navbar = () => {

    const { user } = userAuthValue();

    const { logoutUser } = useAuthentication();

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

                    <div>

                        <p>usuário</p>

                        <button onClick={logoutUser}
                            className={styles.navbar__auth_logout}>
                            <span>sair</span>
                            <TbLogout />
                        </button>

                    </div>

                )}

            </div>

        </nav>

    );

};

export default Navbar;