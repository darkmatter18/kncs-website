import React from "react";
import './css/style.css';
import * as Background from './img/text.png'
import {Link} from "react-router-dom";
import {ADMISSION_NEW} from "../RouterComponent/routes";
import Footer from "../../lib/Footer";


const Page404Component = () => {
    return (
        <React.Fragment>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1 style={{backgroundImage: `url(${Background})`,   backgroundPosition: 'center'}}>404</h1>
                    </div>
                    <h2>Oops! This Page Could Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is
                        temporarily unavailable</p>
                    <Link to={ADMISSION_NEW}>
                        Go to Home Page
                    </Link>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Page404Component
