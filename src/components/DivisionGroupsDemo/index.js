import dynamic from 'next/dynamic';

export * from './DivisionGroupsDemo';

const DivisionGroupsDemo = dynamic(() =>
	import('./DivisionGroupsDemo')
);

export default DivisionGroupsDemo;
