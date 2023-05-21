import React from 'react';
import classes from './Card.module.css';

const Card = ({type}) => {

    if (type === "calendar") {
        return (
            <div className={classes.loader}>
                <div className={classes.wrapper}>
                    <div className={classes.line3}></div>
                    <div className={classes.line1}></div>
                </div>
            </div>
        );
    }

    if (type === "horizontal-small") {
        return (
            <div className={classes.loader} style={{width: "calc(100% - 30px)"}}>
                <div className={classes.wrapper} style={{flexDirection: "row", alignItems:"center", gap: "30px"}}>
                    <div className={classes.line1} style={{height: "75px"}}></div>
                </div>
            </div>
        );
    }

    if (type === "horizontal") {
        return (
            <div className={classes.loader} style={{width: "calc(100% - 30px)"}}>
                <div className={classes.wrapper} style={{flexDirection: "row", alignItems:"center", gap: "30px"}}>
                    <div className={classes.line1} style={{height: "300px"}}></div>
                </div>
            </div>
        );
    }

    if (type === "horizontal-big") {
        return (
            <div className={classes.loader} style={{width: "calc(100% - 30px)", height: "600px"}}>
                <div className={classes.wrapper} style={{flexDirection: "row", alignItems:"center", gap: "30px"}}>
                    <div className={classes.line1} style={{height: "600px"}}></div>
                </div>
            </div>
        );
    }

    if (type === "horizontal-circle") {
        return (
            <div className={classes.loader} style={{height: "350px", width: "calc(100% - 30px)"}}>
                <div className={classes.wrapper} style={{flexDirection: "row", alignItems:"center", gap: "30px"}}>
                    <div className={classes.circle}></div>
                    <div className={classes.wrapper}
                         style={{backgroundColor: "transparent", alignItems:"center", justifyContent: "center", width: "calc(100% - 300px)"}}>
                        <div className={classes.line3}></div>
                        <div className={classes.line1}></div>
                    </div>
                </div>
            </div>
        );
    }


    if (type === "big-card") {
        return (
            <div className={classes.loader} style={{height: "200px"}}>
                <div className={classes.wrapper}>
                    <div className={classes.line3}></div>
                    <div className={classes.line3}></div>
                    <div className={classes.line3}></div>
                    <br/>
                    <div className={classes.line3}></div>
                    <div className={classes.line3}></div>
                    <br/>
                    <div className={classes.line3}></div>
                </div>
            </div>
        );
    }

    if (type === "big-card-2") {
        return (
            <div className={classes.loader} style={{height: "300px"}}>
                <div className={classes.wrapper}>
                    <div className={classes.line3}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.loader}>
            <div className={classes.wrapper}>
                <div className={classes.line3}></div>
                <div className={classes.line3}></div>
                <div className={classes.line3}></div>
            </div>
        </div>
    );
};

export default Card;