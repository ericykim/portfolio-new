import { Col, Row } from '@/layout'
import { PrismicRichText } from '@prismicio/react'
import { TextBlockSlice } from '../../../prismicio-types';
import styles from './textBlock.module.scss'

type TextBlockProps = {
    slice: TextBlockSlice;
}

function TextBlock({slice}: TextBlockProps) {
    return (
        <>
            <Col xs={4} className={styles.titleContainer}>
                <PrismicRichText field={slice.primary.title} />
            </Col>
            <Col xs={8}>
                {slice.items.length > 0 && (
                    <div>
                        {slice.items.map((item) => {
                            return (
                                <div key={JSON.stringify(item)}>
                                    <PrismicRichText field={item.content} />
                                </div>
                            )
                        })}
                    </div>
                )}
            </Col>
        </>
    )
}

export default TextBlock
