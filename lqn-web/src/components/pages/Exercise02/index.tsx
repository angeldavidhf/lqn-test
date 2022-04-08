import React, { useEffect, useState } from "react";

import "./assets/styles.css";

export default function Exercise02 () {
    const [pokemons, setPokemons] = useState(["audino", "bagon", "baltoy", "banette", "bidoof", "braviary", "bronzor", "carracosta", "charmeleon", "cresselia", "croagunk", "darmanitan", "deino", "emboar", "emolga", "exeggcute", "gabite", "girafarig", "gulpin", "haxorus", "heatmor", "heatran", "ivysaur", "jellicent", "jumpluff", "kangaskhan", "kricketune", "landorus", "ledyba", "loudred", "lumineon", "lunatone", "machamp", "magnezone", "mamoswine", "nosepass", "petilil", "pidgeotto", "pikachu", "pinsir", "poliwrath", "poochyena", "porygon2", "porygonz", "registeel", "relicanth", "remoraid", "rufflet", "sableye", "scolipede", "scrafty", "seaking", "sealeo", "silcoon", "simisear", "snivy", "snorlax", "spoink", "starly", "tirtouga", "trapinch", "treecko", "tyrogue", "vigoroth", "vulpix", "wailord", "wartortle", "whismur", "wingull", "yamask"]);
    const [pokemonsList, setPokemonsList] = useState(Array);

    const buildLookup = (words: string[]) => {
        const lookup = new Map();
        words.forEach((e: string)=> {
            const start = e[0];
            lookup.set(start, [...(lookup.get(start) || []), e]);
        });

        return lookup;
    };

    const findPokemons = (words: string[] = pokemons) => {
        const lookup = buildLookup(words);
        let maxNum = 0;

        const endsWith = (word: string) => word[word.length - 1];
        const getCandidates = (words: any, used: string[]) => words.filter((e: any) => !used.includes(e));

        const parseResult = (arr: Array<[]>) => {
            if (typeof arr[0] === 'object') {
                arr.forEach((el: Array<[]>) => parseResult(el))
            } 
            else {
                if (arr.length > maxNum) {
                    maxNum = arr.length;
                    setPokemonsList([arr]);
                }
    
                if (arr.length === maxNum) {
                    setPokemonsList(arr);
                }
            }
        };

        const searchWords = (word: string, res: string[]) => {
            const cs = getCandidates(lookup.get(endsWith(word)) || [], res);
            return cs.length ? cs.map((e: string) => searchWords(e, [...res, e])) : res;
        };

        words.forEach((word: string) => {
            const res = searchWords(word, [word]);
            parseResult(res);
        });
    }

    useEffect(() => {
        findPokemons(pokemons);
    }, [])

    return (
        <section className="exercise02">
            <div className="pokemons__list">
                <h1>Lista original</h1>
                {pokemons.map((name, i) => (
                    <p key={i}>{name}</p>
                ))}
            </div>
            <div className="pokemons__list">
                <h1>Lista nueva</h1>
                {pokemonsList.map((name, i) => (
                    <p key={i}><>{name}</></p>
                ))}
            </div>
        </section>
    );
} 