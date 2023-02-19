import React, {useState} from 'react';
import "./Sidebar.css";
import logo from "../../images/logo_TeachEd_1.svg"
import {FaEnvelope, FaHome, FaInfoCircle} from 'react-icons/fa';
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";
import FormSelect from "../Form/FormSelect";
import Button from "../UI/Button/Button";

function Sidebar({isOpen, toggle}) {
    const [selectedLan, setSelectedLan] = useState('ENG');
    return (
        <div className={`sidebar${isOpen ? ' show' : ''}`}>
            <button className="toggle-button" onClick={toggle}>
                <span className="sr-only">Toggle Sidebar</span>
                ☰
            </button>
            <div className={`sidebar-logo${isOpen ? '' : ' closed'}`}>
                <Logo/>
            </div>
            <ul className={`nav${isOpen ? '' : ' closed'}`}>
                <li>
                    <Link to="/">
                        <FaHome />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <FaInfoCircle />
                        <span>About</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <FaEnvelope />
                        <span>Contact</span>
                    </Link>
                </li>
            </ul>
            <div className={`sidebar-footer${isOpen ? '' : ' closed'}`}>
                <FormSelect
                    labelText={"Язык"}
                    values={["ENG","РУС","ҚАЗ"]}
                    onChange={setSelectedLan}
                    id={"lan"}
                    required={true}
                    maxWidth={"120px"}
                    selectedValue={selectedLan}
                    withoutLabel={true}
                />
                <Button onClick={() => {window.location.assign("/login")}}>Log in</Button>
            </div>
        </div>
    );
}

export default Sidebar;