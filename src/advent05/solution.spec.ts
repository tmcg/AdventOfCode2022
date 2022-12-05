
import solution, { CargoCrane } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  const sampleInput: string[] = [
      '    [D]    ',
      '[N] [C]    ',
      '[Z] [M] [P]',
      ' 1   2   3 ',
      '',
      'move 1 from 2 to 1',
      'move 3 from 1 to 3',
      'move 2 from 2 to 1',
      'move 1 from 1 to 2'
    ]

  it('should read input', () => {
    let crane = new CargoCrane(sampleInput);

    expect(crane.moves.length).toBe(4);
    expect(crane.moves[0].count).toBe(1);
    expect(crane.moves[0].stack1).toBe(2);
    expect(crane.moves[0].stack2).toBe(1);
    expect(crane.moves[1].count).toBe(3);
    expect(crane.moves[1].stack1).toBe(1);
    expect(crane.moves[1].stack2).toBe(3);
    expect(crane.moves[2].count).toBe(2);
    expect(crane.moves[2].stack1).toBe(2);
    expect(crane.moves[2].stack2).toBe(1);
    expect(crane.moves[3].count).toBe(1);
    expect(crane.moves[3].stack1).toBe(1);
    expect(crane.moves[3].stack2).toBe(2);

    expect(crane.stacks.length).toBe(3);
    expect(crane.stacks[0].crates).toStrictEqual(['Z','N']);
    expect(crane.stacks[1].crates).toStrictEqual(['M','C','D']);
    expect(crane.stacks[2].crates).toStrictEqual(['P']);
  });

  it('should move crates part 1', () => {
    let crane = new CargoCrane(sampleInput);

    crane.applyMovePart1(crane.moves[0]);
    expect(crane.stacks[0].crates).toStrictEqual(['Z','N','D']);
    expect(crane.stacks[1].crates).toStrictEqual(['M','C']);
    expect(crane.stacks[2].crates).toStrictEqual(['P']);
  });

  it('should move crates part 2', () => {
    let crane = new CargoCrane(sampleInput);

    crane.applyMovePart2(crane.moves[0]);
    expect(crane.stacks[0].crates).toStrictEqual(['Z','N','D']);
    expect(crane.stacks[1].crates).toStrictEqual(['M','C']);
    expect(crane.stacks[2].crates).toStrictEqual(['P']);
    crane.applyMovePart2(crane.moves[1]);
    expect(crane.stacks[0].crates).toStrictEqual([]);
    expect(crane.stacks[1].crates).toStrictEqual(['M','C']);
    expect(crane.stacks[2].crates).toStrictEqual(['P','Z','N','D']);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('CVCWCRTVQ');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('CNSCZWLVT');
  });
});
