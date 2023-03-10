import React from 'react';
import cl from "./CoursePosts.module.css"
const Post = () => {
    return (
        <div className={cl.post}>
            <div>Header</div>
            <div>Content</div>
            <div>Footer</div>
        </div>
    );
};

export default Post;