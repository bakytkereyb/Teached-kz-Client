import React, {useState} from 'react';
import BigText from "../UI/BigText/BigText";
import Button from "../UI/Button/Button";
import {lan} from "../../constants/lan";
import Modal from "../Modal/Modal";
import FormBlock from "../Form/FormBlock";
import FormInput from "../Form/FormInput";
import Text from "../UI/Text/Text";
import {clrs} from "../../constants/colors";
import cl from "./CourseLessons.module.css"
import Lesson from "./Lesson";


const CourseLessons = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className={cl.content}>
            <BigText>Course name</BigText>
            <Button type={2} onClick={() => setModal(true)}>{lan.addLesson}</Button>
            <Modal visible={modal} setVisible={setModal}>
                <FormBlock>
                    <FormInput
                        labelText={"Username"}
                        id={"username"}
                        type={"text"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <FormInput
                        labelText={"Password"}
                        id={"password"}
                        type={"password"}
                        required={true}
                        maxWidth={"50%"}
                    />
                    <Button>Login</Button>
                    <Text to={"/register"} style={{color: clrs.blackBlue}}>
                        {lan.noAccount}
                    </Text>
                </FormBlock>
            </Modal>
            <Lesson/>
            <Lesson/>
        </div>
    );
};

export default CourseLessons;