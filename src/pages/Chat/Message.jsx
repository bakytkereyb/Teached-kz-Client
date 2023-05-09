import React from 'react';
import style from './Message.module.css';

const Message = ({ content, sender, timestamp }) => {
    return (
        <div className={style.message}>
            <div className={style.sender}>{sender}</div>
            <div className={style.content}>{content}</div>
            <div className={style.timestamp}>{timestamp}</div>
        </div>
    );
};

export default Message;
