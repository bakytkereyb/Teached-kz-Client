import React from 'react';
import naruto from "../../../images/naruto.jpg";
import Text from "../../../components/UI/Text/Text";

const PostFile = ({file}) => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: 'flex-start', gap: '10px'}}>
            <img src={naruto} alt="" style={{width: '40px'}}/>
            <Text>SCHEDULE_Masters_1 course.pdf</Text>
        </div>
    );
};

export default PostFile;