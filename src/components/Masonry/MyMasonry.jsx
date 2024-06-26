import React from 'react';
import Masonry from '@mui/lab/Masonry';
import cl from "./MyMasonry.module.css"
import useWindowSize from "../../hooks/useWindowSize";

const MyMasonry = ({children}) => {

    const { width, height } = useWindowSize()
    let size = width >= 1024 ? 2 : (width < 768 ? 1 : 1);
    return (
        <Masonry className={cl.masonry} columns={size} spacing={3}
            defaultColumns={2}
            defaultSpacing={3}
        >
            {React.Children.map(children, child => (
                <div>
                    {child}
                </div>
            ))}
        </Masonry>
    );
};

export default MyMasonry;