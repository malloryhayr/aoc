import input from './input';

export const parseInput = () => input.split('\n');

/** Returns the Accumulator (`acc`) value before any instruction is executed a second time. */
const getFinalAccumulator = (instructions: string[]): any => {
	let accumulator = 0;
	let index = 0;

	const INSTRUCTION_SET: any = {
		acc: (value: number) => {
			accumulator += value;
			index++;
		},
		jmp: (value: number) => {
			index += value;
		},
		nop: (value: number) => {
			index++;
		},
	};

	let executedLines: any = {};
	instructions.forEach((instr, index) => (executedLines[index] = false));

	let complete = false;

	while (index < instructions.length) {
		if (index >= instructions.length - 1) complete = true;
		if (executedLines[index] != true) {
			const instr = instructions[index].split(' ')[0];
			const value = Number(instructions[index].split(' ')[1].replace('+', ''));

			executedLines[index] = true;
			INSTRUCTION_SET[instr](value);
		} else {
			break;
		}
	}

	return { acc: accumulator, ind: index, complete: complete };
};

const fixInstructions = (instructions: string[]): number => {
	let acc: number = 0;

	instructions.forEach((line, index) => {
		let newInstructions: string[] = [...instructions];

		const instr = line.split(' ')[0];
		const value = line.split(' ')[1];

		if (instr == 'jmp') {
			newInstructions[index] = `nop ${value}`;
		} else if (instr == 'nop') {
			newInstructions[index] = `jmp ${value}`;
		}

		index++;
		const checked = getFinalAccumulator(newInstructions);

		if (checked.complete == true) {
			acc = checked.acc;
		}
	});

	return acc;
};

export const findSolutionOne = (input: ReturnType<typeof parseInput>): number =>
	getFinalAccumulator(input).acc;

export const findSolutionTwo = (input: ReturnType<typeof parseInput>): number =>
	fixInstructions(input);

export { default as input } from './input';
