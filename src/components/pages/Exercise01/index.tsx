import React from "react";
import "./assets/styles.css";

export default function Exercise01 () {

    return (
        <section className="exercise01">
            <div className="numbers__list">
                {Array.from(Array(101).keys()).map((num, i) => (
                    <p key={i}>{num} {(num % 2 === 0)? ((num % 5 === 0)? "buzz bazz" : "buzz") : (num % 5 === 0)? "bazz" : ""}</p>
                ))}
            </div>
        </section>
    );
} 