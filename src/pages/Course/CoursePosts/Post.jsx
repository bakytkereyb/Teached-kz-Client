import React from 'react';
import cl from "./CoursePosts.module.css"
import naruto from "../../../images/naruto.jpg"
import Text from "../../../components/UI/Text/Text";
import PostFile from "./PostFile";

const Post = ({post}) => {
    return (
        <div className={cl.post}>
            <div className={cl.post_header}>
                <img src={naruto} alt=""/>
                <div style={{display: "flex", alignItems: "start", flexDirection: "column", justifyContent: 'center'}}>
                    <Text>Title of the post</Text>
                    <Text>by Utebayev Dias - Tuesday, 14 March 2023, 9:12 AM</Text>
                </div>
            </div>
            <div className={cl.post_body}>
                <Text>Dear 1st course of Master's students, the schedule for 3rd trimester is attached below:</Text>
                <div className={cl.post_body_files}>
                    <PostFile/>
                </div>
            </div>
            <div className={cl.post_footer}>
                <Text>0 replies</Text>
            </div>
        </div>
    );
};

export default Post;