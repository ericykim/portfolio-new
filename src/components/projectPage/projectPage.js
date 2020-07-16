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
        tags: ['dev', 'UX / UI'],
    },
    {
        num: '02',
        name: 'Postcard',
        desc:
            'An Airbnb hackathon mobile app used to create and share pictures and memories from tips and adventures. ',
        position: 'UI & UX Designer',
        image: PostcardImg,
        tags: ['UX / UI'],
    },
    {
        num: '03',
        name: 'Split',
        desc:
            'A bill splitting app that easily helps you settle the bill and request money from friends based on what they ate ',
        position: 'UI & UX Designer',
        image: SplitImg,
        tags: ['UX / UI'],
    },
    {
        num: '04',
        name: 'Animatr',
        desc: 'A Java application that helps users create simple but effective 2D animations from shapes and export them as svgs',
        position: 'Software Engineer/ UI & UX Designer',
        image: AnimatrImg,
        tags: ['dev'],
        link: '/animatr',
    },
    {
        num: '05',
        name: 'Quiktix',
        desc: 'A Java application that mimics aspects of Fandango with a mock SQL database. ',
        position: 'Software Engineer/ QA Engineer',
        image: QuiktixImg,
        tags: ['dev'],
    },
    {
        num: '06',
        name: 'Design Book',
        desc: 'Description about what you do idk something about the project make a good summary. ',
        position: 'UI & UX Designer',
        image: DesignbookImg,
        tags: ['design'],
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
                return '#0E88DE';
            }
            case 'photography': {
                return 'green';
            }
            case 'design': {
                return 'white';
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
                    <Link to={`${project.link}`} style={{ textDecoration: 'none' }}>
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
                                    <button className={'projectCardCaseButton'}>
                                        {'View Cases'}
                                        <ButtonUnderline className={'projectCardCaseButtonUnderline'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
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
