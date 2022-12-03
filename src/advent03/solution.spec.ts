
import solution, { ElfRucksack, ElfRucksackGroup } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    var r = new ElfRucksack('vJrwpWtwJgWrhcsFMMfFFhFp');
    expect(r.comp1).toBe('vJrwpWtwJgWr');
    expect(r.comp2).toBe('hcsFMMfFFhFp');
    expect(r.shared).toBe('p');
    expect(r.priority).toBe(16);
    var r = new ElfRucksack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
    expect(r.comp1).toBe('jqHRNqRjqzjGDLGL');
    expect(r.comp2).toBe('rsFMfFZSrLrFZsSL');
    expect(r.shared).toBe('L');
    expect(r.priority).toBe(38);
  });

  it('should find badge groups', () => {
    var rg1 = new ElfRucksackGroup('vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL' ,'PmmdzqPrVvPwwTWBwg')
    expect(rg1.badge).toBe('r');
    expect(rg1.priority).toBe(18);

    var rg2 = new ElfRucksackGroup('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT' ,'CrZsJsPPZsGzwwsLwLmpwMDw')
    expect(rg2.badge).toBe('Z');
    expect(rg2.priority).toBe(52);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('8515');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('2434');
  });
});
