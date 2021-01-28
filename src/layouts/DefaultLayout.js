import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutDefault = ({children}) => (
    <>
        <Header navPosition="right" className="reveal-from-bottom"/>
        <main className="site-content">
            {children}
        </main>
        <Footer/>
    </>
);

export default LayoutDefault;