import React, {useEffect, useState} from 'react';
import classes from './Banner.module.css';
import banner1 from '../../images/backBannerTmp.jpg';
import BannerItem from "./BannerItem";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {

    const [bannerTexts, setBannerTexts] = useState([
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus animi, blanditiis consequatur dolorem, ea eligendi fuga ipsa maiores",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus animi, blanditiis consequatur ",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus animi, blanditiis consequatur dolorem, ea",
    ]);

    const [bannerImages, setBannerImages] = useState([
        banner1, banner1, banner1, banner1
    ])

    return (
        <Carousel
                  infiniteLoop={true}
                  interval={5000}
                  showArrows={true}
                  showIndicators={false}
                  showStatus={false}
                  showThumbs={false}
                  autoPlay={true}
                  stopOnHover={false}
                  swipeable={false}
                  className={classes.banner}>
            <BannerItem image={bannerImages[0]}>
                {bannerTexts[0]}
            </BannerItem>
            <BannerItem image={bannerImages[1]}>
                {bannerTexts[1]}
            </BannerItem>
            <BannerItem image={bannerImages[2]}>
                {bannerTexts[2]}
            </BannerItem>
            <BannerItem image={bannerImages[3]}>
                {bannerTexts[3]}
            </BannerItem>
        </Carousel>
    );
};

export default Banner;