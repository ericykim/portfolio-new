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
    // console.log('slice', slice.items)
    return (
        <Row className={styles.container}>
            <Col xs={2} className={styles.titleContainer}>
                <p className={classes('p5', styles.title)}>
                    <PrismicText field={slice.primary.title} />
                </p>
            </Col>
            <Col md={10} lg={8} lgOffset={2} className={styles.list}>
                {slice.items.length > 0 &&
                    slice.items.map((item) => {
                        console.log(item.link)
                        return (
                            <PrismicNextLink
                                className={styles.contentContainer}
                                key={JSON.stringify(item)}
                                field={item.link}
                            >
                                <PrismicText field={item.title} />
                                <div className={styles.dashedLine} />
                                <div>
                                    {item.date}
                                    <PrismicText field={item.subtext} />
                                </div>
                            </PrismicNextLink>
                        )
                    })}
            </Col>
        </Row>
    )
}

export default ListBlock
