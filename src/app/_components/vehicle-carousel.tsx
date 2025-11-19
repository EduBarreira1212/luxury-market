'use client';

import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from '@/app/_components/ui/carousel';
import { useEffect, useState } from 'react';

const CDN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;

type VehicleCarouselProps = {
    imageKeys: string[];
    alt?: string;
    className?: string;
};

export function VehicleCarousel({
    imageKeys,
    alt = 'Vehicle photo',
    className,
}: VehicleCarouselProps) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    if (!imageKeys || imageKeys.length === 0) {
        return (
            <div className="flex h-48 w-full items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
                No photos available.
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="relative w-full overflow-hidden rounded-xl border bg-background">
                <Carousel
                    opts={{ loop: true, align: 'start' }}
                    setApi={setApi}
                    className="w-full"
                >
                    <CarouselContent>
                        {imageKeys.map((key) => (
                            <CarouselItem key={key}>
                                <div className="relative w-full overflow-hidden">
                                    <div className="relative aspect-video w-full">
                                        <Image
                                            src={`${CDN}/${key}`}
                                            alt={alt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 700px, 100vw"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70" />
                    <CarouselNext className="right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70" />

                    <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                        {current + 1} / {count || imageKeys.length}
                    </div>
                </Carousel>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
                {imageKeys.map((key, index) => {
                    const isActive = index === current;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => api?.scrollTo(index)}
                            className={`relative h-12 w-16 overflow-hidden rounded-md border transition ${isActive ? 'border-primary ring-2 ring-primary/60' : 'border-border hover:border-primary/60'}`}
                        >
                            <Image
                                src={`${CDN}/${key}`}
                                alt={alt}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
