//import { Routes, Route, Link } from 'react-router-dom';
import React from "react";
import {Link } from 'react-router-dom';
//
function Page() {
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">&nbsp; [ about ]</Link>
        <Link to="/task_project">&nbsp; [ TaskProject ]</Link>
        <hr />
    </div>
    );
}
export default Page;
/*
<Link to="/todo14">&nbsp; [ todo14 ]</Link>
<Link to="/todo15">&nbsp; [ todo15 ]</Link>
*/