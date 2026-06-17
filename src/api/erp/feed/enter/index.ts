import request from '@/config/axios'

// ERP 饲料谷 VO
 export interface feedStorageVO {
  id: number // 车辆编号
   contractNo: String, //合同编号
    customerName: String, //客户名称
    customerPhone: String //客户电话,
    originSource: String,//货源地
    unitPrice:number,//结算单价
    netWeight:number,//净重
    totalAmount:number, //金额
    storageTime:String, //入库时间
    plateNumber:String, //车牌号
    freight:number, //运费
    remark:String //备注
}

// 饲料谷管理 API
 export const FeedEnterApi = {
  // 查询供应商分页
  getFeedEnterPage: async (params: any) => {
    return await request.get({ url: `/erp/feed/enter/page`, params })
  },

  // 获得供应商精简列表
  getFeedEnterSimpleList: async () => {
    return await request.get({ url: `/erp/feed/enter/simple-list` })
  },

  // 查询供应商详情
  getFeedEnter: async (id: number) => {
    return await request.get({ url: `/erp/feed/enter/get?id=` + id })
  },

  // 新增供应商
  createFeed: async (data: feedStorageVO) => {
    return await request.post({ url: `/erp/feed/enter/create`, data })
  },

  // 修改供应商
  updateFeed: async (data: feedStorageVO) => {
    return await request.put({ url: `/erp/feed/enter/update`, data })
  },

  // 删除供应商
  deleteFeed: async (id: number) => {
    return await request.delete({ url: `/erp/feed/enter/delete?id=` + id })
  },

  // 导出供应商 Excel
  exportFeed: async (params) => {
    return await request.download({ url: `/erp/feed/enter/export-excel`, params })
  }
}
