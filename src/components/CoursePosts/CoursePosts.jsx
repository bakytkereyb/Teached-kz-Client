import React from 'react';
import Post from "./Post";
import cl from "./CoursePosts.module.css"

const CoursePosts = () => {
    return (
        <div className={cl.posts}>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
};

export default CoursePosts;