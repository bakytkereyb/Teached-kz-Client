import React, {useEffect, useState} from 'react';
import {lan} from "../../constants/lan";
import Text from "../UI/Text/Text";
import cl from "./Header.module.css"
import {clrs} from "../../constants/colors"
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import Logo from "../Logo/Logo";
import {ReactComponent as MenuIcon} from "../../images/hamburger.svg"
import {Drawer, Toolbar} from "@material-ui/core";


const Header = () => {

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    const displayDesktop = () => {
        return (
            <header className={cl.header}>
                <div className={cl.wrapper}>
                    <div className={cl.header__left}>
                        <Text style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>
                        <Text style={{color: clrs.blackBlue}}>{lan.team}</Text>
                        <Text style={{color: clrs.blackBlue}}>{lan.publications}</Text>
                        <Text style={{color: clrs.blackBlue}}>{lan.contacts}</Text>
                    </div>
                    <div className={cl.header__svg}>
                        <Logo/>
                    </div>
                    <div className={cl.header__right}>
                        <Text style={{color: clrs.blackBlue}}>email@email.com</Text>
                        <Select/>
                        <Button colorText={clrs.white} colorBack={clrs.red}>Log in</Button>
                    </div>
                </div>
            </header>
        );
    };
    const [showMenu, setShowMenu] = useState(false);
    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({...prevState, drawerOpen: true}));
        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false}));

        return (
            <header>
                <Toolbar className={cl.toolbar}>
                    <div style={{ position: 'relative' }}>
                        <MenuIcon onClick={() => setShowMenu(!showMenu)}>Dropdown</MenuIcon>
                        {showMenu && (
                            <ul style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100px',
                                backgroundColor: 'white',
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                            }}>
                                <li><a href="#">Menu Item 1</a></li>
                                <li><a href="#">Menu Item 2</a></li>
                                <li><a href="#">Menu Item 3</a></li>
                            </ul>
                        )}
                    </div>
                    <MenuIcon onClick={handleDrawerOpen}/>
                    <Logo/>
                    <Drawer
                        {...{
                            anchor: "left",
                            open: drawerOpen,
                            onClose: handleDrawerClose,
                        }}
                    >
                        <div style={{padding: "20px 30px",}}>
                            <Text>Dias</Text>
                            <Text>Dias</Text>
                            <Text>Dias</Text>
                        </div>
                    </Drawer>
                </Toolbar>
            </header>
        );
    };


    return (
        mobileView ? displayMobile() : displayDesktop()
        // <header className={cl.header}>
        //     {mobileView ? displayMobile() : displayDesktop()}
        //     {/*<div className={cl.wrapper}>*/}
        //     {/*    <div className={cl.menu__icon} onClick={handleShowNavbar}>*/}
        //     {/*        <Hamburger/>*/}
        //     {/*    </div>*/}
        //     {/*    <div className={cl.header__left}>*/}
        //     {/*        <Text style={{color: clrs.blackBlue}}>{lan.aboutUs}</Text>*/}
        //     {/*        <Text style={{color: clrs.blackBlue}}>{lan.team}</Text>*/}
        //     {/*        <Text style={{color: clrs.blackBlue}}>{lan.publications}</Text>*/}
        //     {/*        <Text style={{color: clrs.blackBlue}}>{lan.contacts}</Text>*/}
        //     {/*    </div>*/}
        //     {/*    <div className={cl.header__svg}>*/}
        //     {/*        <Logo/>*/}
        //     {/*    </div>*/}
        //     {/*    <div className={cl.header__right}>*/}
        //     {/*        <Text style={{color: clrs.blackBlue}}>email@email.com</Text>*/}
        //     {/*        <Select/>*/}
        //     {/*        <Button colorText={clrs.white} colorBack={clrs.red}>Log in</Button>*/}
        //     {/*    </div>*/}
        //     {/*</div>*/}
        // </header>
    );
};

export default Header;