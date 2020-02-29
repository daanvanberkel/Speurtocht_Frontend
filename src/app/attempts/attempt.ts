import {Target} from "../targets/target";
import {Player} from "../authentication/player";

export class Attempt {
  _id: string;
  tags: any[];
  target: Target;
  player: Player;
  path: string;
  score: number;
  date: string;
}
