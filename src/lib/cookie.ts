import Cookies from 'js-cookie';

const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(key, value, options);
};

const getCookie = (key: string) => {
  return Cookies.get(key);
};

const removeCookie = (key: string, options?: Cookies.CookieAttributes) => {
  Cookies.remove(key, options);
};

export { getCookie, removeCookie, setCookie };
