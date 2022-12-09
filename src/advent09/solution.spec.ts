
import { hasUncaughtExceptionCaptureCallback } from 'process';
import solution, { RopeBridge } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {
  const sampleInput: string[] = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];

  it('should read input', () => {
    let b = new RopeBridge(sampleInput);

    expect(b.moves.length).toBe(8);
    expect(b.moves[0].direction).toBe('R');
    expect(b.moves[0].count).toBe(4);
    expect(b.moves[1].direction).toBe('U');
    expect(b.moves[1].count).toBe(4);
    expect(b.moves[2].direction).toBe('L');
    expect(b.moves[2].count).toBe(3);
    expect(b.moves[3].direction).toBe('D');
    expect(b.moves[3].count).toBe(1);
    expect(b.moves[4].direction).toBe('R');
    expect(b.moves[4].count).toBe(4);
    expect(b.moves[5].direction).toBe('D');
    expect(b.moves[5].count).toBe(1);
    expect(b.moves[6].direction).toBe('L');
    expect(b.moves[6].count).toBe(5);
    expect(b.moves[7].direction).toBe('R');
    expect(b.moves[7].count).toBe(2);
  });

  it('should step moves', () => {
    let b = new RopeBridge([]);

    expect(b.headPos()).toBe('0,0');
    expect(b.tailPos()).toBe('0,0');
    b.stepHead('R')
    expect(b.headPos()).toBe('1,0');
    expect(b.tailPos()).toBe('0,0');
    b.stepHead('R')
    expect(b.headPos()).toBe('2,0');
    expect(b.tailPos()).toBe('1,0');
    b.stepHead('R')
    expect(b.headPos()).toBe('3,0');
    expect(b.tailPos()).toBe('2,0');
    b.stepHead('U')
    expect(b.headPos()).toBe('3,1');
    expect(b.tailPos()).toBe('2,0');
    b.stepHead('U')
    expect(b.headPos()).toBe('3,2');
    expect(b.tailPos()).toBe('3,1');
    b.stepHead('U')
    expect(b.headPos()).toBe('3,3');
    expect(b.tailPos()).toBe('3,2');
  });

  it('should count positions', () => {
    let b = new RopeBridge(sampleInput);

    b.moves.map(m => b.applyMove(m));
    expect([...b.tailPath.keys()].length).toBe(13);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('6464');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('');
  });
});
