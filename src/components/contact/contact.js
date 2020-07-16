import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './contact.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Animatr(props) {
    return (
        <div id='contact' className='contact'>
            <div className={'contactTitle'}>{'Contact'}</div>
            <div className={'contactDesc'}>
                <div className={'contactFieldTitle'}>
                    <span className={'contactField'}>Email: </span>
                    <a
                        style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                        href='mailto:me@erickim.io'>
                        me@erickim.io
                    </a>
                </div>
                <div className={'contactFieldTitle'}>
                    <span className={'contactField'}>LinkedIn: </span>
                    <a
                        style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                        target='_blank'
                        href='https://www.linkedin.com/in/erickimdev/'>
                        erickimdev
                    </a>
                </div>
                <div className={'contactFieldTitle'}>
                    <span className={'contactField'}>Github: </span>
                    <a
                        style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                        target='_blank'
                        href='https://github.com/ericykim'>
                        ericykim
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Animatr;
