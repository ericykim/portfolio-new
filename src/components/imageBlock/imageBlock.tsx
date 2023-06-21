import { Col, Row } from '@/layout'
import { classes } from '@/utils'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import { ImageBlockSlice } from '../../../prismicio-types'
import styles from './imageBlock.module.scss'

type ImageBlockProps = {
    slice: ImageBlockSlice
}

function ImageBlock({ slice }: ImageBlockProps) {
    return (
        <Row className={styles.container}>
            <Col xs={2} className={styles.titleContainer}>
                <p className={classes('p5', styles.title)}>
                    <PrismicText field={slice.primary.title} />
                </p>
            </Col>
            <Col xs={10} md={10} lg={8} xsOffset={0} lgOffset={2} className={styles.col}>
                <div className={styles.imageContainer}>
                    <PrismicNextImage className={styles.image} field={slice.primary.image} alt='' />
                </div>
                <div className={styles.caption}>
                    <PrismicRichText field={slice.primary.caption} />
                </div>
            </Col>
        </Row>
    )
}

export default ImageBlock
