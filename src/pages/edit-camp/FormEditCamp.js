import styles from "../../sass/pages/EditCamp.module.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { userAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchCamp } from "../../hooks/useFetchCamp";

import { PageLoading } from "../../components/Loading";

import { BsExclamationCircleFill as Error } from "react-icons/bs";

import { PriceMask } from "../../utils/PriceMask";

const FormEditCamp = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = userAuthValue();

    const { document: data, loading } = useFetchCamp("camps", id);
    const { updateDocument } = useUpdateDocument("camps");

    const initState = {
        touched: {
            name: false,
            price: false,
            image: false,
            location: false,
            website: false,
            description: false
        }

    };

    const [formTouched, setFormTouched] = useState(initState);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (data) {

            setName(data.name || "");
            setPrice(data.price || "");
            setImage(data.image || "");
            setLocation(data.location || "");
            setWebsite(data.website || "");
            setDescription(data.description || "");

        }

    }, [data]);

    function onChange(e) {

        setPrice(e.target.value);

    }

    function onBlur(e) {

        const { name } = e.target;
        setFormTouched({ ...formTouched, touched: { ...formTouched.touched, [name]: true } });

    }

    function validate() {

        const errors = {
            name: "",
            price: "",
            image: "",
            location: "",
            website: "",
            description: ""
        };

        if (formTouched.touched.name && name.length < 10) {

            errors.name = "Nome inválido.";

        }

        if (formTouched.touched.price && price === "") {

            errors.price = "Preço inválido.";

        }

        if (formTouched.touched.price && parseFloat(price) < 1) {

            errors.price = "Preço inválido.";

        }

        if (formTouched.touched.price && price.charAt(0) === "0") {

            errors.price = "Preço inválido.";

        }

        if (formTouched.touched.location && location.length < 10) {

            errors.location = "Localização inválida.";

        }

        if (formTouched.touched.image && image.length === 0) {

            errors.image = "URL inválida.";

        }

        if (image) {

            try {
                new URL(image);
                errors.image = "";
            } catch {
                errors.image = "URL inválida.";
            }
        }

        if (formTouched.touched.website && website.length === 0) {

            errors.website = "URL inválida.";

        }

        if (website) {

            try {
                new URL(website);
                errors.website = "";
            } catch {
                errors.website = "URL inválida.";
            }
        }

        if (formTouched.touched.description && description.length < 200) {

            errors.description = "Descrição inválida.";

        }

        return errors;

    }

    const errors = validate();

    function onSubmit(e) {

        e.preventDefault();

        if ((!errors.name) &&
            (!errors.price) &&
            (!errors.image) &&
            (!errors.location) &&
            (!errors.website) &&
            (!errors.description)) {

            const data = {
                name,
                price,
                image,
                location,
                website,
                description,
                uid: user.uid,
                createdBy: user.displayName
            };

            updateDocument(id, data);

            navigate("/dashboard");

        }

    }

    return (

        <>

            {loading && <PageLoading />}

            <form onSubmit={onSubmit} className={styles.container__form}>

                <fieldset>

                    <label>Nome do Camp</label>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Parque da cachoeira"
                        maxLength={30}
                        minLength={10}
                        size={30}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={onBlur}
                        className={errors.name ? styles.error : ""}
                    />

                    {errors.name && <small><Error />{errors.name}</small>}

                </fieldset>

                <div className={styles.container__form_flex}>

                    <fieldset>

                        <label>Preço</label>

                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder="R$49 / por dia"
                            maxLength={8}
                            minLength={5}
                            size={8}
                            required
                            value={price ? ("R$" + price) : price}
                            onChange={(e) => onChange(PriceMask(e))}
                            onBlur={onBlur}
                            className={errors.price ? styles.error : ""}
                        />

                        {errors.price && <small><Error />{errors.price}</small>}

                    </fieldset>

                    <fieldset>

                        <label>Localização</label>

                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Barra Mansa - RJ"
                            maxLength={30}
                            minLength={10}
                            size={30}
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onBlur={onBlur}
                            className={errors.location ? styles.error : ""}
                        />

                        {errors.location && <small><Error />{errors.location}</small>}

                    </fieldset>

                </div>

                <fieldset>

                    <label>Imagem</label>

                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="www.imagens.com/parques/parque-da-cachoeira"
                        minLength={10}
                        size={10}
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        onBlur={onBlur}
                        className={errors.image ? styles.error : ""}
                    />

                    {(image && !errors.image) &&
                        <div className={styles.container__form_image}>
                            <p>Imagem escolhida: </p>
                            <img src={image} alt={`imagem ${name}`} />
                        </div>
                    }

                    {errors.image && <small><Error />{errors.image}</small>}

                </fieldset>

                <fieldset>

                    <label>Website</label>

                    <input
                        type="text"
                        name="website"
                        id="website"
                        placeholder="www.parques.com.br"
                        maxLength={30}
                        minLength={10}
                        size={30}
                        required
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        onBlur={onBlur}
                        className={errors.website ? styles.error : ""}
                    />

                    {errors.website && <small><Error />{errors.website}</small>}

                </fieldset>

                <fieldset>

                    <label>Descrição</label>

                    <textarea
                        name="description"
                        id="description"
                        placeholder="Escreva uma descrição"
                        maxLength={800}
                        minLength={400}
                        size={400}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={onBlur}
                        className={`${styles.textarea} ${errors.description ? styles.error : ""}`}
                    />

                    {errors.description && <small><Error />{errors.description}</small>}

                </fieldset>

                <button type="submit"
                    className={styles.container__form_button}>
                    Editar Camp
                </button>

            </form>

        </>

    );

};

export default FormEditCamp;