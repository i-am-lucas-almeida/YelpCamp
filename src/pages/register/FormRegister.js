import styles from "../../sass/pages/FormSection.module.scss";

import { useState } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

const FormRegister = () => {

    const { createUser, error: authError, loading } = useAuthentication();

    const initialValues = {
        email: "",
        username: "",
        password: "",
        touched: {
            email: false,
            username: false,
            password: false
        }
    };

    const [formData, setFormData] = useState(initialValues);

    const { email, username, password } = formData;

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
            email: "",
            username: "",
            password: ""
        };

        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;

        const validUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,13}[a-zA-Z0-9]$/;

        if (formData.touched.email && !formData.email.match(validEmail)) {

            errors.email = "Email inválido!";

        }

        if (formData.touched.username && !formData.username.match(validUsername)) {

            errors.username = "Username inválido!";

        }

        if (formData.touched.password && formData.password.length < 8) {

            errors.password = "Senha inválida!";

        }

        return errors;

    }

    const errors = validate();

    async function onSubmit(e) {

        e.preventDefault();

        if ((!errors.email) &&
            (!errors.username) &&
            (!errors.password)) {

            const res = await createUser(formData);

            console.log(res);

            //setFormData(initialValues);

        }

    }

    return (

        <form onSubmit={onSubmit} className={styles.container__form}>

            <fieldset>

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@exemplo.com"
                    required
                    value={email}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors.email ? styles.error : ""}
                />

                {errors.email && <small>{errors.email}</small>}

            </fieldset>

            <fieldset>

                <label>Username</label>

                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="educamargo_91"
                    maxLength={15}
                    minLength={5}
                    size={15}
                    required
                    value={username}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors.username ? styles.error : ""}
                />

                {errors.username && <small>{errors.username}</small>}

            </fieldset>

            <fieldset>

                <label>Senha</label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha com 8 caracteres"
                    minLength={8}
                    maxLength={30}
                    size={30}
                    required
                    value={password}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors.password ? styles.error : ""}
                />

                {errors.password && <small>{errors.password}</small>}

            </fieldset>

            {!loading && <button
                type="submit"
                className={styles.container__form_button}>
                Criar uma conta
            </button>}

            {loading && <button
                type="submit"
                className={styles.container__form_button} disabled>
                Aguarde...
            </button>}

            <p>{authError && authError}</p>

        </form >

    );

};

export default FormRegister;