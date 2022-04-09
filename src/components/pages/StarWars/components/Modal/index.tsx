import React from "react";

import { Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons';

export default function ModalComponent(props: any) {

    return (
        <Modal
            title={props.title}
            centered
            footer={false}
            visible={props.visible}
            closeIcon={<CloseOutlined onClick={props.onClose}/>}
        >
            {props.children}
        </Modal>
    );
} 