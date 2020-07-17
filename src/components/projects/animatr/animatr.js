import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './animatr.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Animatr(props) {
    return (
        <div className='comingSoon'>
            {'coming soon'}
            <div className='subText'>{'but in the meantime, feel free to reach out!'}</div>
        </div>
    );
}

export default Animatr;
