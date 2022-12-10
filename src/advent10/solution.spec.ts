
import solution, { CathodeRayTube } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    let sampleInput: string[] = [
      'noop','addx 3','addx -5'
    ];
    
    let crt = new CathodeRayTube(sampleInput);
    expect(crt.code[0]).toBe(0);
    expect(crt.code[1]).toBe(3);
    expect(crt.code[2]).toBe(-5);
  });

  it('should calculate signal strength part 1', () => {
    let sampleInput: string[] = [
      'addx 15', 'addx -11', 'addx 6', 'addx -3', 'addx 5', 'addx -1',
      'addx -8', 'addx 13', 'addx 4', 'noop', 'addx -1', 'addx 5',
      'addx -1', 'addx 5', 'addx -1', 'addx 5', 'addx -1', 'addx 5',
      'addx -1', 'addx -35', 'addx 1', 'addx 24', 'addx -19', 'addx 1',
      'addx 16', 'addx -11', 'noop', 'noop', 'addx 21', 'addx -15',
      'noop', 'noop', 'addx -3', 'addx 9', 'addx 1', 'addx -3', 'addx 8',
      'addx 1', 'addx 5', 'noop', 'noop', 'noop', 'noop', 'noop',
      'addx -36', 'noop', 'addx 1', 'addx 7', 'noop', 'noop', 'noop',
      'addx 2', 'addx 6', 'noop', 'noop', 'noop', 'noop', 'noop',
      'addx 1', 'noop', 'noop', 'addx 7', 'addx 1', 'noop', 'addx -13',
      'addx 13', 'addx 7', 'noop', 'addx 1', 'addx -33', 'noop', 'noop',
      'noop', 'addx 2', 'noop', 'noop', 'noop', 'addx 8', 'noop', 'addx -1',
      'addx 2', 'addx 1', 'noop', 'addx 17', 'addx -9', 'addx 1', 'addx 1',
      'addx -3', 'addx 11', 'noop', 'noop', 'addx 1', 'noop', 'addx 1',
      'noop', 'noop', 'addx -13', 'addx -19', 'addx 1', 'addx 3', 'addx 26',
      'addx -30', 'addx 12', 'addx -1', 'addx 3', 'addx 1', 'noop', 'noop',
      'noop', 'addx -9', 'addx 18', 'addx 1', 'addx 2', 'noop', 'noop',
      'addx 9', 'noop', 'noop', 'noop', 'addx -1', 'addx 2', 'addx -37',
      'addx 1', 'addx 3', 'noop', 'addx 15', 'addx -21', 'addx 22',
      'addx -6', 'addx 1', 'noop', 'addx 2', 'addx 1', 'noop', 'addx -10',
      'noop', 'noop', 'addx 20', 'addx 1', 'addx 2', 'addx 2', 'addx -6',
      'addx -11', 'noop', 'noop', 'noop'
    ];

    let crt = new CathodeRayTube(sampleInput);
    expect(crt.signalStrengthPart1()).toBe(13140);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('13920');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('');
  });
});
