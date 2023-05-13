import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTab} from '../../../store/slices/tabBlock/tabBlockSlice';
import FormBlock from '../../../components/Form/FormBlock';
import FormInput from '../../../components/Form/FormInput';
import {lan} from '../../../constants/lan';
import Button from '../../../components/UI/Button/Button';
import {createPostCourse} from '../../../store/slices/admin/adminPostCourseSlice';

const AdminPostCourseCreate = () => {

    const [name, setName] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionKz, setDescriptionKz] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');

    const dispatch = useDispatch();

    async function handleOnSubmit(e) {
        e.preventDefault();
        await dispatch(createPostCourse({
            name: name,
            nameKz: nameKz,
            nameRu: nameRu,
            description: description,
            descriptionKz: descriptionKz,
            descriptionRu: descriptionRu,
        }))
        setName('');
        setNameKz('');
        setNameRu('');
        setDescription('');
        setDescriptionKz('');
        setDescriptionRu('');
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
            <Button>{lan.create}</Button>
        </FormBlock>
    );
};

export default AdminPostCourseCreate;