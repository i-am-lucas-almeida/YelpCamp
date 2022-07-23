import styles from "../sass/components/CampCard.module.scss";

import { Link } from "react-router-dom";

const CampCard = ({ id, name, image, description }) => {

    return (

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

                        Ver Camp

                    </button>

                </div>

            </Link>

        </li>

    );

};

export default CampCard;