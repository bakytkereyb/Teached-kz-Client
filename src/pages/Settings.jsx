import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import TabBlock from "../components/UI/TabBlock/TabBlock";
import TabItem from "../components/UI/TabBlock/TabItem";
import {useDispatch, useSelector} from "react-redux";
import {lan} from "../constants/lan";
import Text from "../components/UI/Text/Text";
import FormInput from "../components/Form/FormInput";
import Button from "../components/UI/Button/Button";
import FormBlock from "../components/Form/FormBlock";
import {useNavigate} from "react-router-dom";
import {
    resetEditUser,
    setAdmissionDate,
    setBirthDay,
    setDegree,
    setDegreeAwarded,
    setDisciplineNames, setEmail,
    setFirstName,
    setGraduationYear,
    setMiddleName,
    setPosition,
    setRank,
    setSecondName,
    setSpecializationName,
    setTelNumber,
    setUniversityJobName,
    setUniversityName,
    updateUserByUsername
} from '../store/slices/userSlice';
import HorizontalDivider from "../components/UI/Divider/HorizontalDivider";
import Alert from "../components/UI/Alert/Alert";
import FileUploaderService from "../services/FileUploaderService";
import ImageUploadService from "../services/ImageUploadService";
import {NotificationManager} from "react-notifications";
import EmailSendService from '../services/EmailSendService';

const Settings = () => {
    const dispatch = useDispatch();

    const editUser = useSelector(state => state.user.editUser);
    const user = useSelector(state => state.user.user);
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetEditUser());
    }, [navigate])

    async function onSubmitProfile(e) {
        e.preventDefault();
        const data = {
            "username": editUser.username,
            "firstName": editUser.firstName,
            "secondName": editUser.secondName,
            "middleName": editUser.middleName,
            "birthDay": editUser.birthDay,
            "telNumber": editUser.telNumber,
            "universityName": editUser.universityName,
            "specializationName": editUser.specializationName,
            "admissionDate": editUser.admissionDate,
            "graduationYear": editUser.graduationYear,
            "degreeAwarded": editUser.degreeAwarded,
            "universityJobName": editUser.universityJobName,
            "position": editUser.position,
            "degree": editUser.degree,
            "rank": editUser.rank,
            "disciplineNames": editUser.disciplineNames
        }

        await dispatch(updateUserByUsername(data));
        await dispatch(resetEditUser());
    }

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }

    }, [file])

    async function onSubmitProfileImage(e) {
        e.preventDefault();
        await FileUploaderService.uploadFile(file)
            .then(async (r) => {
                const fileName = r.data;
                console.log(user.id)
                await ImageUploadService.uploadProfileImage(user.id, fileName)
            })
            .finally(() => {
                setFile(null);
                NotificationManager.success(lan.profileImageHasChanged);
            });
    }

    async function onSubmitEmail(e) {
        e.preventDefault();
        await EmailSendService.sendEmailConfirmation(user.id, editUser.email);
        NotificationManager.success(lan.confirmationMessageIsSent);
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.setting}</Text>
                <TabBlock headers={[lan.profile, lan.emailConfirm, lan.changeProfileImage]}>
                    <TabItem item={0}>
                        <FormBlock onSubmit={onSubmitProfile}>
                            <Alert>{lan.fillAllFields}</Alert>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.generalInformation}</Text>
                            <FormInput
                                labelText={lan.firstName}
                                value={editUser.firstName}
                                onChange={(value) => {
                                    dispatch(setFirstName(value))
                                }}
                                id={"firstName"}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.secondName}
                                value={editUser.secondName}
                                onChange={(value) => {
                                    dispatch(setSecondName(value))
                                }}
                                id={"secondName"}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.middleName}
                                value={editUser.middleName}
                                onChange={(value) => {
                                    dispatch(setMiddleName(value))
                                }}
                                id={"middleName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.birthDate}
                                value={editUser.birthDay}
                                onChange={(value) => {
                                    dispatch(setBirthDay(value))
                                }}
                                id={"birthDate"}
                                type={"date"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.telNumber}
                                value={editUser.telNumber}
                                onChange={(value) => {
                                    dispatch(setTelNumber(value))
                                }}
                                id={"telNumber"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <HorizontalDivider/>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.education}</Text>
                            <FormInput
                                labelText={lan.universityName}
                                value={editUser.universityName}
                                onChange={(value) => {
                                    dispatch(setUniversityName(value))
                                }}
                                id={"universityName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.specialization}
                                value={editUser.specializationName}
                                onChange={(value) => {
                                    dispatch(setSpecializationName(value))
                                }}
                                id={"specializationName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.admissionDate}
                                value={editUser.admissionDate}
                                onChange={(value) => {
                                    dispatch(setAdmissionDate(value))
                                }}
                                id={"admissionDate"}
                                type={"date"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.graduationYear}
                                value={editUser.graduationYear}
                                onChange={(value) => {
                                    dispatch(setGraduationYear(value))
                                }}
                                id={"graduationYear"}
                                type={"number"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.degreeAwarded}
                                value={editUser.degreeAwarded}
                                onChange={(value) => {
                                    dispatch(setDegreeAwarded(value))
                                }}
                                id={"degreeAwarded"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <HorizontalDivider/>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.jobInformation}</Text>
                            <FormInput
                                labelText={lan.universityJobName}
                                value={editUser.universityJobName}
                                onChange={(value) => {
                                    dispatch(setUniversityJobName(value))
                                }}
                                id={"universityJobName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.position}
                                value={editUser.position}
                                onChange={(value) => {
                                    dispatch(setPosition(value))
                                }}
                                id={"position"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.degree}
                                value={editUser.degree}
                                onChange={(value) => {
                                    dispatch(setDegree(value))
                                }}
                                id={"degree"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.rank}
                                value={editUser.rank}
                                onChange={(value) => {
                                    dispatch(setRank(value))
                                }}
                                id={"rank"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.disciplineNames}
                                value={editUser.disciplineNames}
                                onChange={(value) => {
                                    dispatch(setDisciplineNames(value))
                                }}
                                id={"disciplineNames"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <Button>{lan.save}</Button>
                        </FormBlock>
                    </TabItem>
                    <TabItem item={1}>

                        <FormBlock onSubmit={onSubmitEmail}>
                            <FormInput
                                labelText={lan.email}
                                value={editUser.email}
                                onChange={(value) => {
                                    dispatch(setEmail(value))
                                }}
                                id={"email"}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            {
                                !user.isConfirmed &&
                                <Button>{lan.send}</Button>
                            }
                        </FormBlock>
                    </TabItem>
                    <TabItem item={2}>
                        <FormBlock onSubmit={onSubmitProfileImage}>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.changeProfileImage}</Text>
                            {file &&
                                <img
                                    src={imageSrc}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                    alt="Image Preview"/>}
                            <FormInput
                                labelText={lan.profileImage}
                                onChange={setFile}
                                id={"profileImage"}
                                type={"file"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <Button>{lan.save}</Button>
                        </FormBlock>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default Settings;