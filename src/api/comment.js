import request from '@/utils/request';

export const getComments = info =>
  request({
    method: 'POST',
    url: '/frontend/comment/add/',
    data: () => {
      const data = new FormData();
      Object.keys(info).forEach(it => {
        data.set(it, info[it]);
      });
      return data;
    },
  });

export const addCommentApi = info =>
  request({
    method: 'POST',
    url: '/frontend/comment/add/',
    data: (() => {
      const data = new FormData();
      Object.keys(info).forEach(key => {
        data.append(key, info[key]);
      });
      return data;
    })(),
  });
