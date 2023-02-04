import React from 'react';
import {Link} from "react-router-dom";
import classes from "./MyNavbar.module.css"

const MyNavbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.navbarLinks}>
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default MyNavbar;