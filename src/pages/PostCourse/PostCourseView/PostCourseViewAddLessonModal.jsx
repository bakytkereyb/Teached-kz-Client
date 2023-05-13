import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Modal from '../../../components/Modal/Modal';
import FormBlock from '../../../components/Form/FormBlock';
import FormInput from '../../../components/Form/FormInput';
import {lan} from '../../../constants/lan';
import Button from '../../../components/UI/Button/Button';
import {addSectionToPostCourseById, getPostCourseById} from '../../../store/slices/postCourse/postCourseSlice';

const PostCourseViewAddLessonModal = ({modal, setModal}) => {
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleSubmitForm(e) {
        e.preventDefault();
        setName('');
        setModal(false);

        await dispatch(addSectionToPostCourseById({id: id, sectionName: name}));
        await dispatch(getPostCourseById({id: id}));
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

export default PostCourseViewAddLessonModal;