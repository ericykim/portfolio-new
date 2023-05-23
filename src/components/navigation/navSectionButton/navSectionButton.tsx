import { PrismicLink, PrismicText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { NavigiationItemSliceDefaultItem } from '../../../../prismicio-types'
import styles from './navSectionButton.module.scss'
import { classes } from '@/utils'
import Link from 'next/link'

type NavSubSectionProps = {
    item: NavigiationItemSliceDefaultItem
}
function NavSectionButton({ item }: NavSubSectionProps) {
    return (
        <div className={styles.buttonContainer} key={JSON.stringify(item)}>
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
