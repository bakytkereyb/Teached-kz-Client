import React, {useEffect, useState} from 'react';
import {clrs} from "../constants/colors";
import HeaderPlatform from "../components/HeaderPlatform/HeaderPlatform";
import Block from "../components/UI/Block/Block";
import MyMasonry from "../components/Masonry/MyMasonry";
import MyTasks from "../components/MyTasksCard/MyTasks";
import Course from "../components/CourseCard/Course";
import TabBlock from "../components/UI/TabBlock/TabBlock";
import TabItem from "../components/UI/TabBlock/TabItem";
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../store/slices/tabBlock/tabBlockSlice";
import {lan} from "../constants/lan";
import BigText from "../components/UI/BigText/BigText";
import Text from "../components/UI/Text/Text";
import FormInput from "../components/Form/FormInput";
import Button from "../components/UI/Button/Button";
import FormBlock from "../components/Form/FormBlock";
import {useNavigate} from "react-router-dom";
import {
    getUserByToken,
    resetEditUser, setAdmissionDate,
    setBirthDay, setDegree, setDegreeAwarded, setDisciplineNames,
    setFirstName, setGraduationYear,
    setMiddleName, setPosition, setRank,
    setSecondName, setSpecializationName, setUniversityJobName,
    setUniversityName, updateUserByUsername
} from "../store/slices/userSlice";
import HorizontalDivider from "../components/UI/Divider/HorizontalDivider";
import Alert from "../components/UI/Alert/Alert";

const Settings = () => {
    const dispatch = useDispatch();

    const editUser = useSelector(state => state.user.editUser);

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

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px", alignItems: "flex-start"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.setting}</Text>
                <TabBlock headers={[lan.profile, lan.emailConfirm]}>
                    <TabItem item={0}>
                        <FormBlock onSubmit={onSubmitProfile}>
                            <Alert>{lan.fillAllFields}</Alert>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.generalInformation}</Text>
                            <FormInput
                                labelText={lan.firstName}
                                value={editUser.firstName}
                                onChange={(value) => {dispatch(setFirstName(value))}}
                                id={"firstName"}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.secondName}
                                value={editUser.secondName}
                                onChange={(value) => {dispatch(setSecondName(value))}}
                                id={"secondName"}
                                type={"text"}
                                required={true}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.middleName}
                                value={editUser.middleName}
                                onChange={(value) => {dispatch(setMiddleName(value))}}
                                id={"middleName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.birthDate}
                                value={editUser.birthDay}
                                onChange={(value) => {dispatch(setBirthDay(value))}}
                                id={"birthDate"}
                                type={"date"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <HorizontalDivider/>
                            <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.education}</Text>
                            <FormInput
                                labelText={lan.universityName}
                                value={editUser.universityName}
                                onChange={(value) => {dispatch(setUniversityName(value))}}
                                id={"universityName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.specialization}
                                value={editUser.specializationName}
                                onChange={(value) => {dispatch(setSpecializationName(value))}}
                                id={"specializationName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.admissionDate}
                                value={editUser.admissionDate}
                                onChange={(value) => {dispatch(setAdmissionDate(value))}}
                                id={"admissionDate"}
                                type={"date"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.graduationYear}
                                value={editUser.graduationYear}
                                onChange={(value) => {dispatch(setGraduationYear(value))}}
                                id={"graduationYear"}
                                type={"number"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.degreeAwarded}
                                value={editUser.degreeAwarded}
                                onChange={(value) => {dispatch(setDegreeAwarded(value))}}
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
                                onChange={(value) => {dispatch(setUniversityJobName(value))}}
                                id={"universityJobName"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.position}
                                value={editUser.position}
                                onChange={(value) => {dispatch(setPosition(value))}}
                                id={"position"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.degree}
                                value={editUser.degree}
                                onChange={(value) => {dispatch(setDegree(value))}}
                                id={"degree"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.rank}
                                value={editUser.rank}
                                onChange={(value) => {dispatch(setRank(value))}}
                                id={"rank"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <FormInput
                                labelText={lan.disciplineNames}
                                value={editUser.disciplineNames}
                                onChange={(value) => {dispatch(setDisciplineNames(value))}}
                                id={"disciplineNames"}
                                type={"text"}
                                required={false}
                                maxWidth={"100%"}
                            />
                            <Button >{lan.save}</Button>
                        </FormBlock>
                    </TabItem>
                    <TabItem item={1}>
                        2
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default Settings;