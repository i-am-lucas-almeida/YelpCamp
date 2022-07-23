import { useParams } from "react-router-dom";

import { useFetchCamp } from "../../hooks/useFetchCamp";

import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PageLoading } from "../../components/Loading";

const CampDetails = () => {

    const { id } = useParams();

    const { document: data, error, loading } = useFetchCamp("camps", id);

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            {error && <p>{error}</p>}

            <h1>{data && data.name}</h1>

            <Footer />

        </Container>

    );

};

export default CampDetails;