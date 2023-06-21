import styles from './blog.module.scss'
import * as prismicHelpers from '@prismicio/helpers'
import { client } from '@/utils/prismic'
import { PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import { classes } from '@/utils'

type RootLayoutProps = {
    children: React.ReactNode
    params: { uid: string[] }
}

export default async function Layout({ children, params }: RootLayoutProps) {
    const uidParam = params?.uid ? params?.uid[0] : ''
    const content = await client.getAllByType('blogpost')
    return (
        <div className={styles.blogPage}>
            <div className={styles.menuContainer}>
                {content.reverse().map((blog) => {
                    const date = prismicHelpers.asDate(blog.data.created_on)
                    const dateOptions = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    } as const
                    return (
                        <Link
                            scroll={false}
                            href={`/blog/${blog.uid}`}
                            key={blog.id}
                            className={classes(
                                styles.blogLink,
                                blog.uid === uidParam && styles.activeLink,
                            )}
                        >
                            <PrismicRichText field={blog.data.title} />
                            <div className={styles.caption}>
                                {date?.toLocaleDateString('en-US', dateOptions)}
                            </div>
                        </Link>
                    )
                })}
            </div>
            {children}
        </div>
    )
}
