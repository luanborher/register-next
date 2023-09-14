export const checkUserAuthenticated = () => {
  const userToken = localStorage.getItem('@register:user');

  return !!userToken;
};
