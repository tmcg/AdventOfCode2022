
import solution, { SandCave } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  const sampleInput = [
    '498,4 -> 498,6 -> 496,6',
    '503,4 -> 502,4 -> 502,9 -> 494,9'
  ];

  it('should read input', () => {
    let cave = new SandCave(sampleInput);

    expect(Object.keys(cave.points).length).toBe(20);
    expect(cave.tileAt('498,4')).toBe('#');
    expect(cave.tileAt('498,5')).toBe('#');
    expect(cave.tileAt('498,6')).toBe('#');
    expect(cave.tileAt('497,6')).toBe('#');
    expect(cave.tileAt('496,6')).toBe('#');
    expect(cave.tileAt('503,4')).toBe('#');
    expect(cave.tileAt('502,4')).toBe('#');
    expect(cave.tileAt('502,5')).toBe('#');
    expect(cave.tileAt('502,6')).toBe('#');
    expect(cave.tileAt('502,7')).toBe('#');
    expect(cave.tileAt('502,8')).toBe('#');
    expect(cave.tileAt('502,9')).toBe('#');
    expect(cave.tileAt('501,9')).toBe('#');
    expect(cave.tileAt('500,9')).toBe('#');
    expect(cave.tileAt('499,9')).toBe('#');
    expect(cave.tileAt('498,9')).toBe('#');
    expect(cave.tileAt('497,9')).toBe('#');
    expect(cave.tileAt('496,9')).toBe('#');
    expect(cave.tileAt('495,9')).toBe('#');
    expect(cave.tileAt('494,9')).toBe('#');
    expect(cave.tileAt('500,1')).toBe('.');
  });

  it('should add sand', () => {
    let cave = new SandCave(sampleInput);

    expect(cave.tileAt('500,8')).toBe('.');
    expect(Object.keys(cave.points).length).toBe(20);
    expect(cave.addSand()).toBe(true);
    expect(cave.tileAt('500,8')).toBe('o');
    expect(Object.keys(cave.points).length).toBe(21);
    expect(cave.addSand()).toBe(true);
    expect(cave.tileAt('499,8')).toBe('o');
    expect(Object.keys(cave.points).length).toBe(22);
    expect(cave.addSand()).toBe(true);
    expect(cave.tileAt('501,8')).toBe('o');
    expect(Object.keys(cave.points).length).toBe(23);
    expect(cave.addSand()).toBe(true);
    expect(cave.tileAt('500,7')).toBe('o');
    expect(Object.keys(cave.points).length).toBe(24);
  });

  it('should let sand fall into the abyss', () => {
    let cave = new SandCave(sampleInput);

    expect(cave.abyss).toBe(11);
    expect(cave.fillCave()).toBe(24);
  });

  it('should let sand fill the entire cave', () => {
    let cave = new SandCave(sampleInput, true);

    expect(cave.abyss).toBe(11);
    expect(cave.fillCave()).toBe(93);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('692');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('31706');
  });
});
