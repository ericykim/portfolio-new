'use client'
import { PrismicText } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { NavigiationItemSliceDefaultItem } from '../../../../prismicio-types'
import styles from './navSectionButton.module.scss'
import { classes } from '@/utils'
import { usePathname } from 'next/navigation'
import * as prismicHelpers from '@prismicio/helpers'

type NavSubSectionProps = {
    key: string
    item: NavigiationItemSliceDefaultItem
    setOpen: (isOpen: boolean) => void
}
function NavSectionButton({ item, key, setOpen}: NavSubSectionProps) {
    const path = usePathname()
    const menuPath = path.split('/')[1]

    return (
        <PrismicNextLink
        onClick={() => setOpen(false)}
            key={key}
            className={classes(
                styles.link,
                (menuPath === prismicHelpers.asText(item.child_name) ||
                    (prismicHelpers.asText(item.child_name) === 'home' && menuPath === '')) &&
                    styles.activeLink,
            )}
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
