import "../../sass/pages/Search.scss";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SearchCard from "../../components/SearchCard";
import CampCard from "../../components/CampCard";
import ListCards from "../../components/ListCards";

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

            <ListCards>

                {filterData(data).length > 0 && filterData(data).map((item) => (

                    <CampCard
                        key={item.id}
                        {...item}
                    />

                ))}

            </ListCards>

            <Footer />

        </Container>

    );

};

export default Search;