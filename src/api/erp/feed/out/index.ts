import request from '@/config/axios'

// ERP 饲料谷 VO
 export interface feedOutBoundVO {
  id: number,
   contractNo: String, //合同编号
   outboundDate:String, //出库日期
    unitPrice:number,//结算单价(元/斤)
    weight:number ,//重量(斤)
    totalAmount:number, //金额
    paymentMethod:String, //支付方式(cash:现金, company_scan:公司扫码, private_transfer:私人转账)
    packingType:String, //包装类型(packed:包装, bulk:散装)
    isPaid:String,  // 是否付款(0:未付, 1:已付)
    customerName: String, //客户名称
    customerPhone: String, //客户电话,
    customerAddress: String,//客户地址
    payeeName:String, //收款人
    remark:String //备注
}

// 饲料谷管理 API
 export const FeedOutBoundApi = {
  // 查询供应商分页
  getFeedOutPage: async (params: any) => {
    return await request.get({ url: `/erp/feed/out/page`, params })
  },

  // 获得供应商精简列表
  getFeedOutSimpleList: async () => {
    return await request.get({ url: `/erp/feed/out/simple-list` })
  },

  // 查询供应商详情
  getFeedOut: async (id: number) => {
    return await request.get({ url: `/erp/feed/out/get?id=` + id })
  },

  // 新增供应商
  createOutFeed: async (data: feedStorageVO) => {
    return await request.post({ url: `/erp/feed/out/create`, data })
  },

  // 修改供应商
  updateOutFeed: async (data: feedStorageVO) => {
    return await request.put({ url: `/erp/feed/out/update`, data })
  },

  // 删除供应商
  deleteOutFeed: async (id: number) => {
    return await request.delete({ url: `/erp/feed/out/delete?id=` + id })
  },

  // 导出供应商 Excel
  exportOutFeed: async (params) => {
    return await request.download({ url: `/erp/feed/out/export-excel`, params })
  }
}
