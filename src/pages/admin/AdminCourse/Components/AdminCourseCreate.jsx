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
        dispatch(getAllTrainers())
    }, [])

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
                labelText={lan.courseName}
                value={name}
                onChange={setName}
                id={"courseName"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.courseName + "in Kazakh"}
                value={nameKz}
                onChange={setNameKz}
                id={"courseName"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.courseName + "in Russia"}
                value={nameRu}
                onChange={setNameRu}
                id={"courseName"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.courseDescription}
                value={description}
                onChange={setDescription}
                id={"courseDescription"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.courseDescription + "in Kazakh"}
                value={descriptionKz}
                onChange={setDescriptionKz}
                id={"courseDescription"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.courseDescription + "in Russia"}
                value={descriptionRu}
                onChange={setDescriptionRu}
                id={"courseDescription"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormSelect
                labelText={"Trainers"}
                values={trainers}
                onChange={setSelectedTrainer}
                id={"trainers"}
                required={true}
                maxWidth={"100%"}
                selectedValue={selectedTrainer}
                withoutLabel={true}
            />
            <Button>{lan.create}</Button>
        </FormBlock>
    );
};

export default AdminCourseCreate;