import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setTab} from "../../../../store/slices/tabBlock/tabBlockSlice";
import FormBlock from "../../../../components/Form/FormBlock";
import FormInput from "../../../../components/Form/FormInput";
import {lan} from "../../../../constants/lan";
import FormSelect from "../../../../components/Form/FormSelect";
import Button from "../../../../components/UI/Button/Button";
import Text from "../../../../components/UI/Text/Text";
import {createUserAdmin, createUserTrainer} from "../../../../store/slices/admin/adminUserSlice";
import {NotificationManager} from "react-notifications";

const AdminUserCreate = () => {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [selectedRole, setSelectedRole] = useState({
        value: null,
        label: null
    });

    const dispatch = useDispatch();

    async function handleOnSubmit(e) {
        e.preventDefault();
        if (password === passwordConfirm) {
            if (selectedRole.value === 'admin') {
                await dispatch(createUserAdmin({
                    username: username,
                    firstName: firstName,
                    secondName: secondName,
                    email: email,
                    password: password,
                }))
            } else {
                await dispatch(createUserTrainer({
                    username: username,
                    firstName: firstName,
                    secondName: secondName,
                    email: email,
                    password: password,
                }))
            }
            setUsername('');
            setFirstName('');
            setSecondName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            setSelectedRole({
                value: null,
                label: null
            });
            NotificationManager.success(lan.userSuccessCreated);
            await dispatch(setTab(0));
        } else {
            NotificationManager.error(lan.userErrorCreated);
        }
    }

    return (
        <FormBlock onSubmit={handleOnSubmit}>
            <FormInput
                labelText={lan.username}
                value={username}
                onChange={setUsername}
                id={"username"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.firstName}
                value={firstName}
                onChange={setFirstName}
                id={"firstName"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.secondName}
                value={secondName}
                onChange={setSecondName}
                id={"secondName"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.email}
                value={email}
                onChange={setEmail}
                id={"email"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.password}
                value={password}
                onChange={setPassword}
                id={"password"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            <FormInput
                labelText={lan.confirmPassword}
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                id={"confirmPassword"}
                type={"text"}
                required={true}
                maxWidth={"100%"}
            />
            {/*<Text style={{alignSelf: 'start'}}>Выберите роль</Text>*/}
            <FormSelect
                labelText={lan.role}
                values={[
                    {
                        value: "admin",
                        label: lan.admin,
                    },
                    {
                        value: "trainer",
                        label: lan.trainer,
                    },
                ]}
                onChange={setSelectedRole}
                id={"role"}
                required={true}
                maxWidth={"100%"}
                selectedValue={selectedRole}
                withoutLabel={false}
            />
            <Button>{lan.create}</Button>
        </FormBlock>
    );
};

export default AdminUserCreate;