import { classes } from '@/utils'
import { PrismicLink, PrismicText } from '@prismicio/react'
import Link from 'next/link'
import { NavigiationItemSlice } from '../../../../prismicio-types'
import styles from './navSectionHeading.module.scss'

type NavSectionHeadingProps = {
    slice: NavigiationItemSlice
}


function NavSectionHeading({ slice }: NavSectionHeadingProps) {
    return (
        <PrismicLink
            className={styles.headerContainer}
            field={slice.primary.link}
            externalComponent={(props) => <div className={'external'} {...props} />}
        >
            <p className={classes('p5', 'lowercase', styles.headingStyle)}>
                <PrismicText field={slice.primary.name} />
            </p>
        </PrismicLink>
    )
}

export default NavSectionHeading
