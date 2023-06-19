import { PrismicLink, PrismicText } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { NavigiationItemSliceDefaultItem } from '../../../../prismicio-types'
import styles from './navSectionButton.module.scss'
import { classes } from '@/utils'
import Link from 'next/link'

type NavSubSectionProps = {
    key: string
    item: NavigiationItemSliceDefaultItem
}
function NavSectionButton({ item, key }: NavSubSectionProps) {
    return (
        <PrismicNextLink
            key={key}
            className={classes('external', styles.link)}
            field={item.child_link}
        >
            <PrismicNextImage className={styles.icon} field={item.icon} alt={''} />
            <p className={classes('p3', styles.text)}>
                <PrismicText field={item.child_name} />
            </p>
        </PrismicNextLink>
    )
}

export default NavSectionButton
