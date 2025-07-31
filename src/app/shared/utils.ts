import { isNullOrUndefined } from '@abp/ng.core';

export class Utils {

  public static isString(i: any) {
    if (!isNullOrUndefined(i)) {
      if (typeof i === 'string' || i instanceof String)
        return true;
    }
    return false;
  }

  public static isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(parseFloat(str))
  }

  public static deepCopy<T>(source: T): T {
    return Array.isArray(source) ? source.map((item) => this.deepCopy(item)) : source instanceof Date
      ? new Date(source.getTime()) : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
          Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
          o[prop] = this.deepCopy(source[prop]);
          return o;
        }, Object.create(Object.getPrototypeOf(source))) : (source as T);
  }

  public static between(from: number, to: number, check: number): boolean {
    const min = Math.min.apply(Math, [from, to]);
    const max = Math.max.apply(Math, [from, to]);
    return check >= min && check <= max;
  }

  public static longCivilCode(code: string): number {
    if (isNullOrUndefined(code) || !code.includes(".")) return 0;
    let array = ["000", "000", "000", "000", "000"];
    code.split('.').forEach((c, i) => array[i] = c.padStart(3, '0'));
    return +("1" + array.join(''));
  }



}
//git remote prune origin
