import React from 'react';
import {getVerify} from '../../services';
// const qs = require('query-string');

import * as qs from 'query-string';

import {
    Card,
    CardBody,
    CardImg,
    CardFooter,
    CardTitle,
    CardSubtitle,
    NavLink,
} from 'reactstrap';

import IndexNavbar from 'views/Landing/IndexNavbar.jsx';

import {Link} from 'react-router-dom';

function Verify() {
    let parsedID = window.document.URL.toString().split('?')[1].substring(3);
    getVerify(parsedID).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err);
    })


    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <div className="page-header">   
                    <section className="section section-md" style={{margin: '60px 100px'}}>
                        <Card>
                            
                            <CardBody style={{textAlign: 'center', paddingTop: 30}}>
                                <CardTitle>
                                    <h1>Congratulations! You are now verified.</h1>
                                </CardTitle>
                                <CardSubtitle style={{marginTop: 40, marginBottom: 0, fontWeight: 300}}>
                                    <h3>Welcome to a world full of opportunities.</h3>
                                    <h3>Please <NavLink style={{display: 'inline', padding: 0, fontWeight: 700, color: 'white'}} tag={Link} to="/login-page">login</NavLink> to continue.</h3>
                                </CardSubtitle>
                            </CardBody>
                            <CardFooter>
                                <CardImg
                                alt="..."
                                src={require('assets/img/stairs.jpg')}
                                />
                            </CardFooter>
                        </Card>
                    </section>
                </div>
            </div>)
        </>)
} 

export default Verify;