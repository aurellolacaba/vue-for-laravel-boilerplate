import { useLocalStorage } from '@vueuse/core';

export const authGuard = (to, from, next) => {
  const token = useLocalStorage('access_token', null);

  if (to.meta.requiresAuth && !token.value) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token.value) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};