import styles from "../sass/components/SearchCard.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import iconSearch from "../assets/Search-Icon.svg";

const SearchCard = () => {

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const inputRef = useRef();

    function onChange(e) {

        setQuery(e.target.value);

    }

    function onSubmit(e) {

        e.preventDefault();

        if (query) {

            return navigate(`/search?q=${query}`);

        } else {
            inputRef.current.focus();
        }

    }

    return (

        <div className={styles.search}>

            <div className={styles.search__content}>

                <h2>
                    Bem vindo ao YelpCamp!
                </h2>

                <p>
                    Veja nossa seleção de acampamentos de todo o mundo ou adicione o seu próprio.
                </p>

                <form onSubmit={onSubmit} className={styles.search__form}>

                    <fieldset>

                        <img
                            src={iconSearch}
                            alt="ícone de pesquisa"
                        />

                        <input
                            ref={inputRef}
                            type="text"
                            name="query"
                            id="query"
                            value={query}
                            onChange={onChange}
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

export default SearchCard;