import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import axios from "axios";

import "../assets/styles.css"

export default function Planets() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);

    const [planets, setPlanets] = useState([]);   

    useEffect(() => {
        setLoading(true);

        async function getPlanets(page: number) {
            await axios.get("https://swapi.dev/api/planets/?page=" + page)
            .then((response) => {
                setPlanets(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Lo sentimos, tenemos un error de conexión por favor intentalo mas tarde.");
            });
        }

        if(!loading) getPlanets(page);
    }, [page]);

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
                dataSource={planets}
                renderItem={renderItems}
            />
        </>
    )

    return (
        <section className="starwars__people">
            {loading ? <LoadingSpinner /> : renderList}
        </section>
    );
} 