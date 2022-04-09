import React from "react";

import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from 'antd';

import "./assets/styles.css";

export default function StarWars () {
    const { Header, Content } = Layout

    return (
        <Layout className="layout">
            <Header>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key={1}>
                    <Link to="people">
                        Personajes
                    </Link>
                </Menu.Item>
                <Menu.Item key={2}>
                    <Link to="planets">
                        Planetas
                    </Link>
                </Menu.Item>
            </Menu>
            </Header>
            <Content>
                <div className="starwars">
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
} 