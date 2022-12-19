
import solution, { ElfSensorZone } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  let sampleInput: string[] = [
    'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
    'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
    'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
    'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
    'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
    'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
    'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
    'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
    'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
    'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
    'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
    'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
    'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
    'Sensor at x=20, y=1: closest beacon is at x=15, y=3'
  ];

  it('should read input', () => {
    let zone = new ElfSensorZone(sampleInput);

    expect(zone.sensors.length).toBe(14);
    expect(zone.sensors[0].pos).toStrictEqual({x: 2, y: 18});
    expect(zone.sensors[0].beacon).toStrictEqual({x: -2, y: 15});
    expect(zone.sensors[0].dist).toStrictEqual(7);
    expect(zone.sensors[1].pos).toStrictEqual({x: 9, y: 16});
    expect(zone.sensors[1].beacon).toStrictEqual({x: 10, y: 16});
    expect(zone.sensors[1].dist).toStrictEqual(1);
    expect(zone.sensors[2].pos).toStrictEqual({x: 13, y: 2});
    expect(zone.sensors[2].beacon).toStrictEqual({x: 15, y: 3});
    expect(zone.sensors[2].dist).toStrictEqual(3);

    expect([...zone.beacons].length).toBe(6);
    expect([...zone.beacons][0]).toBe('-2,15');
    expect([...zone.beacons][1]).toBe('10,16');
    expect([...zone.beacons][2]).toBe('15,3');
    expect([...zone.beacons][3]).toBe('2,10');
    expect([...zone.beacons][4]).toBe('25,17');
    expect([...zone.beacons][5]).toBe('21,22');

    expect(zone.minx).toBe(-8);
    expect(zone.maxx).toBe(28);
  });

  it('should find empty positions', () => {
    let zone = new ElfSensorZone(sampleInput);

    expect(zone.findEmptyPositionCount(10)).toBe(26);
  })

  it('should find missing position', () => {
    let zone = new ElfSensorZone(sampleInput);

    expect(zone.findMissingPositionId(20)).toBe(56000011);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('5335787');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('13673971349056');
  });
});
