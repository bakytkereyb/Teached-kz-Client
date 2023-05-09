import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Input, Layout, List, Row} from 'antd';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Message from "./Message";
import icon from "../../images/user.svg"

const {Content} = Layout;

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 2,
            text: 'Hello Batyrbek!',
            name: 'Dias',
            time: '9:50 AM'
        },
        {
            id: 1,
            text: 'Hello Dias!',
            name: 'Batyrbek',
            time: '9:51 AM'
        },
        {
            id: 2,
            text: 'Doner?',
            name: 'Dias',
            time: '9:52 AM'
        },
        {
            id: 1,
            text: 'Of course, 667!',
            name: 'Batyrbek',
            time: '9:53 AM'
        },
        {
            id: 1,
            text: 'Of course, 667!',
            name: 'Batyrbek',
            time: '9:53 AM'
        },
        {
            id: 1,
            text: 'Of course, 667!',
            name: 'Batyrbek',
            time: '9:53 AM'
        },
        {
            id: 1,
            text: 'Of course, 667!',
            name: 'Batyrbek',
            time: '9:53 AM'
        },
    ]);
    const messageListRef = useRef(null);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [messages]);

    return (
        <div style={{backgroundColor: clrs.whiter, width: '100%', minHeight: '100vh'}}>
            <HeaderPlatform/>
            <Layout>
                <Content style={{padding: '16px', marginTop: '65px'}}>
                    <div
                        ref={messageListRef}
                        style={{
                            maxHeight: 'calc(100vh - 130px)',
                            overflowY: 'auto',
                            marginBottom: '16px',
                        }}
                    >
                        <List
                            dataSource={messages}
                            renderItem={(item) => (
                                item.id === 1 ?
                                    <Row justify='end' align="bottom">
                                        <Col>
                                            <Message
                                                sender={item.name}
                                                content={item.text}
                                                timestamp={item.time}
                                            />
                                        </Col>
                                        <Col>
                                            <img src={icon} alt="" style={{ width: '40px' }} />
                                        </Col>
                                    </Row>
                                    :
                                    <Row justify='start' align="bottom">
                                        <Col>
                                            <img src={icon} alt="" style={{ width: '40px' }} />
                                        </Col>
                                        <Col>
                                            <Message
                                                sender={item.name}
                                                content={item.text}
                                                timestamp={item.time}
                                            />
                                        </Col>
                                    </Row>
                            )}
                        />
                    </div>
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '16px',
                            left: '16px',
                            right: '16px',
                            display: 'flex',
                        }}
                    >
                        <Input
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type your message"
                            style={{flex: 1, marginRight: '16px'}}
                        />
                        <Button type="primary" onClick={handleSendMessage}>
                            Send
                        </Button>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default ChatPage;
