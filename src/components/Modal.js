import styles from "../sass/components/Modal.module.scss";

const Modal = ({ id, message, closeEvent, confirmEvent }) => {

    return (

        <div className={styles.modal}>

            <div className={styles.modal__content}>

                <h3>
                    {message}
                </h3>

                <div className={styles.modal__buttons}>

                    <button onClick={() => closeEvent(false)}>
                        Fechar
                    </button>

                    <button onClick={() => confirmEvent(id)}
                        className={styles.modal__delete}>
                        Excluir
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Modal;