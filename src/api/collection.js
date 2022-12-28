import request from '@/utils/request';
import { query } from '@/utils/query';

/**
 * @description 添加收藏
 * @param {{type: string,object_id:string}} info
 */
export const addCollection = info =>
  request({
    method: 'POST',
    url: '/frontend/collection/add/',
    data: (() => {
      const formData = new FormData();
      Object.keys(info).forEach(key => {
        formData.set(key, info[key]);
      });
      return formData;
    })(),
  });

/**
 * @description 删除收藏
 * @param {{id: string}} info
 */
export const deleteCollection = info =>
  request({
    method: 'POST',
    url: '/frontend/collection/delete/',
    data: (() => {
      const formData = new FormData();
      Object.keys(info).forEach(key => {
        formData.set(key, info[key]);
      });
      return formData;
    })(),
  });

/**
 * @description 获取收藏
 * @param {{type:string,page:string,limit:string}} queryObj
 */
export const getCollectionList = queryObj =>
  request({
    method: 'POST',
    url: '/frontend/collection/list/'.concat('?', query(queryObj)),
  });
