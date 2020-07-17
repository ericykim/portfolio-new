import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './projectPage.css';
import { Route, Link } from 'react-router-dom';

import P from '../../images/projects/p.png';
import R from '../../images/projects/r.png';
import O from '../../images/projects/o.png';
import J from '../../images/projects/j.png';
import E from '../../images/projects/e.png';
import C from '../../images/projects/c.png';
import T from '../../images/projects/t.png';
import S from '../../images/projects/s.png';
import Dash from '../../images/projects/dash.png';
import RedBackground from '../../images/redBackground.png';
import { ReactComponent as ButtonUnderline } from '../../assets/viewCaseUnderline-red.svg';

import Whoop from '../../images/whoop.png';
import Avigilon from '../../images/avigilon.png';
import Fisherman from '../../images/fisherman.png';
import AnimatrImg from '../../images/projectImages/hanoi.png';
import QuiktixImg from '../../images/projectImages/quixtix.png';
import PrioritiImg from '../../images/projectImages/prioriti.png';
import PostcardImg from '../../images/projectImages/postcard.png';
import SplitImg from '../../images/projectImages/split.png';
import DesignbookImg from '../../images/projectImages/designbook.png';

import Animatr from '../../components/projects/animatr/animatr';

function Projects(props) {
    const { className } = props;
    return (
        <div className={className}>
            <img src={P} alt={'P'} style={{ width: '20px' }} className={'p'} />
            <img src={R} alt={'R'} style={{ width: '20px' }} className={'r'} />
            <img src={O} alt={'O'} style={{ width: '20px' }} className={'o'} />
            <img src={Dash} alt={'dash'} style={{ width: '20px' }} className={'dash'} />
            <img src={J} alt={'J'} style={{ width: '20px' }} className={'j'} />
            <img src={E} alt={'E'} style={{ width: '20px' }} className={'e'} />
            <img src={C} alt={'C'} style={{ width: '20px' }} className={'c'} />
            <img src={T} alt={'T'} style={{ width: '20px' }} className={'t'} />
            <img src={S} alt={'S'} style={{ width: '20px' }} className={'s'} />
            {/* <img src={P} alt={'P'} className={'p'} />
            <img src={R} alt={'R'} className={'r'} />
            <img src={O} alt={'O'} className={'o'} />
            <img src={Dash} alt={'dash'} className={'dash'} />
            <img src={J} alt={'J'} className={'j'} />
            <img src={E} alt={'E'} className={'e'} />
            <img src={C} alt={'C'} className={'c'} />
            <img src={T} alt={'T'} className={'t'} />
            <img src={S} alt={'S'} className={'s'} /> */}
        </div>
    );
}

const projects = [
    {
        num: '01',
        name: 'Prioriti',
        desc:
            'An iOS app created for students to help them prioritize their school work allowing them to accomplish all of their goals. ',
        position: 'UI & UX Designer',
        image: PrioritiImg,
        tags: ['dev', 'UX / UI', 'Mobile'],
        link: 'https://github.com/ericykim/Prioriti',
    },
    {
        num: '02',
        name: 'Postcard',
        desc:
            'An Airbnb hackathon mobile app used to create and share pictures and memories from tips and adventures. ',
        position: 'UI & UX Designer',
        image: PostcardImg,
        tags: ['UX / UI', 'Mobile'],
        link: 'https://xd.adobe.com/view/341ee82a-4a7c-46a8-8fda-868ea1d5e0f6-614d/?fullscreen'
    },
    {
        num: '03',
        name: 'Split',
        desc:
            'A bill splitting app that easily helps you settle the bill and request money from friends based on what they ate ',
        position: 'UI & UX Designer',
        image: SplitImg,
        tags: ['UX / UI', 'Web'],
        link: 'https://drive.google.com/file/d/1grc9_GtOAKcR5gIcBDWXnFlLPrqb1OHi/view?usp=sharing',
    },
    {
        num: '04',
        name: 'Animatr',
        desc:
            'A Java application that helps users create simple but effective 2D animations from shapes and export them as svgs',
        position: 'Software Engineer/ UI & UX Designer',
        image: AnimatrImg,
        tags: ['dev'],
        link: 'https://github.com/ericykim/Animator',
    },
    {
        num: '05',
        name: 'Qwiktix',
        desc: 'A Java application that mimics aspects of Fandango with a mock SQL database. ',
        position: 'Software Engineer/ QA Engineer',
        image: QuiktixImg,
        tags: ['dev'],
        link: 'https://github.com/ericykim/QwikTix',
    },
    {
        num: '06',
        name: 'Design Book',
        desc: 'A brochure to showcase the different arts that Northeastern offers.',
        position: 'UI & UX Designer',
        image: DesignbookImg,
        tags: ['design'],
        link: '/animatr'
    },
];

const projectTypes = [];

function ProjectList(props) {
    const [hoverCard, setHoverCard] = useState('');

    const getColor = (tag) => {
        switch (tag) {
            case 'dev': {
                return '#E13328';
            }
            case 'UX / UI': {
                return '#D2E128';
            }
            case 'photography': {
                return 'green';
            }
            case 'design': {
                return '#FFCAB1';
            }
            case 'Mobile': {
                return '#E128C4';
            }
            case 'Web': {
                return '#0E88DE';
            }
        }
    };

    const projectTags = (tags) => {
        return (
            <div className={'projectCardTags'}>
                {_.map(tags, function (tag) {
                    return (
                        <div className={'tag'}>
                            <span className={`dot`} style={{ backgroundColor: `${getColor(tag)}` }} />
                            <span className={'tagName'}>{tag}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const setHoverState = (num) => {
        console.log('set num', num);
        setHoverCard(num);
    };

    const removeHoverState = () => {
        setHoverCard('');
    };

    return (
        <div className={'projectCardContainer'}>
            {_.map(projects, function (project) {
                // let hover = _.isEqual('01', project.num);
                let hover = _.isEqual(hoverCard, project.num);
                return (
                    <a target='_blank' href={project.link} style={{ textDecoration: 'none' }}>
                        <div
                            className={hover ? 'projectCardHover' : 'projectCard'}
                            onMouseEnter={() => setHoverState(project.num)}
                            onMouseLeave={() => removeHoverState()}>
                            {hover ? <div className={'projectCardNumber'}>{project.num}</div> : <></>}
                            <div className={'projectCardBackground'}>
                                {hover ? <div className={'projectCardHoverBackground'}></div> : <></>}
                                <img
                                    src={project.image}
                                    alt={'project img'}
                                    className={hover ? 'projectCardImageHover' : 'projectCardImage'}
                                />
                                <div className={hover ? 'projectHoverTest' : null}>
                                    <div className={'projectCardTitle'}> {project.name}</div>
                                    <div className={'projectCardDesc'}>{project.desc}</div>
                                    {projectTags(project.tags)}
                                    {/* <button className={'projectCardCaseButton'}>
                                        {'View Cases'}
                                        <ButtonUnderline className={'projectCardCaseButtonUnderline'} />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

function ProjectPage(props) {
    return (
        <div id='projects' className={'landingBackgroundProject'}>
            <Projects className={'projects'} />
            <ProjectList />
        </div>
    );
}

export default ProjectPage;
