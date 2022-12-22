import { query } from '../utils/query';
import request from '../utils/request';

/**
 * @description 获取首页商品数据
 * @param {{keyword?: string,limit:number,page:number,sort?:"price_up"|"price_down"}} queryObj
 */
export const getProductList = queryObj =>
  request({
    method: 'POST',
    url: '/frontend/goods/list'.concat('?', query(queryObj)),
  });

/**
 * @description 获取轮播图数据
 */
export const getCarouselChartData = () =>
  request({ method: 'POST', url: '/frontend/rotation/list' });
