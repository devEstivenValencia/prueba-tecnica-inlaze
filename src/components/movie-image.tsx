import { genImageUrl } from '@/common/utils/generate-image-url'
import Image, { ImageProps } from 'next/image'

interface MovieImageProps extends Omit<ImageProps, 'src'> {
	path: string
	alt: string
}

export function MovieImage({ path, alt, ...props }: MovieImageProps) {
	const url = genImageUrl(path)
	return <Image src={url} alt={alt} className='transform transition-transform group-hover:scale-105' {...props} />
}
