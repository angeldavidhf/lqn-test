import React from "react";
import { Tag } from "antd";

export default function TagsComponent(props: any) {
    
    return (
        <>
            {props.tags.map((item: any, index: number) => (
                <Tag key={index}>{item.title}</Tag>
            ))}
        </>
    );
} 