
import solution, { RoundStrategyGuide } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input part 1', () => {
    let guide = new RoundStrategyGuide(['A Y','B X','C Z'], false)
    expect(guide.strategies.length).toEqual(3)
    expect(guide.strategies[0].opponent).toEqual('R');
    expect(guide.strategies[0].player).toEqual('P');
    expect(guide.strategies[1].opponent).toEqual('P');
    expect(guide.strategies[1].player).toEqual('R');
    expect(guide.strategies[2].opponent).toEqual('S');
    expect(guide.strategies[2].player).toEqual('S');
  });

  it('should score game part 1' , () => {
    let guide = new RoundStrategyGuide(['A Y','B X','C Z'], false)
    expect(guide.strategies[0].playerScore()).toEqual(8)
    expect(guide.strategies[1].playerScore()).toEqual(1)
    expect(guide.strategies[2].playerScore()).toEqual(6)
  })

  it('should read input part 2', () => {
    let guide = new RoundStrategyGuide(['A Y','B X','C Z'], true)
    expect(guide.strategies.length).toEqual(3)
    expect(guide.strategies[0].opponent).toEqual('R');
    expect(guide.strategies[0].outcome).toEqual('D');
    expect(guide.strategies[0].player).toEqual('R');
    expect(guide.strategies[1].opponent).toEqual('P');
    expect(guide.strategies[1].outcome).toEqual('L');
    expect(guide.strategies[1].player).toEqual('R');
    expect(guide.strategies[2].opponent).toEqual('S');
    expect(guide.strategies[2].outcome).toEqual('W');
    expect(guide.strategies[2].player).toEqual('R');
  });

  it('should score game part 2' , () => {
    let guide = new RoundStrategyGuide(['A Y','B X','C Z'], true)
    expect(guide.strategies[0].playerScore()).toEqual(4)
    expect(guide.strategies[1].playerScore()).toEqual(1)
    expect(guide.strategies[2].playerScore()).toEqual(7)
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('9177');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('12111');
  });
});
