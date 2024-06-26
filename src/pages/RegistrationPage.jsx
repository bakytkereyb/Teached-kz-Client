import React, {useEffect, useState} from 'react';
import Header from "../components/Header/Header";
import Block from "../components/UI/Block/Block";
import BigText from "../components/UI/BigText/BigText";
import FormBlock from "../components/Form/FormBlock";
import FormInput from "../components/Form/FormInput";
import Button from "../components/UI/Button/Button";
import Text from "../components/UI/Text/Text";
import {lan} from "../constants/lan";
import Footer from "../components/Footer/Footer";
import {clrs} from "../constants/colors";
import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FullLoading from "../components/LoadingComponents/FullLoading";
import FormSelect from "../components/Form/FormSelect";
import {getAllUniversities} from "../store/slices/universityListSlice";

const RegistrationPage = () => {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMes, setErrorMes] = useState('');

    const {user, isLoading} = useSelector(state => state.user);
    const universityList = useSelector(state => state.universityList);

    const [univers, setUnivers] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        setUnivers(universityList.universities.map(uni => {
            return {
                value: uni.id,
                label: uni.name
            }
        }))
    }, [universityList.universities]);

    useEffect(() => {
        dispatch(getAllUniversities())
    }, [navigate]);

    if (user !== null && !isLoading) {
        navigate('/my');
    }

    function onSubmitLogin(e) {
        e.preventDefault();
        if(password === password2) {
            AuthService.register(username, password, firstName, secondName, email, selectedUniversity.value)
                .then((result) => {
                    navigate('/login');
                })
                .catch((result) => {
                    if (result.response.data === "user is already have") {
                        setErrorMes('User is already registered');
                    } else {
                        setErrorMes('ERROR');
                    }
                    setShowError(true);
                    // console.log(result);
                })
        } else {
            setErrorMes('Passwords are not same');
            setShowError(true);
        }
    }

    const [selectedUniversity, setSelectedUniversity] = useState({
        value: null,
        label: null
    });

    const changeUniversity = (selectedUni) => {
        setSelectedUniversity(selectedUni)
    }

    if (universityList.isLoading) {
        return <FullLoading/>
    }

    return (
        <div>
            <Header/>
            <Block>
                <BigText>{lan.register}</BigText>
                <FormBlock onSubmit={onSubmitLogin}>
                    <FormInput
                        labelText={"First Name"}
                        value={firstName}
                        onChange={setFirstName}
                        id={"firstName"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <FormInput
                        labelText={"Second Name"}
                        value={secondName}
                        onChange={setSecondName}
                        id={"secondName"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <FormInput
                        labelText={"Email"}
                        value={email}
                        onChange={setEmail}
                        id={"email"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <FormSelect
                        labelText={lan.university}
                        values={univers}
                        onChange={changeUniversity}
                        id={"uni"}
                        required={true}
                        maxWidth={"50%"}
                        selectedValue={selectedUniversity}
                    />
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
                    <FormInput
                        labelText={"Repeat Password"}
                        value={password2}
                        onChange={setPassword2}
                        id={"password2"}
                        type={"password"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <Button>{lan.register}</Button>
                    <Text to={"/login"} style = {{color: clrs.blackBlue}}>
                        {lan.yesAccount}
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

export default RegistrationPage;