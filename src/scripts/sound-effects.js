import cannon from '../sounds/cannon-fire.mp3';
import waterHit from '../sounds/water-splash.mp3';
import shipHit from '../sounds/ship-explosion.mp3';
import abandonShip from '../sounds/abandon-ship.mp3';
import { wait } from './helpers';

const SoundEffects = () => {
  const cannonFire = new Audio(cannon);
  const waterSplash = new Audio(waterHit);
  waterSplash.volume = 0.2;
  const shipExplosion = new Audio(shipHit);
  const shipSunk = new Audio(abandonShip);

  const rewindAll = () => {
    shipSunk.pause();
    cannonFire.pause();
    shipExplosion.pause();
    waterSplash.pause();

    cannonFire.currentTime = 0;
    waterSplash.currentTime = 0;
    shipExplosion.currentTime = 0;
    shipSunk.currentTime = 0;
  };

  const miss = () => {
    rewindAll();
    cannonFire
      .play()
      .then(() => wait(500))
      .then(() => waterSplash.play());
  };

  const hit = () => {
    rewindAll();
    cannonFire
      .play()
      .then(() => wait(500))
      .then(() => shipExplosion.play());
  };

  const sunk = () => {
    rewindAll();
    cannonFire
      .play()
      .then(() => wait(500))
      .then(() => shipExplosion.play())
      .then(() => wait(500))
      .then(() => shipSunk.play());
  };

  const coordinator = attackReport => {
    if (attackReport === undefined) return;
    if (attackReport.hit && !attackReport.sunk) hit();
    if (!attackReport.hit && !attackReport.sunk) miss();
    if (attackReport.sunk) sunk();
  };

  return { coordinator };
};

export default SoundEffects();
