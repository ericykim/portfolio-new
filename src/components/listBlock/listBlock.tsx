import { Col, Row } from '@/layout'
import { classes } from '@/utils'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import { ListBlockSlice, TextBlockSlice } from '../../../prismicio-types'
import styles from './listBlock.module.scss'

type ListBlockProps = {
    slice: ListBlockSlice
}

function ListBlock({ slice }: ListBlockProps) {
    return (
        <Row className={styles.container}>
            <Col xs={2} className={styles.titleContainer}>
                <p className={classes('p5', styles.title)}>
                    <PrismicText field={slice.primary.title} />
                </p>
            </Col>
            <Col xs={10} md={10} lg={8} lgOffset={2} className={styles.list}>
                {slice.items.length > 0 &&
                    slice.items.map((item) => {
                        return (
                            <PrismicNextLink
                                className={styles.contentContainer}
                                key={JSON.stringify(item)}
                                field={item.link}
                            >
                                <PrismicText field={item.title} />
                                <div className={styles.dashedLine} />
                                <div>
                                    <PrismicText field={item.subtext} />
                                    <span className={styles.date}>{item.date}</span>
                                </div>
                            </PrismicNextLink>
                        )
                    })}
            </Col>
        </Row>
    )
}

export default ListBlock
