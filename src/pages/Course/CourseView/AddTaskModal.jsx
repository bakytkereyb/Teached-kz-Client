import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {addSectionToCourseById, addTaskToSection, getCourseById} from '../../../store/slices/course/courseSlice';
import Modal from '../../../components/Modal/Modal';
import FormBlock from '../../../components/Form/FormBlock';
import FormInput from '../../../components/Form/FormInput';
import {lan} from '../../../constants/lan';
import Button from '../../../components/UI/Button/Button';
import FormSelect from '../../../components/Form/FormSelect';
import BlockLoading from '../../../components/LoadingComponents/BlockLoading';

const AddTaskModal = ({modal, setModal}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');

    const dispatch = useDispatch();

    const {course, isLoading} = useSelector(state => state.course);
    const {addTaskToSectionLoading, addTaskToSectionError} = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);


    const {id} = useParams();

    const [sections, setSections] = useState([]);

    const [selectedSection, setSelectedSection] = useState({
        value: null,
        label: null
    })

    useEffect(() => {
        if (course !== null) {
            setSections(
                course.sections.map(section => {
                    return {
                        label: section.name,
                        value: section.id
                    }
                })
            )

        }
    }, [course])

    async function handleSubmitForm(e) {
        e.preventDefault();
        setLoading(true);
        await dispatch(addTaskToSection({
            sectionId: selectedSection.value,
            name: name,
            description: description,
            deadline: new Date(dateTime).toISOString()
        }))
        setName('');
        setDescription('');
        setDateTime('');
        setSelectedSection({
            value: null,
            label: null
        });
        setModal(false);
        setLoading(false);
        dispatch(getCourseById({id: id}));
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <FormBlock onSubmit={handleSubmitForm}>
                    <BlockLoading isLoading={addTaskToSectionLoading || loading}/>
                    <FormSelect
                        labelText={lan.sections}
                        values={sections}
                        onChange={setSelectedSection}
                        id={"sections"}
                        required={true}
                        maxWidth={"100%"}
                        selectedValue={selectedSection}
                    />
                    <FormInput
                        labelText={lan.name}
                        id={"name"}
                        type={"text"}
                        required={true}
                        maxWidth={"100%"}
                        value={name}
                        onChange={setName}
                    />
                    <FormInput
                        labelText={lan.description}
                        id={"description"}
                        type={"text"}
                        required={true}
                        maxWidth={"100%"}
                        value={description}
                        onChange={setDescription}
                    />
                    <FormInput
                        labelText={lan.deadline}
                        id={"deadline"}
                        type={"datetime-local"}
                        required={true}
                        maxWidth={"100%"}
                        value={dateTime}
                        onChange={setDateTime}
                    />
                    <Button>{lan.addTask}</Button>
                </FormBlock>
            </Modal>
        </div>
    );
};

export default AddTaskModal;