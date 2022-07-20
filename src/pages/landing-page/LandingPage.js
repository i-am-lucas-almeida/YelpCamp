import styles from "../../sass/pages/LandingPage.module.scss";

import LinkButton from "../../components/LinkButton";

import iconCheck from "../../assets/Checkmark.svg";
import logoAirbnb from "../../assets/Partners/Airbnb.svg";
import logoBooking from "../../assets/Partners/Booking.svg";
import logoPlum from "../../assets/Partners/Plum.svg";
import Logo from "../../components/Logo";

const LandingPage = () => {

    return (

        <div className={styles.container}>

            <nav className={styles.navbar}>

                <Logo link="/" />

            </nav>

            <div className={styles.container__presentation}>

                <div className={styles.container__presentation_content}>

                    <div className={styles.container__presentation_logo}>

                        <Logo link="/" />

                    </div>

                    <h1>
                        Explore os melhores camps do planeta.
                    </h1>

                    <p>
                        YelpCamp é uma lista com curadoria dos melhores pontos de acampamento do planeta. Viva as melhores experiências ao ar livre.
                    </p>

                    <ul className={styles.container__presentation_services}>

                        <li>
                            <img
                                src={iconCheck}
                                alt="ícone de check"
                            />
                            <p>
                                Adicione suas sugestões de acampamentos.
                            </p>
                        </li>

                        <li>
                            <img
                                src={iconCheck}
                                alt="ícone de check"
                            />
                            <p>
                                Compartilhe reviews e experiências.
                            </p>
                        </li>

                        <li>
                            <img
                                src={iconCheck}
                                alt="ícone de check"
                            />
                            <p>
                                Localize o camping mais próximo de você.
                            </p>
                        </li>
                    </ul>

                    <LinkButton
                        text="Explorar Acampamentos"
                        link="/home"
                    />

                    <ul className={styles.partners}>

                        <p>Empresas Parceiras: </p>

                        <div>
                            <li>
                                <img
                                    src={logoAirbnb}
                                    alt="ícone Airbnb"
                                />
                            </li>

                            <li>
                                <img
                                    src={logoBooking}
                                    alt="ícone Booking"
                                />
                            </li>

                            <li>
                                <img
                                    src={logoPlum}
                                    alt="ícone Plum Guide"
                                />
                            </li>
                        </div>

                    </ul>

                </div>

            </div>

            <div className={styles.container__image}></div>

        </div>

    );

};

export default LandingPage;