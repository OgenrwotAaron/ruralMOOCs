import React from 'react';

import Header from '../components/Header/header'
import Footer from '../components/Footer/footer';

const Layout = (props) => {
    return (
        <div className="start">
            <Header/>
            <div>
                {props.children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;