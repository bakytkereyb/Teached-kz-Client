import React, {useEffect, useState} from 'react';
import FormBlock from "../../../components/Form/FormBlock";
import {lan} from "../../../constants/lan";
import FormInput from "../../../components/Form/FormInput";
import Button from "../../../components/UI/Button/Button";
import {useDispatch} from "react-redux";
import {createComponentBank} from "../../../store/slices/competenceSlice";
import CompetenceService from "../../../services/CompetenceService";
import {setTab} from "../../../store/slices/tabBlock/tabBlockSlice";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";

const CreateComponent = () => {

    const [nameEng, setNameEng] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [nameRu, setNameRu] = useState('');

    const dispatch = useDispatch();

    async function handleOnSubmit(e) {
        e.preventDefault();
        await dispatch(createComponentBank({
            name: nameEng,
            nameRu: nameRu,
            nameKz: nameKz
        }))
        setNameEng('');
        setNameKz('');
        setNameRu('');
        dispatch(setTab(0));
    }

    return (
        <FormBlock onSubmit={handleOnSubmit}>
            <FormInput
                labelText={lan.nameEng}
                value={nameEng}
                onChange={setNameEng}
                id={"nameEng"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.nameKz}
                value={nameKz}
                onChange={setNameKz}
                id={"nameKz"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.nameRu}
                value={nameRu}
                onChange={setNameRu}
                id={"nameRu"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <Button >{lan.create}</Button>
        </FormBlock>
    );
};

export default CreateComponent;