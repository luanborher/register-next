import { APP_ROUTES } from 'constants/app-routes';

/**
 *
 * @param asPath string
 * @returns boolean
 */

export const checkIsPublicRoute = (asPath: string): boolean => {
  const publicRoutes = Object.values(APP_ROUTES.public);
  return publicRoutes.includes(asPath);
};
