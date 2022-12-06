
import { builtinModules } from 'module';
import solution, { ElfStreamBuffer } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should find the marker part 1', () => {
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
      expect(buf.findMarkerPart1()).toBe(markers[i]);
      }
  });

  it('should find the marker part 2', () => {
    const inputs = [
      'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
      'bvwbjplbgvbhsrlpgdmjqwftvncz',
      'nppdvjthqldpwncqszvftbrmjlhg',
      'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
      'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    ]
    const markers = [
      19, 23, 23 ,29, 26
    ]

    expect(inputs.length).toBe(markers.length);
    for (let i = 0; i < inputs.length; i++) {
      let buf = new ElfStreamBuffer(inputs[i]);
      expect(buf.data).toBe(inputs[i]);
      expect(buf.findMarkerPart2()).toBe(markers[i]);
      }
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('1287');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('3716');
  });
});
