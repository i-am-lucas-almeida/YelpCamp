import styles from "../../sass/pages/Search.module.scss";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SearchCard from "../../components/SearchCard";
import CampCard from "../../components/CampCard";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { PageLoading } from "../../components/Loading";

const Search = () => {

    const query = useQuery();
    const search = query.get("q");

    const { documents: data, error, loading } = useFetchDocuments("camps");

    const searchValue = search.toLowerCase();

    function filterData(items) {

        return items.filter(

            (item) =>
                item.name.toLowerCase().includes(searchValue)

        );

    }

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            <SearchCard />

            {error && <p>{error}</p>}

            {data.length === 0 ?
                (<h2>Não foram encontrados resultados para {`"${search}"`}</h2>)
                :
                (<h2>Encontramos {filterData(data).length} resultado{`${filterData(data).length === 1 ? "" : "s"}`} para {`"${search}"`}</h2>)
            }

            <ul className={styles.list}>

                {filterData(data).length > 0 && filterData(data).map((item) => (

                    <CampCard
                        key={item.id}
                        {...item}
                    />

                ))}

            </ul>

            <Footer />

        </Container>

    );

};

export default Search;