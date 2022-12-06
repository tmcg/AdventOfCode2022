
import { builtinModules } from 'module';
import solution, { ElfStreamBuffer } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should find the marker', () => {
    const inputs = [
      'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
      'bvwbjplbgvbhsrlpgdmjqwftvncz',
      'nppdvjthqldpwncqszvftbrmjlhg',
      'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
      'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    ]
    const markers = [
      7, 5, 6, 10, 11
    ]

    expect(inputs.length).toBe(markers.length);
    for (let i = 0; i < inputs.length; i++) {
      let buf = new ElfStreamBuffer(inputs[i]);
      expect(buf.data).toBe(inputs[i]);
      expect(buf.marker).toBe(markers[i]);
      }
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('');
  });
});
