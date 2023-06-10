import styles from './homePage.module.scss'
import { client } from '@/utils/prismic'
import TextBlock from '@/components/textBlock/textBlock'
import ListBlock from '@/components/listBlock/listBlock'

export default async function Home({ params }: any) {
    const content = await client.getByUID('page', 'home')

    return (
        <>
            {content.data.slices.map((slice) => {
                if (slice.slice_type === 'text_block') {
                    return (
                        <TextBlock key={JSON.stringify(slice)} slice={slice}/>
                    )
                }
                if (slice.slice_type === 'list_block') {
                    return (
                        <ListBlock key={JSON.stringify(slice)} slice={slice}/>
                    )
                }
            })}
        </>
    )
}
