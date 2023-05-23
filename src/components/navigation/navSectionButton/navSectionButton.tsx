import { PrismicLink, PrismicText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
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
            <PrismicLink
                field={item.child_link}
                externalComponent={(props) => (
                    <a className={classes('external', styles.link)} {...props} />
                )}
            >
                <PrismicNextImage className={styles.icon} field={item.icon} />
                <p className={'p3'}>
                    <PrismicText field={item.child_name} />
                </p>
            </PrismicLink>
        </div>
    )
}

export default NavSectionButton
