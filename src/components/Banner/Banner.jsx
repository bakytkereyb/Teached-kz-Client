import React, {useEffect, useState} from 'react';
import classes from './Banner.module.css';
import banner1 from '../../images/bulletin-board-g5a8e9f182_1920.jpg';
import banner2 from '../../images/business-g1ec1364f9_1920.jpg';
import banner3 from '../../images/laptop-g9c9893bfd_1920.jpg';
import banner4 from '../../images/never-stop-learning-g09d1ec508_1920.jpg';
import BannerItem from "./BannerItem";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {lan} from "../../constants/lan";

const Banner = () => {

    const [bannerTexts, setBannerTexts] = useState([
        lan.banner1,
        lan.banner2,
        lan.banner3,
        lan.banner4,
    ]);

    const [bannerImages, setBannerImages] = useState([
        banner2, banner3, banner1, banner4
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