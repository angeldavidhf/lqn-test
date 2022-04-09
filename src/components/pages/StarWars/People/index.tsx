import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import Icon, { UserOutlined } from '@ant-design/icons';
import axios from "axios";

import ModalComponent from "../components/Modal";
import TagsComponent from "../components/Tags";

import "../assets/styles.css"

export default function People() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [people, setPeople] = useState([]);
    const [planet, setPlanet] = useState(Object);
    const [currentPeople, setCurrentPeople] = useState(Object);
    const [movies, setMovies] = useState<object>([]);

    const [modalPeople, setModalPeople] = useState(false);
    const [modalPlanet, setModalPlanet] = useState(false);    
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);

        async function getPeople(page: number) {
            await axios.get("https://swapi.dev/api/people/?page=" + page)
            .then((response) => {
                setPeople(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
            });
        }

        if(!loading) getPeople(page);
    }, [page]);

    useEffect(() => {
        async function getPeopleDetails() {
            await axios.get(currentPeople.url)
            .then((response) => {
                setCurrentPeople(response.data);
            })
            .catch(error => {
                setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
            });
        }

        async function getPlanetDetail() {
            await axios.get(currentPeople.homeworld)
            .then((response) => {
                setPlanet(response.data);
            })
            .catch(error => {
                setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
            });
        }

        if(Object.keys(currentPeople).length !== 0) {
            if(modalPeople) getPeopleDetails();

            if(modalPlanet) getPlanetDetail();
        };
    }, [modalPeople, modalPlanet]);

    useEffect(() => {
        async function getMovies() {
            let responses = [];
            for (let i = 0; i < currentPeople.films.length; i++) 
            {
                responses.push((await axios.get(currentPeople.films[i])).data);
            }

            setMovies(responses);
        }

        if(Object.keys(currentPeople).length !== 0) getMovies();
    }, [currentPeople]);


    const PlanetSvg = () => (
        <svg width="3em" height="1em" fill="currentColor" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
            <g>
                <path d="m462.6,146.2c39.6-62.1 48.5-102.6 27.2-123.9-22.3-22.2-65.4-11.7-131.8,32.2-33.2-19.8-72-31.3-113.4-31.3-122.2,0-221.3,99.1-221.3,221.3 0,41.5 11.4,80.3 31.3,113.4-44,66.5-54.5,109.6-32.3,131.8 7.5,7.5 17.3,11.3 29.7,11.3 22.8,0 54-12.8 94.2-38.4 5.8-3.7 11.8-7.7 17.9-11.9 24.9,9.7 52.1,15.1 80.4,15.1 122.2,0 221.3-99.1 221.3-221.3 0-28.4-5.4-55.5-15.1-80.4 4.2-6.1 8.1-12.1 11.9-17.9zm-2.2-94.5c1.4,10.2-8.5,35.2-31.2,70.9-10.3-15.5-22.4-29.7-36.1-42.1 39.8-24.7 60.4-29.4 67.3-28.8zm-215.9,12.2c68.9,0 128.9,38.8 159.4,95.6-27.3,37.1-64.9,81.6-113.9,130.5-48.9,48.9-93.4,86.5-130.6,113.8-56.8-30.5-95.6-90.5-95.6-159.3 0.1-99.6 81.1-180.6 180.7-180.6zm-192.8,396.5c-0.5-6.9 4.1-27.6 28.8-67.3 12.4,13.7 26.6,25.8 42.1,36.1-35.7,22.6-60.7,32.5-70.9,31.2zm373.5-215.9c0,99.6-81,180.7-180.7,180.7-13.7,0-27-1.5-39.8-4.4 36.8-28.7 75.8-63.5 114.2-101.9 38.3-38.3 73.1-77.4 101.9-114.2 2.9,12.8 4.4,26.2 4.4,39.8z"/>
            </g>
        </svg>        
    );

    const PlanetIcon = (props: any) => <Icon component={PlanetSvg} {...props} />;

    const LoadingSpinner = () => (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>
    )

    const renderItems = (item: any, index: number) => (
        <List.Item key={index}>
            <Card 
                title={item.name}
                actions={[
                    <UserOutlined key="people" onClick={() => {
                        setCurrentPeople(item);
                        setModalPeople(true);
                    }}/>,
                    <PlanetIcon key="planet" onClick={() => {
                        setCurrentPeople(item);
                        setModalPlanet(true);
                    }}/>
                ]}
            >
                Content
            </Card>
        </List.Item>
    );

    const renderList = (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}            
                pagination={{
                    total: 82,
                    current: page,
                    showSizeChanger: false,
                    onChange: page => {
                        setPage(page);
                    },
                    pageSize: 10,
                }}
                dataSource={people}
                renderItem={renderItems}
            />
            <ModalComponent visible={modalPeople} onClose={() => setModalPeople(!modalPeople)} title={currentPeople.name}>
                <p><strong>Altura: </strong>{currentPeople.height}</p>
                <p><strong>Peso: </strong>{currentPeople.mass}</p>
                <p><strong>Color de piel: </strong>{currentPeople.skin_color}</p>
                <p><strong>Ojos: </strong>{currentPeople.eye_color}</p>
                <p><strong>Genero: </strong>{currentPeople.gender}</p>
                <h3>Peliculas</h3>
                <TagsComponent tags={movies}></TagsComponent>
            </ModalComponent>
            <ModalComponent visible={modalPlanet} onClose={() => setModalPlanet(!modalPlanet)} title={planet.name}>
                <p><strong>Periodo de rotación: </strong>{planet.rotation_period}</p>
                <p><strong>Periodo de orbita: </strong>{planet.orbital_period}</p>
                <p><strong>Clima: </strong>{planet.climate}</p>
                <p><strong>Terreno: </strong>{planet.terrain}</p>
                <p><strong>Población: </strong>{planet.population}</p>
            </ModalComponent>
        </>
    )

    return (
        <section className="starwars__people">
            {loading ? <LoadingSpinner /> : renderList}
        </section>
    );
} 