import React, {useEffect, useState} from 'react';
import FormBlock from "../../components/Form/FormBlock";
import FormInput from "../../components/Form/FormInput";
import {lan} from "../../constants/lan";
import FormSelect from "../../components/Form/FormSelect";
import Button from "../../components/UI/Button/Button";
import {useDispatch} from "react-redux";
import {createApplication} from "../../store/slices/applicationSlice";
import {setTab} from "../../store/slices/tabBlock/tabBlockSlice";
import FormTextField from '../../components/Form/FormTextField';

const CreateApplication = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    async function handleOnSubmit(e) {
        e.preventDefault();
        await dispatch(createApplication({
            title: title,
            body: body
        }))
        await dispatch(setTab(1));
    }

    return (
        <FormBlock onSubmit={handleOnSubmit}>
            <FormInput
                labelText={lan.title}
                value={title}
                onChange={setTitle}
                id={"title"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormTextField
                labelText={lan.body}
                value={body}
                onChange={setBody}
                id={"body"}
                required={true}
                maxWidth={"100%"}
            />
            <Button>{lan.create}</Button>
        </FormBlock>
    );
};

export default CreateApplication;