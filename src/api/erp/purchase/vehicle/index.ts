import request from '@/config/axios'

// ERP 供应商 VO
 export interface VehicleVO {
  id: number // 车辆编号
  name: string // 车辆姓名
  phone: string // 手机号码
  remark: string // 备注
  licPlateNumber: string // 车牌号
}

// 车辆信息管理 API
 export const VehicleApi = {
  // 查询供应商分页
  getVehiclePage: async (params: any) => {
    return await request.get({ url: `/erp/vehicle/page`, params })
  },

  // 获得供应商精简列表
  getVehicleSimpleList: async () => {
    return await request.get({ url: `/erp/vehicle/simple-list` })
  },

  // 查询供应商详情
  getVehicle: async (id: number) => {
    return await request.get({ url: `/erp/vehicle/get?id=` + id })
  },

  // 新增供应商
  createVehicle: async (data: SupplierVO) => {
    return await request.post({ url: `/erp/vehicle/create`, data })
  },

  // 修改供应商
  updateVehicle: async (data: SupplierVO) => {
    return await request.put({ url: `/erp/vehicle/update`, data })
  },

  // 删除供应商
  deleteVehicle: async (id: number) => {
    return await request.delete({ url: `/erp/vehicle/delete?id=` + id })
  },

  // 导出供应商 Excel
  exportVehicle: async (params) => {
    return await request.download({ url: `/erp/vehicle/export-excel`, params })
  }
}
