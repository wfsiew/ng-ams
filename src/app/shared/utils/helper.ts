import _ from 'lodash';
//import { AppConstant } from 'src/app/shared/constants/app.constant';

export class Helper {

  public static isEmpty(s) {
    return _.isEmpty(s);
  }
  
  public static getStart(page, limit) {
    return (page - 1) * limit;
  }

  public static toDateStr(dt) {
    let ds = dt;
    if (!_.isNull(dt) && !_.isUndefined(dt)) {
      if (typeof dt === 'string' || dt instanceof String) {
        
      }

      else {
        ds = Helper.getDateStr(dt);
      }
    }

    return ds;
  }

  public static getDateStr(dt: Date) {
    if (_.isNull(dt)) {
      return dt;
    }
    
    let s = `${dt.getFullYear()}-${this.paddZero(dt.getMonth() + 1)}-${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  public static getDateStr1(dt: Date) {
    let s = `${dt.getFullYear()}${this.paddZero(dt.getMonth() + 1)}${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  public static paddZero(i: number) {
    let s = `${i}`;
    if (i < 10) {
      s = `0${i}`;
    }

    return s;
  }

  public static replaceNone(s: string) {
    let r = s;
    if (_.isNull(s)) return s;

    if (s.toLowerCase() === 'none') {
      r = '';
    }

    return r;
  }

  public static formatAmount(x: number) {
    return x.toFixed(2);
  }
}