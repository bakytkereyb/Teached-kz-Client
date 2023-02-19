import React, {useState} from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './App.css'

const MainContentPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    console.log(isSidebarOpen)

    return (
        <div className="container">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar}/>
            <div className={`main-content ${isSidebarOpen ? 'main-content--shifted' : ''}`}>
                <h1>Home Page</h1>
                <p>This is the home page content.</p>
                {
                    // indicates very long content
                    Array.from(
                        {
                            length: 100,
                        },
                        (_, index) => (
                            <React.Fragment key={index}>
                                {index % 20 === 0 && index ? 'more' : '...'}
                                <br />
                            </React.Fragment>
                        ),
                    )
                }
            </div>
        </div>
    );
};

export default MainContentPage;