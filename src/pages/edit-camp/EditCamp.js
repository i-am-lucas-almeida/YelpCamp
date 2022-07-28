import styles from "../../sass/pages/EditCamp.module.scss";

import usePageTitle from "../../utils/usePageTitle";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FormEditCamp from "./FormEditCamp";

const EditCamp = () => {

    usePageTitle("YelpCamp | Editar Camp");

    return (

        <Container>

            <Navbar />

            <div className={styles.container__form}>

                <h1 className={styles.container__form_title}>
                    Edite seu Acampamento
                </h1>

                <FormEditCamp />

            </div>

            <Footer />

        </Container>

    );

};

export default EditCamp;