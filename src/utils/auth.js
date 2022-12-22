/**
 * @description 获取本地token
 * @return {string}
 */
export const getToken = () => localStorage.getItem('token');

/**
 * @description 设置本地token
 * @param {string} token
 */
export const setToken = token => localStorage.setItem('token', token);

/**
 * @description 删除本地token
 */
export const removeToken = () => localStorage.removeItem('token');
