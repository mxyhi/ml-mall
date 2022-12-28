import { query } from '@/utils/query';
import request from '@/utils/request';

/**
 * @description
 * @param {{limit:number,page:number}} queyObj
 */
export const articleList = queyObj =>
  request({
    method: 'POST',
    url: '/frontend/article/list'.concat('?', query(queyObj)),
  });

/**
 * @description 添加种草文章
 * @param {{title: string,desc:string,pic_url:string,detail:string}} articleInfo 文章信息
 */
export const addArticle = articleInfo =>
  request({
    method: 'POST',
    url: '/frontend/article/add',
    data: (() => {
      const formData = new FormData();
      Object.keys(articleInfo).forEach(key =>
        formData.set(key, articleInfo[key])
      );
      return formData;
    })(),
  });
