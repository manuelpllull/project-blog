import dynamic from 'next/dynamic';

export * from './CircularColorsDemo';

const CircularColorsDemo = dynamic(() =>
	import('./CircularColorsDemo')
);

export default CircularColorsDemo;
