import { classes } from '@/utils'
import { PrismicLink, PrismicText } from '@prismicio/react'
import Link from 'next/link'
import { NavigiationItemSlice } from '../../../../prismicio-types'
import styles from './navSectionHeading.module.scss'
import * as prismicHelpers from '@prismicio/helpers'

type NavSectionHeadingProps = {
    slice: NavigiationItemSlice
}

function NavSectionHeading({ slice }: NavSectionHeadingProps) {
    if (!prismicHelpers.asText(slice.primary.name)) {
        return <></>
    }

    return (
        <PrismicLink
            field={slice.primary.link}
            externalComponent={(props) => (
                <a className={classes('external', styles.headerContainer)} {...props} />
            )}
        >
            <p className={classes('p5', 'lowercase', styles.headingStyle)}>
                <PrismicText field={slice.primary.name} />
            </p>
        </PrismicLink>
    )
}

export default NavSectionHeading
