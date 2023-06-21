import styles from './navigation.module.scss'
import NavSectionHeading from './navSectionHeading/navSectionHeading'
import NavSectionButton from './navSectionButton/navSectionButton'
import { client } from '@/utils/prismic'
import { NavigationDocument, NavigiationItemSlice } from '../../../prismicio-types'
import { classes } from '@/utils'
import MenuIcon from '/public/images/icons/menu.svg'
import Image from 'next/image'
import NavSwitcher from './navSwitcher/navSwitched'

async function Navigation() {
    const navigation = await client.getByUID('navigation', 'menu-items')
    return (
        <nav className={styles.navigationContainer}>
            <NavSwitcher navigation={navigation} />
            {/* <div className={styles.hamburger}>
                <Image className={styles.icon} alt='menu button icon' src={MenuIcon} />
            </div>
            <div className={styles.sideMenu}>
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
            </div> */}
        </nav>
    )
}

export default Navigation
