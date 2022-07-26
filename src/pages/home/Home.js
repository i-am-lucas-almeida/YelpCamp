import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SearchCard from "../../components/SearchCard";
import CampCard from "../../components/CampCard";

import { PageLoading } from "../../components/Loading";
import ListCards from "../../components/ListCards";

const Home = () => {

    const { documents: data, error, loading } = useFetchDocuments("camps");

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            <SearchCard />

            {error && <p>{error}</p>}

            <ListCards>

                {data.length > 0 && data.map((item) => (

                    <CampCard
                        key={item.id}
                        {...item}
                    />

                ))}

                {data.length === 0 &&
                    <h2>Nenhum acampamento cadastrado.</h2>
                }

            </ListCards>

            <Footer />

        </Container>

    );

};

export default Home;