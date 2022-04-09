import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/LQN_LOGO.png";

import "./assets/styles.css";

export default function Home() {

    return (
        <div className="home">
            <div className="home__content">
                <img src={logo} alt="Logo" width={317}/>
                <h1 className="home__title">
                    Prueba Técnica FrontEnd - LQN
                </h1>
                <div className="home__navigation">
                    <Link to="/01">
                        Exercise 01
                    </Link>
                    <Link to="/02">
                        Exercise 02
                    </Link>
                    <Link to="/starwars">
                        Star Wars
                    </Link>
                </div>
            </div>
        </div>
    )
}