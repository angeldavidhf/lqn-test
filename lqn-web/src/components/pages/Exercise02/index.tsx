import React, { useEffect, useState } from "react";
import "./assets/styles.css";

export default function Exercise02 () {
    const [pokemons, setPokemons] = useState(["audino", "bagon", "baltoy", "banette", "bidoof", "braviary", "bronzor", "carracosta", "charmeleon", "cresselia", "croagunk", "darmanitan", "deino", "emboar", "emolga", "exeggcute", "gabite", "girafarig", "gulpin", "haxorus", "heatmor", "heatran", "ivysaur", "jellicent", "jumpluff", "kangaskhan", "kricketune", "landorus", "ledyba", "loudred", "lumineon", "lunatone", "machamp", "magnezone", "mamoswine", "nosepass", "petilil", "pidgeotto", "pikachu", "pinsir", "poliwrath", "poochyena", "porygon2", "porygonz", "registeel", "relicanth", "remoraid", "rufflet", "sableye", "scolipede", "scrafty", "seaking", "sealeo", "silcoon", "simisear", "snivy", "snorlax", "spoink", "starly", "tirtouga", "trapinch", "treecko", "tyrogue", "vigoroth", "vulpix", "wailord", "wartortle", "whismur", "wingull", "yamask"]);

    const [pokemonsSort, setPokemonsSort] = useState([]);

    const endsWith = (word: string) => word[word.length - 1];
    const getCandidates = (words: any, used: any) => words.filter((e: any) => !used.includes(e));

    const buildLookup = (words: string[]) => {
        const lookup = new Map();

        words.forEach((e: string)=> {
            const start = e[0];
            lookup.set(start, [...(lookup.get(start) || []), e]);
        });

        return lookup;
    };

    const findPaths = (names: string[]) => {
        //const t0 = process.hrtime();
        const lookup = buildLookup(names);

        let maxNum = 0;
        let maxPaths: any = [];
       
        const parseResult = (arr: any) => {
            if (typeof arr[0] === 'object') {
                arr.forEach((el: any) => parseResult(el))
            } 
            else {
                if (arr.length > maxNum) {
                    maxNum = arr.length;
                    maxPaths = [arr];
                }

                if (arr.length === maxNum) {
                    maxPaths.push(arr)
                }
            }
        };
       
        const searchWords = (word: string, res: any) => {
            const cs = getCandidates(lookup.get(endsWith(word)) || [], res);
            return cs.length ? cs.map((e: any) => searchWords(e, [...res, e])) : res;
        };
       
        names.forEach((word: string) => {
            const res = searchWords(word, [word]);
            parseResult(res);
        });

        //const t1 = process.hrtime(t0);
        //console.info('Execution time (hr): %ds %dms', t1[0], t1[1] / 1000000);
        console.log('Max Path:', maxNum);
        console.log('Matching Paths:', maxPaths.length);
        console.log('Example Path:', maxPaths);
    };

    useEffect(() => {
        findPaths(pokemons);
    }, [])

    return (
        <section className="exercise02">
            <div className="pokemons__list">
                {pokemons.map((name, i) => (
                    <p key={i}>{name}</p>
                ))}
            </div>            
            <div className="pokemons__list">
                {pokemonsSort.map((name, i) => (
                    <p key={i}>{name}</p>
                ))}
            </div>  
        </section>
    );
} 