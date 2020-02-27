import {environment} from '../../environments/environment';

class GeoPoint {
  type: string;

  coordinates: number[];
}

export class Target {
  constructor(props = null) {
    if (props) {
      Object.assign(this, props);
    }
  }

  _id: string;
  title: string;
  description: string;
  path: string;
  location: GeoPoint;
  player: any;
  date: string;
  hint: string;
  tags: any[];
  thumbs: any[];

  getPhotoUrl(): string {
    return `${environment.api_base}/targets/${this._id}/photo`;
  }
}
