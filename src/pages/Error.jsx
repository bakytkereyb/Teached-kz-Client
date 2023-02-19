import React from 'react';
import {Button, Result} from "antd";

const Error = () => {
    return (
        <Result
            status="error"
            title="Error"
            subTitle="Sorry, there is some problem."
            extra={<Button type="primary">Back Home</Button>}
        />
    );
};

export default Error;