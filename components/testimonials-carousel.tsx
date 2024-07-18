'use client';
import React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { StarIcon } from 'lucide-react';
import VideoPlayer from './video-player';
import { dateFormatter } from '@/lib/utils';

// import Autoplay from 'embla-carousel-autoplay';

interface Props
	extends React.HTMLAttributes<React.ComponentPropsWithoutRef<'div'>> {
	testimonials: ReadonlyArray<Testimonial>;
}

const MAX_RATING = 5;

const TestimonialsCarousel: React.FC<Props> = ({ testimonials }) => {
	return (
		<section className='p-6'>
			<Carousel>
				<CarouselContent className='items-stretch'>
					{testimonials
						.concat(new Array(10).fill(testimonials[0]))
						.map((testimonial, idx) => (
							<CarouselItem
								key={`${testimonial._id}-${idx}`}
								className='md:basis-1/2 lg:basis-1/4 min-h-full rounded-lg overflow-hidden'
							>
								<div className='text-black relative'>
									<VideoPlayer
										videoUrl={testimonial.videoUrl}
									/>
									<div className='absolute bottom-4 left-0 px-4'>
										<div className='flex gap-1 items-center'>
											{Array(testimonial.rating)
												.fill(0)
												.map((_, index) => {
													return (
														<span
															key={`filled-${index}`}
														>
															<StarIcon
																fill='#facc15'
																className='text-yellow-400'
																size={12}
															/>
														</span>
													);
												})}
											{Array(
												MAX_RATING - testimonial.rating
											)
												.fill(0)
												.map((_, index) => {
													return (
														<span
															key={`unfilled-${index}`}
														>
															<StarIcon
																className='text-yellow-400'
																size={12}
															/>
														</span>
													);
												})}
										</div>
										<div className='text-white pt-2'>
											<h1 className='text-sm'>
												{testimonial.title}
											</h1>
											<h2 className='text-xs text-slate-300'>
												{testimonial.designation}
											</h2>
										</div>
									</div>
								</div>
								<div className='p-4 bg-white rounded-b-lg flex-1'>
									<p className='text-sm text-justify'>
										&ldquo;{testimonial.testimonial}&rdquo;
									</p>
									<time
										dateTime={testimonial.date.toDateString()}
										className='text-xs text-slate-500'
									>
										{dateFormatter(testimonial.date)}
									</time>
								</div>
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious className='left-0' />
				<CarouselNext className='right-0' />
			</Carousel>
		</section>
	);
};

export default TestimonialsCarousel;
