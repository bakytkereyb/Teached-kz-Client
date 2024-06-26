import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Col, Layout, List, Row} from 'antd';
import {clrs} from "../../constants/colors";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Message from "./Message";
import icon from "../../images/user.svg"
import Block from '../../components/UI/Block/Block';
import FlexBlock from '../../components/UI/FlexBlock/FlexBlock';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {API_BASE_URL} from '../../constants/api';
import {ACCESS_TOKEN} from '../../constants/auth';
import Card from '../../components/LoadingComponents/Card';
import {getChatById} from '../../store/slices/chat/chatSlice';
import BigText from '../../components/UI/BigText/BigText';
import {lan} from '../../constants/lan';
import ChatService from '../../services/ChatService';
import FormBlock from '../../components/Form/FormBlock';
import FormInput from '../../components/Form/FormInput';
import Button from '../../components/UI/Button/Button';

const {Content} = Layout;

const ChatPage = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const {user} = useSelector(state => state.user);

    const {chat, isLoading} = useSelector(state => state.chat);

    const [messageList, setMessageList] = useState([]);
    //-------------
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        if (chat !== null) {
            console.log(chat);
            setMessageList(chat.messageList);
        }
    }, [chat])

    useEffect(() => {
        let socket = new SockJS(API_BASE_URL + '/ws');
        setStompClient(Stomp.over(socket));
        dispatch(getChatById({id}))
    }, [navigate]);

    useEffect(() => {
        if (stompClient !== null) {
            stompClient.connect({}, function (frame) {
                stompClient.subscribe(
                    `/chat/${id}`,
                    function (greeting) {
                        let message = JSON.parse(greeting.body);
                        console.log(message);
                        setMessageList(oldList => [...oldList, message]);
                    },
                    {
                        'chatId': `${id}`,
                        'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`
                    },
                );
            });
        }
    }, [stompClient, navigate]);

    //------------------------

    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    async function handleSendMessage(e) {
        e.preventDefault();
        await ChatService.sendMessageToChat(id, message);
        setMessage('');
    }

    const myRef = useRef(null);
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current.scrollHeight;
        }
    }, [messageList])

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: '100%', minHeight: '100vh'}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                    <Card type={"horizontal"}/>
                    <Card type={"horizontal-small"}/>
                </Block>
            </div>
        )
    }

    if (chat === null) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <BigText>{lan.chatNotFound}</BigText>
                </Block>
            </div>
        );
    }





    return (
        <div style={{backgroundColor: clrs.whiter, width: '100%', minHeight: '100vh'}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <FlexBlock style={{
                    height: "calc(100vh - 50px - 50px - 100px - 50px)",
                    flexDirection: "column",
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}>
                    <FlexBlock ref={myRef} style={{overflowY: "auto", height: "100%", backgroundColor: clrs.whiter,}}>
                        <List
                            style={{
                                width: "calc(100% - 30px)",
                                padding: "25px 15px",
                                height: "100%"
                            }}
                            dataSource={messageList}
                            renderItem={(item) => (
                                item.user.id === user.id ?
                                    <Row justify='end' align="bottom" gutter={8}>
                                        <Col>
                                            <Message
                                                sender={item.user.username}
                                                content={item.message}
                                                timestamp={item.createdAt}
                                            />
                                        </Col>
                                        <Col>
                                            <img src={user.imageFileName ? `${API_BASE_URL}/api/file/get/${user?.imageFileName}` : icon} alt=""
                                                 style={{
                                                     width: '40px',
                                                     height: '40px',
                                                     borderRadius: "50%",
                                                     objectFit: "cover",
                                                 }}/>
                                        </Col>
                                    </Row>
                                    :
                                    <Row justify='start' align="bottom" gutter={8}>
                                        <Col>
                                            <img
                                                src={item.user.imageFileName ? `${API_BASE_URL}/api/file/get/${item.user?.imageFileName}` : icon}
                                                alt=""
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}/>
                                        </Col>
                                        <Col>
                                            <Message
                                                sender={item.user.username}
                                                content={item.message}
                                                timestamp={item.createdAt}
                                            />
                                        </Col>
                                    </Row>
                            )}
                        />
                    </FlexBlock>

                    <FlexBlock>
                        <FormBlock style={{
                            flexDirection: 'row',
                            gap: "20px",
                            width: '100%',
                            alignItems: "flex-end",
                        }} onSubmit={handleSendMessage}>
                            <FormInput
                                labelText={lan.message}
                                id={"message"}
                                type={"text"}
                                required={true}
                                value={message}
                                onChange={setMessage}
                                maxWidth={"100%"}
                                withoutLabel={true}
                            />
                            <Button type="primary">
                                {lan.send}
                            </Button>
                        </FormBlock>
                    </FlexBlock>
                </FlexBlock>

            </Block>
        </div>
    );
};

export default ChatPage;
