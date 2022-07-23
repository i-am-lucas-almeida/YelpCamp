/* eslint-disable no-useless-escape */
import styles from "../../sass/pages/RegisterCamp.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userAuthValue } from "../../context/AuthContext";

import { useInsertDocument } from "../../hooks/useInsertDocument";

import { BsExclamationCircleFill as Error } from "react-icons/bs";

const FormRegisterCamp = () => {

    const navigate = useNavigate();

    const { user } = userAuthValue();

    const { insertDocument, response } = useInsertDocument("camps");

    const initState = {
        name: "",
        price: "",
        image: "",
        description: "",
        touched: {
            name: false,
            price: false,
            image: false,
            description: false
        }
    };

    const [formData, setFormData] = useState(initState);

    const { name, price, image, description } = formData;

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
            description: ""
        };

        if (formData.touched.name && formData.name.length < 10) {

            errors.name = "Nome inválido.";

        }

        if (formData.touched.price && formData.price.length < 2) {

            errors.price = "Preço inválido.";

        }

        if (formData.touched.price && formData.price <= 0) {

            errors.price = "Preço inválido.";

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
            (!errors.description)) {

            insertDocument({
                name,
                price,
                image,
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

            <fieldset>

                <label>Preço</label>

                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="R$149 / por dia"
                    required
                    value={price}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors.price ? styles.error : ""}
                />

                {errors.price && <small><Error />{errors.price}</small>}

            </fieldset>

            <fieldset>

                <label>Imagem</label>

                <input
                    type="text"
                    name="image"
                    id="image"
                    placeholder="www.unsplash.com/imagem/parque-da-cachoeira"
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

                <label>Descrição</label>

                <textarea
                    name="description"
                    id="description"
                    placeholder="Escreva uma descrição"
                    maxLength={500}
                    minLength={200}
                    size={200}
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