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
import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMes, setErrorMes] = useState('');

    const navigate = useNavigate();

    // const token = Cookies.get('Authorization'); get cookie by name
    // Cookies.remove('Authorization'); remove cookie

    function onSubmitLogin(e) {
        e.preventDefault();
        AuthService.login(username, password)
            .then((result) => {
                // console.log(result.data);
                localStorage.setItem('Authorization', result.data.access_token);
                navigate('/my');
            })
            .catch((result) => {
                if (result.response.data === "user not found" || result.response.data === "password is incorrect") {
                    setErrorMes('Incorrect username or password');
                } else {
                    setErrorMes('ERROR');
                }
                setShowError(true);
                // console.log(result);
            })
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
                {
                    showError ?
                        <Text style = {{color: clrs.red}}>
                            {errorMes}
                        </Text>
                        :
                        ''
                }

            </Block>
            <Footer/>
        </div>
    );
};

export default LoginPage;