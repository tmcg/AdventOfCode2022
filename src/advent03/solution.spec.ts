
import solution, { Rucksack } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    var r = new Rucksack('vJrwpWtwJgWrhcsFMMfFFhFp');
    expect(r.comp1).toBe('vJrwpWtwJgWr');
    expect(r.comp2).toBe('hcsFMMfFFhFp');
    expect(r.shared).toBe('p');
    expect(r.priority).toBe(16);
    var r = new Rucksack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
    expect(r.comp1).toBe('jqHRNqRjqzjGDLGL');
    expect(r.comp2).toBe('rsFMfFZSrLrFZsSL');
    expect(r.shared).toBe('L');
    expect(r.priority).toBe(38);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('8515');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('xx');
  });
});
