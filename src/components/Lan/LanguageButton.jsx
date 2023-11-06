import React, {useState} from 'react';
import {CommentOutlined, CustomerServiceOutlined} from "@ant-design/icons";
import {FloatButton} from "antd";
import classes from './lan.module.css';
import eng_flag from '../../images/eng_flag_icon.png';
import ru_flag from '../../images/ru_flag_icon.png';
import kz_flag from '../../images/kaz_glag_icon.png';

const LanguageButton = () => {
    const [selectedLan, setSelectedLan] = useState({
        value: localStorage.getItem('lan'),
        label: localStorage.getItem('lan')
    });

    const eng = {
        value: "ENG",
        label: "ENG"
    }

    const kz = {
        value: "ҚАЗ",
        label: "ҚАЗ"
    }

    const ru = {
        value: "РУС",
        label: "РУС"
    }

    const changeLang = (selectedLang) => {
        localStorage.setItem('lan', selectedLang.value);
        setSelectedLan(selectedLang)
        window.location.reload();
    }

    const selectedIconLan = selectedLan.value === 'ENG' ? <FlagIcon icon={eng_flag}/> : selectedLan.value === 'РУС' ? <FlagIcon icon={ru_flag}/> : selectedLan.value === 'ҚАЗ' ? <FlagIcon icon={kz_flag}/> : <FlagIcon icon={eng_flag}/>

    return (
        <FloatButton.Group
            trigger="click"
            style={{
                right: 24,
            }}
            icon={selectedIconLan}
        >
            <FloatButton onClick={() => {changeLang(eng)}} icon={<FlagIcon icon={eng_flag}/>}/>
            <FloatButton onClick={() => {changeLang(ru)}} icon={<FlagIcon icon={ru_flag}/>}/>
            <FloatButton onClick={() => {changeLang(kz)}} icon={<FlagIcon icon={kz_flag}/>}/>
        </FloatButton.Group>
    );
};

export default LanguageButton;

const FlagIcon = ({icon}) => {
    return (
        <div className={classes.iconFlagBlock}>
            <img src={icon} alt=""/>
        </div>
    );
};