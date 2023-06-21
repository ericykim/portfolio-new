import { client } from '@/utils/prismic'
import { PrismicRichText } from '@prismicio/react'

type BlogProps = {
    params: { uid: string[] }
}

export default async function Blog({ params }: BlogProps) {
    const uidParam = params?.uid ? params?.uid[0] : ''
    if (!uidParam) {
        return <div></div>
    }

    const content = await client.getByUID('blogpost', uidParam)
    console.log(content)
    return <div>{content.uid}</div>
}
