import React, {useEffect} from 'react';
import {clrs} from "../../constants/colors";
import Block from "../../components/UI/Block/Block";
import {useDispatch, useSelector} from "react-redux";
import HeaderPlatform from "../../components/HeaderPlatform/HeaderPlatform";
import Card from "../../components/LoadingComponents/Card";
import style from "./ProfilePage.module.css"
import naruto from "../../images/tm6.jpg";
import Text from "../../components/UI/Text/Text";
import BigText from "../../components/UI/BigText/BigText";
import {lan} from "../../constants/lan";
import {useNavigate, useParams} from "react-router-dom";
import {getUserByUsername} from "../../store/slices/publicUserSlice";
import Button from "../../components/UI/Button/Button";
import FlexBlock from "../../components/UI/FlexBlock/FlexBlock";
import {API_BASE_URL} from "../../constants/api";

const ProfilePage = () => {
    const {user, isLoading} = useSelector(state => state.publicUser);
    const {username} = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserByUsername(username))
    }, [username])

    if (isLoading) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                    <Card type={"horizontal-circle"}/>
                    <Card type={"horizontal-small"}/>
                    <Card type={"horizontal"}/>
                </Block>
            </div>
        );
    }

    if (user === null) {
        return (
            <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
                <HeaderPlatform/>
                <Block style={{marginTop: "50px"}}>
                        <BigText>
                            {lan.userNotFound}
                        </BigText>
                </Block>
            </div>
        );
    }

    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>                <div className={`${style.info} ${style.generalInfo}`}>
                    <img src={`${API_BASE_URL}/api/file/get/${user?.imageFileName}`} alt=""/>
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <Text style={{fontSize: '1.1rem', textTransform: 'capitalize'}}>
                            {user.firstName} {user.secondName} {user.middleName}
                        </Text>
                        <Text style={{fontSize: '1rem', fontWeight: 400}}>
                            {lan.email}: {user.email}
                        </Text>
                        <Text style={{fontSize: '1rem', fontWeight: 400}}>
                            {lan.birthDate}: {new Date(user.birthDay).toLocaleDateString()}
                        </Text>
                        <Text style={{fontSize: '1rem', fontWeight: 400}}>
                            {lan.telNumber}: {user?.telNumber}
                        </Text>
                    </div>
                </div>
                <FlexBlock style={{
                    backgroundColor: clrs.white,
                    borderRadius: "15px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                    justifyContent: "flex-start"
                }}>
                    <Button onClick={() => {window.open(`/competence-map/${user.id}`, "_blank")}}>{lan.competenceBank}</Button>
                </FlexBlock>
                <div className={ `${style.info} ${style.education}`}>
                    <BigText style={{fontSize: '1.2rem'}}>{lan.education}</BigText>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.university}: {user.universityName}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.specialization}: {user.specializationName}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.admissionDate}: {new Date(user.admissionDate).toLocaleDateString()}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.graduationYear}: {user.graduationYear}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.degreeAwarded}: {user.degreeAwarded}
                    </Text>
                </div>
                <div className={ `${style.info} ${style.workInfo}`}>
                    <BigText style={{fontSize: '1.2rem'}}>{lan.jobInformation}</BigText>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.university}: {user.universityJobName}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.position}: {user.position}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.degree}: {user.degree}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.rank}: {user.rank}
                    </Text>
                    <Text style={{fontSize: '1rem', fontWeight: 400}}>
                        {lan.disciplineNames}: {user.disciplineNames}
                    </Text>
                </div>
            </Block>
        </div>
    );
};

export default ProfilePage;