import { Link } from "react-router-dom";

import logo from "../assets/Logo.svg";

const Logo = ({ link }) => {

    return (

        <div>

            <Link to={link}>

                <img
                    src={logo}
                    alt="logomarca YelpCamp"
                />

            </Link>

        </div>

    );

};

export default Logo;