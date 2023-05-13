import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import FileUploaderService from '../../../services/FileUploaderService';
import Modal from '../../../components/Modal/Modal';
import FormBlock from '../../../components/Form/FormBlock';
import BlockLoading from '../../../components/LoadingComponents/BlockLoading';
import FormInput from '../../../components/Form/FormInput';
import {lan} from '../../../constants/lan';
import Button from '../../../components/UI/Button/Button';
import {addFileToSectionPostCourse, getPostCourseById} from '../../../store/slices/postCourse/postCourseSlice';

const PostCourseViewAddFileLessonModal = ({modal, setModal, selectedSection}) => {
    const [label, setLabel] = useState('');
    const [file, setFile] = useState(null);

    const {addFileToSectionLoading, addFileToSectionError} = useSelector(state => state.postCourse);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleSubmitForm(e) {
        e.preventDefault();
        setLoading(true);
        await FileUploaderService.uploadFile(file)
            .then(async (r) => {
                const fileName = r.data;
                await dispatch(addFileToSectionPostCourse({sectionId: selectedSection.id, label: label, fileName: fileName}));
                await dispatch(getPostCourseById({id: id}));
            })
            .finally(() => {
                setLabel('');
                setFile(null);
                setModal(false);
                setLoading(false);
            });
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <FormBlock onSubmit={handleSubmitForm}>
                    <BlockLoading isLoading={addFileToSectionLoading || loading}/>
                    <FormInput
                        labelText={lan.label}
                        id={"label"}
                        type={"text"}
                        required={true}
                        maxWidth={"100%"}
                        value={label}
                        onChange={setLabel}
                    />
                    <FormInput
                        labelText={lan.file}
                        id={"file"}
                        type={"file"}
                        required={true}
                        maxWidth={"100%"}
                        onChange={setFile}
                    />
                    <Button>{lan.addFile}</Button>
                </FormBlock>
            </Modal>
        </div>
    );
};

export default PostCourseViewAddFileLessonModal;