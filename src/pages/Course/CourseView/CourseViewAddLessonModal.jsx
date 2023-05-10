import React, {useState} from 'react';
import Modal from "../../../components/Modal/Modal";
import FormInput from "../../../components/Form/FormInput";
import Button from "../../../components/UI/Button/Button";
import Text from "../../../components/UI/Text/Text";
import {clrs} from "../../../constants/colors";
import {lan} from "../../../constants/lan";
import FormBlock from "../../../components/Form/FormBlock";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {addSectionToCourseById} from "../../../store/slices/course/courseSlice";

const CourseViewAddLessonModal = ({modal, setModal}) => {

    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const {id} = useParams();

    function handleSubmitForm(e) {
        e.preventDefault();
        setName('');
        setModal(false);

        dispatch(addSectionToCourseById({id: id, sectionName: name}));
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <FormBlock onSubmit={handleSubmitForm}>
                    <FormInput
                        labelText={lan.name}
                        id={"name"}
                        type={"text"}
                        required={true}
                        maxWidth={"100%"}
                        value={name}
                        onChange={setName}
                    />
                    <Button>{lan.addLesson}</Button>
                </FormBlock>
            </Modal>
        </div>
    );
};

export default CourseViewAddLessonModal;