import styles from "../../sass/pages/CampDetails.module.scss";

import { useParams } from "react-router-dom";

import { useFetchCamp } from "../../hooks/useFetchCamp";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PageLoading } from "../../components/Loading";
import DetailsSection from "./DetailsSection";

const CampDetails = () => {

    const { id } = useParams();

    const { document: data, error, loading } = useFetchCamp("camps", id);

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            {error && <p>{error}</p>}

            <div className={styles.details__container}>

                {data &&
                    <DetailsSection
                        {...data}
                    />
                }

            </div>

            <Footer />

        </Container>

    );

};

export default CampDetails;