import React, { useEffect, useState } from 'react';
import './workPage.css';
import _ from 'lodash';
import { Route, Link } from 'react-router-dom';

import W from '../../images/work/W.png';
import O from '../../images/work/O.png';
import R from '../../images/work/R.png';
import K from '../../images/work/K-work.png';
import Dash from '../../images/work/dash.png';
import { ReactComponent as ActiveWork } from '../../assets/activeWork.svg';
import { ReactComponent as DisabledWork } from '../../assets/disabledWork.svg';
import { ReactComponent as ButtonUnderline } from '../../assets/viewCaseUnderline.svg';
import Whoop from '../../images/whoop.png';
import Avigilon from '../../images/avigilon.png';
import Fisherman from '../../images/fisherman.png';
// import ActiveWork from '../../images/activeWork.png'
// import DisabledWork from '../../images/disabledWork.png'

function Work(props) {
    const { className } = props;
    return (
        <div className={className}>
            {/* <div className={'woCol'}>
                <img src={W} alt={'W'} style={{width: '80px'}} className={'workLetterCol'} />
                <img src={O} alt={'O'} style={{width: '65px'}} className={'workLetterCol'} />
            </div>
            <div className={'woRow'}>
                <img src={Dash} alt={'dash'} style={{width: '60px'}} className={'workLetterRow'} />
                <img src={R} alt={'R'} style={{width: '60px'}} className={'workLetterRow'} />
                <img src={K} alt={'K'} style={{width: '65px'}} className={'workLetterRow'} />
            </div> */}

            <img src={W} alt={'W'} style={{ width: '85px' }} className={'w'} />
            <img src={O} alt={'O'} style={{ width: '65px' }} className={'o'} />
            <img src={Dash} alt={'dash'} style={{ width: '60px' }} className={'dash'} />
            <img src={R} alt={'R'} style={{ width: '60px' }} className={'r'} />
            <img src={K} alt={'K'} style={{ width: '65px' }} className={'k'} />
        </div>
    );
}

function WorkCarousel(props) {
    const [workNum, setWorkNum] = useState(0);

    useEffect(() => {
        let scrollInterval = setTimeout(() => {
            if (workNum === works.length - 1) {
                setWorkNum(0);
            } else {
                setWorkNum(workNum + 1);
            }
        }, 4000);
        return () => clearTimeout(scrollInterval);
    });

    const works = [
        {
            num: '01',
            name: 'Whoop',
            position: 'Software Engineer/ UI & UX Designer',
            image: Whoop,
            tags: ['dev', 'UX / UI'],
            link: 'https://medium.com/@ericykim/overhauling-the-internal-tools-dashboard-d8403141b84f',
        },
        {
            num: '02',
            name: 'Avigilon',
            position: 'Software Engineer/ QA Engineer',
            image: Avigilon,
            tags: ['dev'],
            link: '/avigilon',
        },
        {
            num: '03',
            name: 'Fisherman',
            position: 'UI & UX Designer',
            image: Fisherman,
            tags: ['UX / UI'],
            link: 'https://medium.com/@ericykim/designing-a-customer-dashboard-be59b61dcac2',
        },
    ];

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
            <div className={'workCardTags'}>
                {_.map(tags, function (tag) {
                    return (
                        <div className={'workTag'}>
                            <span className={`dot`} style={{ backgroundColor: `${getColor(tag)}` }} />
                            <span className={'workTagName'}>{tag}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const changeWork = (pos) => {
        if (pos === 'add') {
            console.log(works.length);
            if (workNum >= works.length - 1) {
                setWorkNum(workNum);
            } else {
                setWorkNum(workNum + 1);
            }
        } else if (pos === 'sub') {
            if (workNum === 0) {
                setWorkNum(workNum);
            } else {
                setWorkNum(workNum - 1);
            }
        }
    };

    const work = works[workNum];
    return (
        <div className={'workContainer'}>
            <div className={'workCarousel'}>
                <div className={'imageOverlay'}>
                    <div className={'workNumber'}>{work.num}</div>
                    {projectTags(work.tags)}
                    <img src={work.image} alt={'whoop'} className={'workImage'} style={{ width: '50vw' }} />
                    <div className={'workDescription'}>
                        <div className={'workPosition'}>{work.position}</div>
                        <div className={'workName'}>{work.name}</div>

                        <a
                            target='_blank'
                            href={work.link}
                            style={{
                                color: 'white',
                                display: 'flex',
                                width: 'fit-content',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                            className={'workViewButton'}>
                            {'View Cases'}
                            <ButtonUnderline className={'workButtonUnderline'} />
                        </a>

                        {works.map((value, index) => {
                            if (workNum === index) {
                                return (
                                    <div onClick={() => setWorkNum(index)} className={'workStatus'}>
                                        <p className={'workTooltip'}>{works[index].name}</p>
                                        <ActiveWork style={{ width: '100%' }} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div onClick={() => setWorkNum(index)} className={'workStatus'}>
                                        <p className={'workTooltip'}>{works[index].name}</p>
                                        <DisabledWork style={{ width: '100%' }} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function WorkPage(props) {
    return (
        <div id='work' className={'workBackground'}>
            <Work className={'work'} />
            <WorkCarousel />
        </div>
    );
}

export default WorkPage;
