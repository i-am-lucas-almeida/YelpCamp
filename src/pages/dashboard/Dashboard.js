import "../../sass/pages/Dashboard.scss";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import { PageLoading } from "../../components/Loading";
import Navbar from "../../components/Navbar";
import SearchCard from "../../components/SearchCard";
import CampCard from "../../components/CampCard";
import ListCards from "../../components/ListCards";

import { userAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import LinkButton from "../../components/LinkButton";

const Dashboard = () => {

    const { user } = userAuthValue();
    const uid = user.uid;
    const { documents: data, loading } = useFetchDocuments("camps", uid);

    console.log(uid);

    return (

        <Container>

            {loading && <PageLoading />}

            <Navbar />

            {data.length === 0 ? (

                <>

                    <SearchCard />

                    <h1>Você não cadastrou nenhum Camp.</h1>
                    <LinkButton
                        text="Adicione os seus camps"
                        link="/new-camp"
                    />
                </>

            ) : (

                <>

                    <h1>Gerencie os seus camps cadastrados</h1>

                    <ListCards>

                        {data.length > 0 &&
                            data.map((item) => (
                                <CampCard
                                    key={item.id}
                                    {...item}
                                />
                            ))
                        }

                    </ListCards>

                </>

            )}

            <Footer />

        </Container>

    );

};

export default Dashboard;