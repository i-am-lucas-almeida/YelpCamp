import styles from "../../sass/pages/Home.module.scss";

import { Link } from "react-router-dom";

import iconSearch from "../../assets/Search-Icon.svg";

const Search = () => {

    return (

        <div className={styles.search}>

            <div className={styles.search__content}>

                <h2>
                    Bem vindo ao YelpCamp!
                </h2>

                <p>
                    Veja nossa seleção de acampamentos de todo o mundo ou adicione o seu próprio.
                </p>

                <form className={styles.search__form}>

                    <fieldset>

                        <img
                            src={iconSearch}
                            alt="ícone de pesquisa"
                        />

                        <input
                            type="text"
                            placeholder="Pesquise por camps"
                        />

                    </fieldset>

                    <button
                        type="submit">
                        Buscar
                    </button>

                </form>

                <p>
                    <Link to="/new-camp">
                        Adicione o seu acampamento.
                    </Link>
                </p>

            </div>

        </div>

    );

};

export default Search;