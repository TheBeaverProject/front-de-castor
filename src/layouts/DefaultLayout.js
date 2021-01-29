import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutDefault = ({children}) => (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
        <div style={{flex: 1}}>
            <Header navPosition="right" className="reveal-from-bottom"/>
            {children}
        </div>
        <Footer/>
    </div>
);

export default LayoutDefault;