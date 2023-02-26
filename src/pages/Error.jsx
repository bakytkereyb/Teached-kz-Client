import React from 'react';
import Block from "../components/UI/Block/Block";
import error from "../images/error_icon.svg"
import Text from "../components/UI/Text/Text";
import {lan} from "../constants/lan";
import BigText from "../components/UI/BigText/BigText";
import Button from "../components/UI/Button/Button";

const Error = () => {
    return (
        <div>
            <Block style={{gap: '20px'}}>
                <img src={error} alt="Error" style={{width: '100px', height: '100px'}}/>
                <BigText>{lan.error}</BigText>
                <Text style={{fontWeight: 400}}>{lan.problem}</Text>
                <Button type="2">{lan.back}</Button>
            </Block>
        </div>
    );
};

export default Error;