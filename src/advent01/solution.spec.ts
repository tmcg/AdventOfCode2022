
import solution, { ElfParty, ElfPartyMember } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    let party = new ElfParty(['100','200','','350'].join('\r\n'))
    expect(party.elves.length).toEqual(2);
    expect(party.elves[0].calories).toStrictEqual([100,200]);
    expect(party.elves[1].calories).toStrictEqual([350]);
  });

  it('should calculate the total calories', () => {
    let party = new ElfParty(['100','200','','350'].join('\r\n'))
    expect(party.elves.length).toEqual(2);
    expect(party.elves[0].totalCalories()).toEqual(300);
    expect(party.elves[1].totalCalories()).toEqual(350);
  });

  it('should calculate the maximum calories', () => {
    let party = new ElfParty(['100','200','','350','','50','100'].join('\r\n'))
    expect(party.findMaxCalories()).toEqual(350)
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('74394');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('212836');
  });
});
