
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

  it('should step moves part 1', () => {
    let b = new RopeBridge(['R 1','U 1']);

    expect(b.headPos()).toBe('0,0');
    expect(b.tailPos()).toBe('0,0');
    b.applyMove(b.moves[0])
    expect(b.headPos()).toBe('1,0');
    expect(b.tailPos()).toBe('0,0');
    b.applyMove(b.moves[0])
    expect(b.headPos()).toBe('2,0');
    expect(b.tailPos()).toBe('1,0');
    b.applyMove(b.moves[0])
    expect(b.headPos()).toBe('3,0');
    expect(b.tailPos()).toBe('2,0');
    b.applyMove(b.moves[1])
    expect(b.headPos()).toBe('3,1');
    expect(b.tailPos()).toBe('2,0');
    b.applyMove(b.moves[1])
    expect(b.headPos()).toBe('3,2');
    expect(b.tailPos()).toBe('3,1');
    b.applyMove(b.moves[1])
    expect(b.headPos()).toBe('3,3');
    expect(b.tailPos()).toBe('3,2');
  });

  it('should count positions part 1', () => {
    let b = new RopeBridge(sampleInput);

    b.moves.map(m => b.applyMove(m));
    expect([...b.tailPath.keys()].length).toBe(13);
  });

  it('should step moves part 2', () => {
    let b = new RopeBridge(['R 1','U 1'], 3);

    expect(b.ropePos()).toBe('0,0  0,0  0,0');
    b.applyMove(b.moves[0])
    expect(b.ropePos()).toBe('1,0  0,0  0,0');
    b.applyMove(b.moves[0])
    expect(b.ropePos()).toBe('2,0  1,0  0,0');
    b.applyMove(b.moves[0])
    expect(b.ropePos()).toBe('3,0  2,0  1,0');
    b.applyMove(b.moves[1])
    expect(b.ropePos()).toBe('3,1  2,0  1,0');
    b.applyMove(b.moves[1])
    expect(b.ropePos()).toBe('3,2  3,1  2,1');
    b.applyMove(b.moves[1])
    expect(b.ropePos()).toBe('3,3  3,2  2,1');

    b = new RopeBridge(['R 4', 'U 4'], 10);

    expect(b.ropePos()).toBe('0,0  0,0  0,0  0,0  0,0  0,0  0,0  0,0  0,0  0,0');
    b.applyMove(b.moves[0]);
    expect(b.ropePos()).toBe('4,0  3,0  2,0  1,0  0,0  0,0  0,0  0,0  0,0  0,0');
    b.applyMove(b.moves[1]);
    expect(b.ropePos()).toBe('4,4  4,3  4,2  3,2  2,2  1,1  0,0  0,0  0,0  0,0');
  });

  it('should count positions part 2', () => {
    let b = new RopeBridge(['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'], 10);
    b.moves.map(m => b.applyMove(m));
    expect([...b.tailPath.keys()].length).toBe(36);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('6464');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('2604');
  });
});
