import { client } from '@/utils/prismic'
import TextBlock from '@/components/textBlock/textBlock'
import ListBlock from '@/components/listBlock/listBlock'
import ImageBlock from '@/components/imageBlock/imageBlock'
import { Container } from '@/layout'
import styles from './homePage.module.scss'

export default async function Home({ params }: any) {
    const content = await client.getByUID('page', 'home')

    return (
        <Container className={styles.homePageContainer} fluid>
            {content.data.slices.map((slice) => {
                if (slice.slice_type === 'text_block') {
                    return <TextBlock key={JSON.stringify(slice)} slice={slice} />
                }
                if (slice.slice_type === 'list_block') {
                    return <ListBlock key={JSON.stringify(slice)} slice={slice} />
                }
                if (slice.slice_type === 'image_block') {
                    return <ImageBlock key={JSON.stringify(slice)} slice={slice} />
                }
            })}
        </Container>
    )
}
