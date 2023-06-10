import { Col, Row } from '@/layout'
import { classes } from '@/utils'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import { TextBlockSlice } from '../../../prismicio-types'
import styles from './textBlock.module.scss'

type TextBlockProps = {
    slice: TextBlockSlice
}

function TextBlock({ slice }: TextBlockProps) {
    return (
        <Row className={styles.container}>
            <Col xs={2} className={styles.titleContainer}>
                <p className={classes('p5', styles.title)}>
                    <PrismicText field={slice.primary.title} />
                </p>
            </Col>
            <Col xs={10} md={10} lg={8} lgOffset={2}>
                {slice.items.length > 0 && (
                    <div className={styles.contentContainer}>
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
        </Row>
    )
}

export default TextBlock
