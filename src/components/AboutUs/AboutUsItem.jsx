import React from 'react';
import cl from './AboutUsItem.module.css'
import naruto from '../../images/naruto.jpg'
const AboutUsItem = ({image, text}) => {
    return (
        <div className={cl.item}>
            <div className={cl.image}>
                <img src={naruto} alt=""/>
            </div>
            <span>Nemo enim ipsam voluptatem quia voluptas sit</span>
        </div>
    );
};

export default AboutUsItem;