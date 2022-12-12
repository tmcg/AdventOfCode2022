
import solution, { HeightMap } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {
  const basicInput: string[] = [
    'aaaa',
    'bbbb',
    'cccc',
    'dddd'
  ]

  const sampleInput: string[] = [
    'Sabqponm',
    'abcryxxl',
    'accszExk',
    'acctuvwj',
    'abdefghi',
  ];

  it('should read input', () => {
    let hm = new HeightMap(basicInput);

    expect(Object.keys(hm.space).length).toBe(16);
    expect(hm.space['0,0'].signal).toBe(97);
    expect(hm.space['1,0'].signal).toBe(97);
    expect(hm.space['0,1'].signal).toBe(98);
    expect(hm.space['1,1'].signal).toBe(98);
    expect(hm.space['3,3'].signal).toBe(100);

    expect(hm.graph.path('0,0', '3,3')).toStrictEqual(['0,0','0,1','0,2','0,3','1,3','2,3','3,3']);
  })

  it('should calculate shortest path', () => {
    let hm = new HeightMap(sampleInput);
    expect(hm.start).toBe('0,0');
    expect(hm.finish).toBe('5,2');

    expect(Object.keys(hm.space).length).toBe(40);
    expect(hm.graph.path(hm.start, hm.finish)).toStrictEqual(
      [
        '0,0', '0,1', '1,1', '1,2',
        '1,3', '2,3', '2,4', '3,4',
        '4,4', '5,4', '6,4', '7,4',
        '7,3', '7,2', '7,1', '7,0',
        '6,0', '5,0', '4,0', '3,0',
        '3,1', '3,2', '3,3', '4,3',
        '5,3', '6,3', '6,2', '6,1',
        '5,1', '4,1', '4,2', '5,2'
        ]
    );
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('517');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('');
  });
});
