import styles from "../sass/components/TestimonialSection.module.scss";

import { useState, useEffect } from "react";

import { data as testimonials } from "../data/testimonials";

const TestimonialSection = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const randomNum = Math.floor(Math.random() * (testimonials.length));

        setData(testimonials[randomNum] || 0);

    }, []);

    return (

        <div className={styles.testimonial}>

            <div className={styles.testimonial__content}>

                <h3>
                    {data.testimonial && `“${data.testimonial}”`}
                </h3>

                <div className={styles.testimonial__perfil}>

                    <img
                        src={data.photo && data.photo}
                        alt={data.name && `Foto: ${data.name}`}
                    />

                    <aside>

                        <h4>
                            {data.name && data.name}
                        </h4>

                        <p>
                            {data.profile && data.profile}
                        </p>

                    </aside>

                </div>

            </div>

        </div>

    );

};

export default TestimonialSection;