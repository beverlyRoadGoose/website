import CookieManager from '@/util/CookieManager';

export function createDefaultThemeCookie() {
  let themeCookie = 'theme';
  if (!CookieManager.cookieExists(themeCookie)) {
    CookieManager.createCookie(themeCookie, 'light', 365);
  }
}
