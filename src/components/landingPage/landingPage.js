import React from 'react';
import _ from 'lodash';
import { ReactComponent as BlueDots } from '../../assets/blue_dots.svg';
import Logo from '../../images/smallLogo.png';
import { ReactComponent as ActiveMenu } from '../../assets/activeMenu.svg';
import { ReactComponent as NonActiveMenu } from '../../assets/nonActiveMenu.svg';
import { ReactComponent as DownArrow } from '../../assets/downArrow.svg';
import { ReactComponent as Boston } from '../../assets/boston.svg';
import BostonPng from '../../images/boston.png';
import E from '../../images/eric/E.png';
import R from '../../images/eric/R.png';
import I from '../../images/eric/I.png';
import C from '../../images/eric/C.png';
import K from '../../images/eric/K.png';
import ILastname from '../../images/eric/I-lastname.png';
import M from '../../images/eric/M.png';
import './landingPage.css';

import { HashLink as Link } from 'react-router-hash-link';

const desc = `a web developer with an eye for design aiming to build tools that unlock a persons performance and productivity `;

function Menu(props) {
    const { className } = props;
    const menu = [
        { name: 'Work', to: '/#work' },
        { name: 'Projects', to: '/#projects' },
        { name: 'Contact', to: '/#contact' },
        { name: 'Resume', to: 'Eric_Kim_Resume.pdf' },
    ];
    return (
        <div className={className}>
            {menu.map((option) => {
                return (
                    <div>
                        {/* add conditonal based on active with "activemenu" */}
                        <ActiveMenu />
                        {/* <NonActiveMenu /> */}
                        <div className={'options'}>
                            {_.get(option, 'to') === 'Eric_Kim_Resume.pdf' ? (
                                <a className={'strikethrough'} href={option.to} target='_blank' download smooth>
                                    {option.name}
                                </a>
                            ) : (
                                <Link className={'strikethrough'} to={option.to} smooth>
                                    {option.name}
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function LandingPage(props) {
    const scroll = () => {
        return (
            <div className={'scrollContainer'}>
                <p className={'scroll pulse'}> Scroll down</p>
                <DownArrow className={'scroll pulse'} />
                <DownArrow className={'scroll pulse'} />
            </div>
        );
    };

    return (
        <div className={'landingBackground'}>
            <img src={Logo} alt={'small logo'} style={{ height: '85px', margin: '16px' }} />
            <div className={'landingText'}>
                <h1 className={'heading'}>{'Eric Kim'}</h1>
                <p className={'description'}>{desc}</p>
            </div>
            {scroll()}
            <Menu className={'menu'} />
            <div>
                <div className={'firstName'}>
                    <img src={E} alt={'E'} className={'e-eric'} />
                    <img src={R} alt={'R'} className={'r-eric'} />
                    <img src={I} alt={'I'} className={'i-eric'} />
                    <img src={C} alt={'C'} className={'c-eric'} />
                </div>
                <div className={'lastName'}>
                    <img src={K} alt={'K'} className={'k-kim'} />
                    <img src={ILastname} alt={'I last name'} className={'i-kim'} />
                    <img src={M} alt={'M'} className={'m-kim'} />
                </div>
                <BlueDots className={'blueDots'} />
                <img className={'boston'} src={BostonPng} alt={'boston'} />
                {/* <Boston className={'boston'} /> */}
                <div className={'blueOverlay'}></div>
            </div>
            <div className={'blackSection'}></div>
        </div>
    );
}

export default LandingPage;
