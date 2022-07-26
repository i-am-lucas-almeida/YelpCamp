import styles from "../../sass/pages/CampDetails.module.scss";

const DetailsSection = ({ name, image, price, website, location, description }) => {

    return (

        <div className={styles.details__content}>

            <img
                src={image && image}
                alt={`imagem ${name && name}`}
            />

            <div className={styles.details__content_flex}>

                <aside>

                    <h2>
                        {name && name}
                    </h2>

                    <p>
                        {location && location}
                    </p>

                </aside>

                <p>
                    {`R$${price && price}/por dia`}
                </p>

            </div>

            <p className={styles.details__content_desc}>
                {description && description}
            </p>

            <a href={website && website}
                target="_blank" rel="noreferrer"
                className={styles.details__content_button}>
                Faça sua reserva
            </a>

        </div>

    );

};

export default DetailsSection;