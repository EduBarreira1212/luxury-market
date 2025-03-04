import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

type CategoryCardProps = {
    href: string;
    src: string;
    alt: string;
    title: string;
};

const CategoryCard = ({ href, src, alt, title }: CategoryCardProps) => {
    return (
        <Link href={href}>
            <Card className="relative h-[300px] w-[425px] overflow-hidden">
                <CardContent className="h-full p-0">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover object-left transition duration-500 hover:scale-105"
                    />
                    <span className="absolute left-4 top-60 rounded-md bg-black bg-opacity-40 px-2 py-1 text-2xl text-white">
                        {title}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CategoryCard;
