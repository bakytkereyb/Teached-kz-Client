import React from 'react';
import classes from './Banner.module.css';

const BannerItem = ({image, children}) => {
    return (
        <div className={classes.bannerItem} style={{backgroundImage: `url(${image})`}}>
            <p>{children}</p>
        </div>
    );
};

export default BannerItem;