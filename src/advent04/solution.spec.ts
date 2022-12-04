
import solution, { SectionAssignmentPair } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    let a1 = new SectionAssignmentPair('2-4,6-8');
    expect(a1.elf1[0]).toBe(2);
    expect(a1.elf1[1]).toBe(4);
    expect(a1.elf2[0]).toBe(6);
    expect(a1.elf2[1]).toBe(8);
  });

  it('should calculate containment', () => {
    let a1 = new SectionAssignmentPair('2-4,6-8');
    let a2 = new SectionAssignmentPair('2-8,3-7');
    let a3 = new SectionAssignmentPair('6-6,4-6');
    expect(a1.findAssignmentContainer()).toBe(0);
    expect(a2.findAssignmentContainer()).toBe(1);
    expect(a3.findAssignmentContainer()).toBe(2);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('444');
  });

  it('should solve part 2', () => {
    //expect(solution.solvePart2()).toBe('xx');
  });
});
