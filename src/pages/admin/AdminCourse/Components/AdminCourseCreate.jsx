import React, {useEffect, useState} from 'react';
import FormBlock from "../../../../components/Form/FormBlock";
import FormInput from "../../../../components/Form/FormInput";
import {lan} from "../../../../constants/lan";
import Button from "../../../../components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../../../../store/slices/tabBlock/tabBlockSlice";
import {createCourse} from "../../../../store/slices/admin/adminCourseSlice";
import {getAllTrainers} from "../../../../store/slices/trainerListSlice";
import FormSelect from "../../../../components/Form/FormSelect";

const AdminCourseCreate = () => {
    const trainerList = useSelector(state => state.trainersList.trainers)

    const [name, setName] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionKz, setDescriptionKz] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState({
        value: null,
        label: null
    });
    const [trainers, setTrainers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setTrainers(trainerList.map(item => {
            return {
                value: item.username,
                label: item.firstName + " " + item.secondName
            }
        }));

    }, [trainerList]);

    async function handleOnSubmit(e) {
        e.preventDefault();
        await dispatch(createCourse({
            name: name,
            nameKz: nameKz,
            nameRu: nameRu,
            description: description,
            descriptionKz: descriptionKz,
            descriptionRu: descriptionRu,
            trainerUsername: selectedTrainer.value
        }))
        setName('');
        setNameKz('');
        setNameRu('');
        setDescription('');
        setDescriptionKz('');
        setDescriptionRu('');
        setSelectedTrainer({
            value: null,
            label: null
        });
        await dispatch(setTab(0));
    }

    return (
        <FormBlock onSubmit={handleOnSubmit}>
            <FormInput
                labelText={lan.nameEng}
                value={name}
                onChange={setName}
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
            <FormInput
                labelText={lan.descriptionEng}
                value={description}
                onChange={setDescription}
                id={"descriptionEng"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.descriptionKz}
                value={descriptionKz}
                onChange={setDescriptionKz}
                id={"descriptionKz"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.descriptionRu}
                value={descriptionRu}
                onChange={setDescriptionRu}
                id={"descriptionRu"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormSelect
                labelText={lan.trainer}
                values={trainers}
                onChange={setSelectedTrainer}
                id={"trainer"}
                required={true}
                maxWidth={"100%"}
                selectedValue={selectedTrainer}
            />
            <Button>{lan.create}</Button>
        </FormBlock>
    );
};

export default AdminCourseCreate;