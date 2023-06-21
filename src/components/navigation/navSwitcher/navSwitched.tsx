'use client'
import { NavigationDocument, NavigiationItemSlice } from '../../../../prismicio-types'
import styles from '../navigation.module.scss'
import MenuIcon from '/public/images/icons/menu.svg'
import CloseIcon from '/public/images/icons/close.svg'
import Image from 'next/image'
import NavSectionHeading from '../navSectionHeading/navSectionHeading'
import { classes } from '@/utils'
import NavSectionButton from '../navSectionButton/navSectionButton'
import { useState } from 'react'

type NavSwitcherProps = {
    navigation: NavigationDocument<string>
}

function NavSwitcher({ navigation }: NavSwitcherProps) {
    const [isOpen, setIsOpen] = useState<boolean>()

    return (
        <>
            <div className={styles.hamburger}>
                {isOpen ? (
                    <Image
                        onClick={() => setIsOpen(false)}
                        className={styles.icon}
                        alt='menu button icon'
                        src={CloseIcon}
                    />
                ) : (
                    <Image
                        onClick={() => setIsOpen(true)}
                        className={styles.icon}
                        alt='menu button icon'
                        src={MenuIcon}
                    />
                )}
            </div>
            <div className={classes(styles.sideMenu, isOpen && styles.openMenu)}>
                <div className={styles.nameHeading}>
                    <h3 className={classes('font-normal', styles.text)}>Eric Kim</h3>
                </div>
                <div>
                    {navigation?.data.slices.map((slice: NavigiationItemSlice) => {
                        return (
                            <div key={slice.id}>
                                <NavSectionHeading slice={slice} />
                                {slice.items.length > 0 && (
                                    <div>
                                        {slice.items.map((item) => {
                                            return (
                                                <NavSectionButton
                                                    setOpen={setIsOpen}
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
            </div>
        </>
    )
}

export default NavSwitcher
