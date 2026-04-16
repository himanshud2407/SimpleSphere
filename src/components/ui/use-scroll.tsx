'use client';
import React from 'react';

export function useScroll(threshold: number = 20) {
	const [scrolled, setScrolled] = React.useState(false);

	React.useEffect(() => {
		const onScroll = () => {
			const scrollY = window.scrollY;
			if (scrollY > threshold) {
				setScrolled(true);
			} else if (scrollY < Math.max(0, threshold - 70)) {
				// Increased hysteresis to 70 for total stability against layout shifts
				// This compensates for the ~56px height change of the sticky header
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, [threshold]);

	return scrolled;
}
