import input from './input';

import { Vec2d, Grid } from 'utils';

export const parseInput = () => input.split('\n');

function* getPointsOnLine(start: Vec2d, end: Vec2d) {
	/** For diagonals, find the change in X & Y required to iterate */
	const [deltaX, deltaY] = [end.x - start.x, end.y - start.y].map(
		n => n && n / Math.abs(n)
	);

	/** Continue applying deltaX and deltaY until end point is reached */
	for (
		let x = start.x, y = start.y;
		x !== end.x + deltaX || y !== end.y + deltaY;
		x += deltaX, y += deltaY
	) {
		yield { x, y };
	}
}

export const findSolutionOne = (
	input: ReturnType<typeof parseInput>
): number => {
	let lines: Vec2d[][] = [];

	input.forEach(line => {
		let pair: Vec2d[] = [];

		line.split(' -> ').forEach(coord => {
			pair.push({
				x: parseInt(coord.split(',')[0]),
				y: parseInt(coord.split(',')[1]),
			});
		});

		if (pair[0].x === pair[1].x || pair[0].y === pair[1].y) lines.push(pair);
	});

	const grid = new Grid(0);

	lines.forEach(([start, end]) => {
		for (const { x, y } of getPointsOnLine(start, end)) {
			grid.set(x, y, grid.get(x, y) + 1);
		}
	});

	return grid.points.filter(point => point.value >= 2).length;
};

export const findSolutionTwo = (
	input: ReturnType<typeof parseInput>
): number => {
	let lines: Vec2d[][] = [];

	input.forEach(line => {
		let pair: Vec2d[] = [];

		line.split(' -> ').forEach(coord => {
			pair.push({
				x: parseInt(coord.split(',')[0]),
				y: parseInt(coord.split(',')[1]),
			});
		});

		lines.push(pair);
	});

	const grid = new Grid(0);

	lines.forEach(([start, end]) => {
		for (const { x, y } of getPointsOnLine(start, end)) {
			grid.set(x, y, grid.get(x, y) + 1);
		}
	});

	return grid.points.filter(point => point.value >= 2).length;
};

export { default as input } from './input';
