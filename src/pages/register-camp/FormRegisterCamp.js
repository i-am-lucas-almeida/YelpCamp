import styles from "../../sass/pages/RegisterCamp.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userAuthValue } from "../../context/AuthContext";

import { useInsertDocument } from "../../hooks/useInsertDocument";

import { BsExclamationCircleFill as Error } from "react-icons/bs";

import { PriceMask } from "../../utils/PriceMask";

const FormRegisterCamp = () => {

    const navigate = useNavigate();

    const { user } = userAuthValue();

    const { insertDocument, response } = useInsertDocument("camps");

    const initState = {
        name: "",
        price: "",
        image: "",
        location: "",
        website: "",
        description: "",
        touched: {
            name: false,
            price: false,
            image: false,
            location: false,
            website: false,
            description: false
        }
    };

    const [formData, setFormData] = useState(initState);

    const { name, price, image, location, website, description } = formData;

    function onChange(e) {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }

    function onBlur(e) {

        const { name } = e.target;
        setFormData({ ...formData, touched: { ...formData.touched, [name]: true } });

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

        if (formData.touched.name && formData.name.length < 10) {

            errors.name = "Nome inválido.";

        }

        if (formData.touched.price && formData.price === "") {

            errors.price = "Preço inválido.";

        }

        if (formData.touched.price && parseFloat(formData.price) < 1) {

            errors.price = "Preço inválido.";

        }

        if (formData.touched.price && formData.price.charAt(0) === "0") {

            errors.price = "Preço inválido.";

        }

        if (formData.touched.location && formData.location.length < 10) {

            errors.location = "Localização inválida.";

        }

        if (formData.touched.image && formData.image.length === 0) {

            errors.image = "URL inválida.";

        }

        if (formData.image) {

            try {
                new URL(formData.image);
                errors.image = "";
            } catch {
                errors.image = "URL inválida.";
            }
        }

        if (formData.touched.website && formData.website.length === 0) {

            errors.website = "URL inválida.";

        }

        if (formData.website) {

            try {
                new URL(formData.website);
                errors.website = "";
            } catch {
                errors.website = "URL inválida.";
            }
        }

        if (formData.touched.description && formData.description.length < 200) {

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

            insertDocument({
                name,
                price,
                image,
                location,
                website,
                description,
                uid: user.uid,
                createdBy: user.displayName
            });

            navigate("/home");

        }

    }

    return (

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
                    onChange={onChange}
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
                        required
                        maxLength={8}
                        minLength={5}
                        size={8}
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
                        onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${styles.textarea} ${errors.description ? styles.error : ""}`}
                />

                {errors.description && <small><Error />{errors.description}</small>}

            </fieldset>

            {!response.loading &&
                <button type="submit"
                    className={styles.container__form_button}>
                    Adicionar Camp
                </button>
            }

            {response.loading &&
                <button type="submit"
                    className={styles.container__form_button}>
                    Aguarde...
                </button>
            }

        </form>

    );

};

export default FormRegisterCamp;