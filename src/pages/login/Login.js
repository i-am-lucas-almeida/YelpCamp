import styles from "../../sass/pages/FormSection.module.scss";

import { Link } from "react-router-dom";

import TestimonialSection from "../../components/TestimonialSection";
import NavbarForm from "../../components/NavbarForm";
import FormLogin from "./FormLogin";

const Login = () => {

    return (

        <div className={styles.container}>

            <div className={styles.container__content}>

                <NavbarForm link="/login" />

                <h1 className={styles.container__title}>
                    Comece a explorar acampamentos de todo o mundo.
                </h1>

                <FormLogin />

                <p className={styles.container__answer}>
                    Não tem uma conta? <Link to="/signup">Crie uma conta</Link>
                </p>

            </div>

            <TestimonialSection />

        </div>

    );

};

export default Login;