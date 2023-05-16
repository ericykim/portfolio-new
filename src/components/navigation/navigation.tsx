import { createClient } from '@/prismicio'
import { PrismicLink, PrismicText, SliceComponentProps } from '@prismicio/react'
import { Content } from '@prismicio/client'
import styles from './navigation.module.scss'

export type NavigationSlicesType = SliceComponentProps<Content.NavigationDocumentDataSlicesSlice>
async function Navigation() {
    const client = createClient()
    const navigation = await client.getByUID('navigation', 'eric-kim')
    return (
        <nav className={styles.navigationContainer}>
            <div>
                {navigation.data.slices.map((slice) => {
                    return (
                        <div key={slice.id}>
                            <PrismicLink field={slice.primary.link}>
                                <PrismicText field={slice.primary.name} />
                            </PrismicLink>
                            {slice.items.length > 0 && (
                                <div>
                                    {slice.items.map((item) => {
                                        return (
                                            <div key={JSON.stringify(item)}>
                                                <PrismicLink field={item.child_link}>
                                                    <PrismicText field={item.child_name} />
                                                </PrismicLink>
                                            </div>
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
