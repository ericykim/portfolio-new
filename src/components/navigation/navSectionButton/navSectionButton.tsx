import { PrismicLink, PrismicText } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { NavigiationItemSliceDefaultItem } from '../../../../prismicio-types'
import styles from './navSectionButton.module.scss'
import { classes } from '@/utils'
import Link from 'next/link'

type NavSubSectionProps = {
    key: string,
    item: NavigiationItemSliceDefaultItem
}
function NavSectionButton({ item, key }: NavSubSectionProps) {
    return (
        <div className={styles.buttonContainer} key={key}>
            <PrismicNextLink className={classes('external', styles.link)} field={item.child_link}>
                <PrismicNextImage className={styles.icon} field={item.icon} alt={''} />
                <p className={'p3'}>
                    <PrismicText field={item.child_name} />
                </p>
            </PrismicNextLink>
        </div>
    )
}

export default NavSectionButton
