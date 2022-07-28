import styles from "../../sass/pages/RegisterCamp.module.scss";

import usePageTitle from "../../utils/usePageTitle";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FormRegisterCamp from "./FormRegisterCamp";

const RegisterCamp = () => {

    usePageTitle("YelpCamp | Criar um novo camp");

    return (

        <Container>

            <Navbar />

            <div className={styles.container__form}>

                <h1 className={styles.container__form_title}>
                    Adicione um novo Acampamento
                </h1>

                <FormRegisterCamp />

            </div>

            <Footer />

        </Container>

    );

};

export default RegisterCamp;