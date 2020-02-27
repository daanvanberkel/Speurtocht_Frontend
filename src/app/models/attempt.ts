import {Target} from './target';
import {Player} from './player';

export class Attempt {
  _id: string;
  tags: any[];
  target: Target;
  player: Player;
  path: string;
  score: number;
  date: string;
}
