export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface CategoryObj {
  id: number;
  name: string;
  category1Id?: number;
  category2Id?: number;
}
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}
export interface CategoryState {
  c1Id: number | string;
  c1Arr: CategoryObj[];
  c2Arr: CategoryObj[];
  c2Id: number | string;
  c3Arr: CategoryObj[];
  c3Id: number | string;
}
export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}
export type AttrValueList = AttrValue[];
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}
export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData {
  data: AttrList;
}
