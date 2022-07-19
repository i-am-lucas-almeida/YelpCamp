import styles from "../../sass/pages/FormSection.module.scss";

import { useState } from "react";

const FormLogin = () => {

    const initialValues = {
        email: "",
        password: "",
        touched: {
            email: false,
            password: false
        }
    };

    const [formData, setFormData] = useState(initialValues);

    const { email, password } = formData;

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
            password: ""
        };

        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;

        if (formData.touched.email && !formData.email.match(validEmail)) {

            errors.email = "Email inválido!";

        }

        if (formData.touched.password && formData.password.length < 8) {

            errors.password = "Senha inválida!";

        }

        return errors;

    }

    const errors = validate();

    function onSubmit(e) {

        e.preventDefault();

        if ((!errors.email) &&
            (!errors.password)) {

            console.log(formData);
            setFormData(initialValues);

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

            <button
                type="submit"
                className={styles.container__form_button}>
                Entrar
            </button>

        </form >

    );

};

export default FormLogin;