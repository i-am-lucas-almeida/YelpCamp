import styles from "../../sass/pages/FormSection.module.scss";

import { Link } from "react-router-dom";

import usePageTitle from "../../utils/usePageTitle";

import TestimonialSection from "../../components/TestimonialSection";
import NavbarForm from "../../components/NavbarForm";
import FormRegister from "./FormRegister";

const Register = () => {

    usePageTitle("YelpCamp | Criar conta");

    return (

        <div className={styles.container}>

            <div className={styles.container__content}>

                <NavbarForm link="/signup" />

                <h1 className={styles.container__title}>
                    Comece a explorar acampamentos de todo o mundo.
                </h1>

                <FormRegister />

                <p className={styles.container__answer}>
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </p>

            </div>

            <TestimonialSection />

        </div>

    );

};

export default Register;