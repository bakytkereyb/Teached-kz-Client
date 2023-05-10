import React, {useState} from 'react';
import classes from './Sidebar.module.css';
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import dashboard from '../../images/dashboard.svg';
import courses from '../../images/courses.svg';
import competence from '../../images/competence.svg'
import tasks from '../../images/tasks.svg'
import chats from '../../images/comment.svg'
import calendar from '../../images/calendar.svg'
import setting from '../../images/settings.svg'
import logout from '../../images/logout.svg'
import {lan} from "../../constants/lan";
import FormSelect from '../Form/FormSelect';

const Sidebar = ({isOpen}) => {
    const changeLang = (selectedLang) => {
        localStorage.setItem('lan', selectedLang.value);
        setSelectedLan(selectedLang)
        window.location.reload();
    }

    const [selectedLan, setSelectedLan] = useState({
        value: localStorage.getItem('lan'),
        label: localStorage.getItem('lan')
    });

    return (
        <div className={classes.sidebar} opened={isOpen ? "true" : "false"} >
            <Logo/>
            <br/>
            <SidebarItem to={"/my"} icon={dashboard} text={lan.dashboard}/>
            <SidebarItem to={"/competence-map"} icon={competence} text={lan.competenceMap}/>
            <SidebarItem to={"/courses/my"} icon={courses} text={lan.coursesMy}/>
            <SidebarItem to={"/courses"} icon={courses} text={lan.coursesAll}/>
            <SidebarItem icon={tasks} text={lan.tasks}/>
            <SidebarItem to={"/chats"} icon={chats} text={lan.chats}/>
            <SidebarItem to={"/calendar"} icon={calendar} text={lan.calendar}/>
            <SidebarItem icon={courses} text={lan.coursesPre}/>
            <SidebarItem to={"/settings"} icon={setting} text={lan.setting}/>
            <SidebarItem to={"/logout"} icon={logout} text={lan.logout}/>
            <br/>
            <FormSelect
                labelText={"Язык"}
                values={[
                    {
                        value: "ENG",
                        label: "ENG"
                    },
                    {
                        value: "РУС",
                        label: "РУС"
                    },
                    {
                        value: "ҚАЗ",
                        label: "ҚАЗ"
                    },
                ]}
                onChange={changeLang}
                id={"lan"}
                required={true}
                maxWidth={"200px"}
                selectedValue={selectedLan}
                withoutLabel={true}
            />
        </div>
    );
};

export default Sidebar;