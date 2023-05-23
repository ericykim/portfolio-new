import Image from 'next/image'
import styles from './page.module.css'
import { createClient } from '@/prismicio'
import { Col, Row } from '@/layout'
import { client } from '@/utils/prismic'
import { PrismicRichText } from '@prismicio/react'
import { TextBlockSlice } from '../../prismicio-types'

export default async function Home({ params }: any) {
    const content = await client.getByUID('page', 'home')

    console.log('hit')

    return (
        <Row center={'xs'}>
            <Col xs={12}>
                {content.data.slices.map((slice: TextBlockSlice) => {
                    return (
                        <div key={slice.id}>
                            <PrismicRichText field={slice.primary.title} />
                            {slice.items.length > 0 && (
                                <div>
                                    {slice.items.map((item) => {
                                        return (
                                            <div>
                                                <PrismicRichText field={item.content} />
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </Col>
        </Row>
    )
}
