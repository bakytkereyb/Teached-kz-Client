import React, {useState} from 'react';
import Modal from "../../../components/Modal/Modal";
import FormBlock from "../../../components/Form/FormBlock";
import FormInput from "../../../components/Form/FormInput";
import {lan} from "../../../constants/lan";
import Button from "../../../components/UI/Button/Button";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";
import {useDispatch, useSelector} from "react-redux";
import {addFileToSection, getCourseById} from "../../../store/slices/course/courseSlice";
import FileUploaderService from "../../../services/FileUploaderService";
import {useParams} from "react-router-dom";

const CourseViewAddFileLessonModal = ({modal, setModal, selectedSection}) => {
    const [label, setLabel] = useState('');
    const [file, setFile] = useState(null);

    const {addFileToSectionLoading, addFileToSectionError} = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleSubmitForm(e) {
        e.preventDefault();
        setLoading(true);
        await FileUploaderService.uploadFile(file)
            .then(async (r) => {
                const fileName = r.data;
                await dispatch(addFileToSection({sectionId: selectedSection.id, label: label, fileName: fileName}));
                await dispatch(getCourseById({id: id}));
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

export default CourseViewAddFileLessonModal;