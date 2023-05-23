import { createClient } from '@/prismicio'
import { PrismicLink, PrismicText, PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import styles from './navigation.module.scss'
import NavSectionHeading from './navSectionHeading/navSectionHeading'
import NavSectionButton from './navSectionButton/navSectionButton'
import { client } from '@/utils/prismic'

async function Navigation() {
    const navigation = await client.getByUID('navigation', 'menu-items')
    return (
        <nav className={styles.navigationContainer}>
            <div className={styles.nameHeading}>
                <h3 className='font-normal'>Eric Kim</h3>
            </div>
            <div>
                {navigation.data.slices.map((slice) => {
                    return (
                        <div key={slice.id}>
                            <NavSectionHeading slice={slice} />
                            {slice.items.length > 0 && (
                                <div>
                                    {slice.items.map((item) => {
                                        return <NavSectionButton item={item} />
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
