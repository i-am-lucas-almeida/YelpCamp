import styles from "../sass/components/CampCard.module.scss";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDeleteDocuments } from "../hooks/useDeleteDocuments";

import Modal from "./Modal";

const CampCard = ({ id, name, image, description }) => {

    const [modal, setModal] = useState(false);

    const { pathname } = useLocation();

    const { deleteDocument } = useDeleteDocuments("camps");

    return (

        <>

            {modal &&
                <Modal
                    id={id}
                    message="Deseja excluir o Camp?"
                    closeEvent={setModal}
                    confirmEvent={deleteDocument}
                />
            }

            {pathname === "/dashboard" ? (

                <li className={styles.card}>

                    <div className={styles.card__image}>
                        <img
                            src={image && image}
                            alt={`imagem ${name}`}
                            className={styles.image__dashboard}
                        />
                    </div>

                    <div className={styles.card__info}>

                        <h3>
                            {name && name}
                        </h3>

                        <p>
                            {description && description.substring(0, 80) + "..."}
                        </p>

                    </div>

                    <div className={styles.card__buttons}>

                        <Link to={`/camp/${id}`}>
                            <button>
                                Detalhes
                            </button>
                        </Link>

                        <Link to={`/edit-camp/${id}`}>
                            <button>
                                Editar
                            </button>
                        </Link>

                        <button onClick={() => setModal(true)}>
                            Excluir
                        </button>

                    </div>

                </li>)

                :

                (

                    <li className={styles.card}>

                        <Link to={`/camp/${id}`}>

                            <div className={styles.card__image}>
                                <img
                                    src={image && image}
                                    alt={`imagem ${name}`}
                                />
                            </div>

                            <div className={styles.card__info}>

                                <h3>
                                    {name && name}
                                </h3>

                                <p>
                                    {description && description.substring(0, 80) + "..."}
                                </p>

                                <button className={styles.card__button}>

                                    Ver detalhes

                                </button>

                            </div>

                        </Link>

                    </li>

                )

            }

        </>

    );

};

export default CampCard;