import styles from "../../sass/pages/Home.module.scss";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SearchCard from "../../components/SearchCard";
import CampCard from "../../components/CampCard";

import { PageLoading } from "../../components/Loading";

const Home = () => {

    const { documents: data, error, loading } = useFetchDocuments("camps");

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            <SearchCard />

            {error && <p>{error}</p>}

            <ul className={styles.list}>

                {data.length > 0 && data.map((item) => (

                    <CampCard
                        key={item.id}
                        {...item}
                    />

                ))}

                {data.length < 0 &&
                    <h2>Nenhum acampamento cadastrado.</h2>
                }

            </ul>

            <Footer />

        </Container>

    );

};

export default Home;