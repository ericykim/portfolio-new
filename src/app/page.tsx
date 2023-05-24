import Image from 'next/image'
import styles from './page.module.css'
import { createClient } from '@/prismicio'
import { Col, Row } from '@/layout'
import { client } from '@/utils/prismic'
import { PrismicRichText } from '@prismicio/react'
import { TextBlockSlice } from '../../prismicio-types'
import TextBlock from '@/components/textBlock/textBlock'

export default async function Home({ params }: any) {
    const content = await client.getByUID('page', 'home')

    console.log('hit')

    return (
        <Row center={'xs'}>
            {content.data.slices.map((slice: TextBlockSlice) => {
                return (
                    <TextBlock key={JSON.stringify(slice)} slice={slice}/>
                )
            })}
        </Row>
    )
}
