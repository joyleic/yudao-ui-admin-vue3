import request from '@/config/axios'

// ERP 采购入库 VO
export interface PurchaseInVO {
  id: number,
     purchaseTime: Date,
      sellerName: String,
       grainType: number,
       season: number,
       grainStatus: number,
        plateNo: String,
        grossWeight: number,
        tareWeight: number,
        netWeight: number,
        moisture: number,
        heavyMetal: number,
        deduction: number,
        unitPrice: number,
        amount: number,
        unloader:String,
        remark: String
}

export interface PurchasePayVo {
  payTime: undefined,
        payType: Date,
        shouldPay: number,
        realPay:number,
        isFinish:number,
        tempPay:number
}

// ERP 采购入库 API
export const PurchaseInApi = {
  // 查询采购入库分页
  getPurchaseInPage: async (params: any) => {
    return await request.get({ url: `/erp/purchase-in/page`, params })
  },

  // 查询采购入库详情
  getPurchaseIn: async (id: number) => {
    return await request.get({ url: `/erp/purchase-in/get?id=` + id })
  },

    // 查询采购入库打印
    getPrint: async (id: number) => {
      return await request.get({ url: `/erp/purchase-in/getPrint?id=` + id })
    },

  // 新增采购入库
  createPurchaseIn: async (data: PurchaseInVO) => {
    return await request.post({ url: `/erp/purchase-in/create`, data })
  },

  // 修改采购入库
  updatePurchaseIn: async (data: PurchaseInVO) => {
    return await request.put({ url: `/erp/purchase-in/update`, data })
  },

  // 更新采购入库的状态
  updatePurchaseInStatus: async (id: number, status: number) => {
    return await request.put({
      url: `/erp/purchase-in/update-status`,
      params: {
        id,
        status
      }
    })
  },

  // 删除采购入库
  deletePurchaseIn: async (ids: number[]) => {
    return await request.delete({
      url: `/erp/purchase-in/delete`,
      params: {
        ids: ids.join(',')
      }
    })
  },

  // 导出采购入库 Excel
  exportPurchaseIn: async (params: any) => {
    return await request.download({ url: `/erp/purchase-in/export-excel`, params })
  },

    // 新增支付入库
    createPurchasePay: async (data: PurchasePayVo) => {
      return await request.post({ url: `/erp/purchase-in/createPay`, data })
    }
}
