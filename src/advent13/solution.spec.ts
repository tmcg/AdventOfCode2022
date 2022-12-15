
import solution, { DistressSignal, SignalPair } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {
  const sampleInput = [
    '[1,1,3,1,1]',
    '[1,1,5,1,1]',
    '',
    '[[1],[2,3,4]]',
    '[[1],4]',
    '',
    '[9]',
    '[[8,7,6]]',
    '',
    '[[4,4],4,4]',
    '[[4,4],4,4,4]',
    '',
    '[7,7,7,7]',
    '[7,7,7]',
    '',
    '[]',
    '[3]',
    '',
    '[[[]]]',
    '[[]]',
    '',
    '[1,[2,[3,[4,[5,6,7]]]],8,9]',
    '[1,[2,[3,[4,[5,6,0]]]],8,9]',
  ];

  it('should read input', () => {
    let sig = new DistressSignal(sampleInput.join('\r\n'));

    expect(sig.pairs.length).toBe(8);
    expect(sig.pairs[0].left).toBe('[1,1,3,1,1]');
    expect(sig.pairs[0].right).toBe('[1,1,5,1,1]');

    expect(sig.pairs[0].leftPacket).toStrictEqual([1,1,3,1,1]);
    expect(sig.pairs[0].rightPacket).toStrictEqual([1,1,5,1,1]);
    expect(sig.pairs[1].leftPacket).toStrictEqual([[1],[2,3,4]]);
    expect(sig.pairs[1].rightPacket).toStrictEqual([[1],4]);
  });

  it('should compare signal pairs', () => {
    let sig = new DistressSignal(sampleInput.join('\r\n'));

    expect(sig.pairs[0].compare()).toBe('ordered');
    expect(sig.pairs[1].compare()).toBe('ordered');
    expect(sig.pairs[2].compare()).toBe('unordered');
    expect(sig.pairs[3].compare()).toBe('ordered');
    expect(sig.pairs[4].compare()).toBe('unordered');
    expect(sig.pairs[5].compare()).toBe('ordered');
    expect(sig.pairs[6].compare()).toBe('unordered');
    expect(sig.pairs[7].compare()).toBe('unordered');
  });

  it('should sum ordered indices', () => {
    let sig = new DistressSignal(sampleInput.join('\r\n'));

    expect(sig.sumOfOrderedIndices()).toBe(13);
  });

  it('should calculate decoder key', () => {
    let sig = new DistressSignal(sampleInput.join('\r\n'));

    expect(sig.decoderKey()).toBe(140);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('6272');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('22288');
  });
});
