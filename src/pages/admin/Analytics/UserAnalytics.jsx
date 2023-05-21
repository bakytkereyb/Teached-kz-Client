import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import {clrs} from '../../../constants/colors';
import HeaderPlatform from '../../../components/HeaderPlatform/HeaderPlatform';
import Block from '../../../components/UI/Block/Block';
import Card from '../../../components/LoadingComponents/Card';
import {useSelector} from 'react-redux';
import FlexBlock from '../../../components/UI/FlexBlock/FlexBlock';
import {lan} from '../../../constants/lan';
import Text from '../../../components/UI/Text/Text';
import classes from './analytics.module.css';

const UserAnalytics = () => {

    const {analytics, isLoading} = useSelector(state => state.analytics.users);

    const config = {
        options: {
            labels: [lan.admins, lan.trainers, lan.users],
        },

        series: [analytics?.admins, analytics?.trainers, analytics?.users],
    };


    if (isLoading) {
        return (
            <Card type={"horizontal-big"}/>
        );
    }

    return (
        <FlexBlock style={{flexDirection: "column", alignItems: "flex-start"}}>
            <Text default>{lan.totalNumberOfUsers} : {analytics?.total}</Text>
            <FlexBlock>
                <Chart
                    options={config.options}
                    series={config.series}
                    type="pie"
                    className={classes.myPie}
                />
            </FlexBlock>

        </FlexBlock>
    );
};

export default UserAnalytics;