import { Col, Row } from '@/layout'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { ImageBlockSlice } from '../../../prismicio-types'
import styles from './imageBlock.module.scss'

type ImageBlockProps = {
    slice: ImageBlockSlice
}

function ImageBlock({ slice }: ImageBlockProps) {
    return (
        <Row className={styles.container}>
            <Col xs={12} className={styles.col}>
                <div className={styles.imageContainer}>
                    <PrismicNextImage className={styles.image} field={slice.primary.image} alt=''/>
                </div>
                <div className={styles.caption}>
                    <PrismicRichText field={slice.primary.caption} />
                </div>
            </Col>
        </Row>
    )
}

export default ImageBlock
