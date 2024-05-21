import Cookies from 'js-cookie';

export enum SecureStorageKeys {
  TOKEN = 'token',
}

class SecureStorageService {
  getItem(key: SecureStorageKeys): string | undefined {
    return Cookies.get(key);
  }

  setItem(key: SecureStorageKeys, value: string) {
    return Cookies.set(key, value);
  }

  removeItem(key: SecureStorageKeys) {
    return Cookies.remove(key);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SecureStorageService();
