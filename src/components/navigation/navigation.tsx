import { createClient } from '@/prismicio'
import { PrismicLink, PrismicText, PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import styles from './navigation.module.scss'
import NavSectionHeading from './navSectionHeading/navSectionHeading'
import NavSectionButton from './navSectionButton/navSectionButton'
import { client } from '@/utils/prismic'
import { NavigiationItemSlice } from '../../../prismicio-types'
import { RichTextField, RTNode } from '@prismicio/types'
import { classes } from '@/utils'

interface TextSlice {
    type: string
}

async function Navigation() {
    const navigation = await client.getByUID('navigation', 'menu-items')
    return (
        <nav className={styles.navigationContainer}>
            <div className={styles.nameHeading}>
                <h3 className={classes('font-normal', styles.text)}>Eric Kim</h3>
            </div>
            <div>
                {navigation.data.slices.map((slice: NavigiationItemSlice) => {
                    return (
                        <div key={slice.id}>
                            <NavSectionHeading slice={slice} />
                            {slice.items.length > 0 && (
                                <div>
                                    {slice.items.map((item) => {
                                        return (
                                            <NavSectionButton
                                                key={JSON.stringify(item)}
                                                item={item}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navigation
