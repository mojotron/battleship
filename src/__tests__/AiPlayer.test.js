import AiPlayer from '../scripts/factories/AiPlayer';

describe('Computer player factory', () => {
  let ai;

  beforeEach(() => {
    ai = AiPlayer();
  });

  test('create new ai player', () => {
    const ships = ai.board.filter(cell => cell.hasShip).length;
    expect(ai.board.length).toBe(100);
    expect(ships).toBe(17);
  });

  test('keep track of available moves after attack', () => {
    // test attack method side effect of removing available move
    expect(ai.availableAttacks.length).toBe(100);
    ai.attack();
    expect(ai.availableAttacks.length).toBe(99);
    ai.attack();
    expect(ai.availableAttacks.length).toBe(98);
  });

  test('no more available moves', () => {
    for (let i = 0; i < 100; i += 1) ai.attack();
    expect(ai.attack()).toBe(-1);
  });

  test('attack returns integer in range', () => {
    const attack1 = ai.attack();
    expect(attack1).toBeGreaterThanOrEqual(0);
    expect(attack1).toBeLessThan(100);
    const attack2 = ai.attack();
    expect(attack2).toBeGreaterThanOrEqual(0);
    expect(attack2).toBeLessThan(100);
    const attack3 = ai.attack();
    expect(attack3).toBeGreaterThanOrEqual(0);
    expect(attack3).toBeLessThan(100);
  });

  test('receive attack', () => {});
});
