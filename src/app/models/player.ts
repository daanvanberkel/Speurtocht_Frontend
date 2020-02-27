interface GoogleCredentials {
  id?: string;
}

interface FacebookCredentials {
  id?: string;
}

interface LocalCredentials {
  password?: string;
}

export class Player {
  constructor(props = null) {
    if (props) {
      Object.assign(this, props);
    }
  }

  _id?: string;
  username: string;
  name: string;
  roles?: string[];
  google?: GoogleCredentials;
  facebook?: FacebookCredentials;
  local?: LocalCredentials;

  isAdmin(): boolean {
    return this.roles.indexOf('admin') > -1;
  }
}
