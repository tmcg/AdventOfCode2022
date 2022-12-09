
import solution, { ElfForest } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {
  const sampleInput: string[] = [
    '30373',
    '25512',
    '65332',
    '33549',
    '35390'
  ];

  it('should read input', () => {
    let forest: ElfForest = new ElfForest(sampleInput);

    expect(forest.trees.length).toBe(5);
    expect(forest.trees[0]).toStrictEqual([3,0,3,7,3]);
    expect(forest.trees[1]).toStrictEqual([2,5,5,1,2]);
    expect(forest.trees[2]).toStrictEqual([6,5,3,3,2]);
    expect(forest.trees[3]).toStrictEqual([3,3,5,4,9]);
    expect(forest.trees[4]).toStrictEqual([3,5,3,9,0]);
  });

  it('should calculate visible map', () => {
    let forest: ElfForest = new ElfForest(sampleInput).calcVisibleMap();

    expect(forest.vmap[0]).toStrictEqual([1,1,1,1,1]);
    expect(forest.vmap[1]).toStrictEqual([1,1,1,0,1]);
    expect(forest.vmap[2]).toStrictEqual([1,1,0,1,1]);
    expect(forest.vmap[3]).toStrictEqual([1,0,1,0,1]);
    expect(forest.vmap[4]).toStrictEqual([1,1,1,1,1]);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('1681');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('');
  });
});
