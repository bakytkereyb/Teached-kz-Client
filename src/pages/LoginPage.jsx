import React, {useState} from 'react';
import Header from "../components/Header/Header";
import Block from "../components/UI/Block/Block";
import BigText from "../components/UI/BigText/BigText";
import FormBlock from "../components/Form/FormBlock";
import FormInput from "../components/Form/FormInput";
import Button from "../components/UI/Button/Button";
import Footer from "../components/Footer/Footer";
import Text from "../components/UI/Text/Text";
import {lan} from "../constants/lan";
import {clrs} from "../constants/colors";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onSubmitLogin(e) {
        e.preventDefault();
    }

    return (
        <div>
            <Header/>
            <Block>
                <BigText>{lan.login}</BigText>
                <FormBlock onSubmit={onSubmitLogin}>
                    <FormInput
                        labelText={"Username"}
                        value={username}
                        onChange={setUsername}
                        id={"username"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <FormInput
                        labelText={"Password"}
                        value={password}
                        onChange={setPassword}
                        id={"password"}
                        type={"password"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <Button>Login</Button>
                    <Text to={"/register"} style = {{color: clrs.blackBlue}}>
                        {lan.noAccount}
                    </Text>
                </FormBlock>
            </Block>
            <Footer/>
        </div>
    );
};

export default LoginPage;