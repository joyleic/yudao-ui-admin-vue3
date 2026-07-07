<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="粮食品种" prop="grainType">
                          <el-select
                            v-model="queryParams.grainType"
                            placeholder="请选择粮食品种"
                            class="!w-240px"
                          >
                           <el-option label="全部" value=""/>
                            <el-option label="普杂" value="1"/>
                            <el-option label="泰优" value="2"/>
                            <el-option label="天龙" value="3"/>
                            <el-option label="优质稻" value="4"/>
                          </el-select>
                        </el-form-item>
      <el-form-item label="售粮人" prop="sellerName">
        <el-select
          v-model="queryParams.sellerName"
          clearable
          filterable
          placeholder="请选择产品"
          class="!w-240px"
        >
          <el-option
                         v-for="item in supplierList"
                         :key="item.name"
                         :label="item.name"
                         :value="item.name"
                       />
        </el-select>
      </el-form-item>
      <el-form-item label="入库时间" prop="inTime">
        <el-date-picker
          v-model="queryParams.inTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="付款状态" prop="isFinish">
        <el-select
          v-model="queryParams.isFinish"
          placeholder="请选择有款状态"
          clearable
          class="!w-240px"
        >
          <el-option label="未付款" value="0" />
          <el-option label="已付款" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['erp:purchase-in:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['erp:purchase-in:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
          type="danger"
          plain
          @click="handleDelete(selectionList.map((item) => item.id))"
          v-hasPermi="['erp:purchase-in:delete']"
          :disabled="selectionList.length === 0"
        >
          <Icon icon="ep:delete" class="mr-5px" /> 删除
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table
      v-loading="loading"
      :data="list"
      :stripe="true"
      :show-overflow-tooltip="true"
      @selection-change="handleSelectionChange"
    >

          <el-table-column
            label="入库时间"
            align="center"
            prop="purchaseTime"
            :formatter="dateFormatter2"
            width="120px"
          />

            <el-table-column prop="sellerName" label="售粮人"  align="center"/>
            <el-table-column  label="粮食品种"  align="center">
            <template #default="scope">
              <span v-if="scope.row.grainType === 1">
                普杂
              </span>
               <span v-if="scope.row.grainType === 2">
                                            泰优
                                      </span>
             <span v-if="scope.row.grainType === 3">
                                            天龙
                                      </span>
               <span v-if="scope.row.grainType === 4">
                                             优质稻
                                       </span>
            </template>
            </el-table-column>
            <el-table-column  label="季节" align="center">
            <template #default="scope">
              <span v-if="scope.row.season === 1">
                    早稻
              </span>
             <span v-if="scope.row.season === 2">
                                            中稻
                                      </span>
             <span v-if="scope.row.season === 3">
                                            晚稻
                                      </span>
             </template>
            </el-table-column>
            <el-table-column  label="稻谷状态" align="center">
            <template #default="scope">
                          <span v-if="scope.row.grainStatus === 1">
                                湿稻谷
                          </span>
                         <span v-if="scope.row.grainStatus === 2">
                               干稻谷
                          </span>
                         </template>
              </el-table-column>
           <el-table-column prop="plateNo" label="车牌号" align="center"/>
           <el-table-column prop="grossWeight" label="毛重(KG)" align="center"/>
           <el-table-column prop="tareWeight" label="皮重(KG)" align="center"/>
           <el-table-column prop="netWeight" label="净重(KG)" align="center"/>
           <el-table-column prop="moisture" label="水分" align="center" />
           <el-table-column prop="heavyMetal" label="重金属"  align="center"/>
           <el-table-column prop="deduction" label="扣杂"  align="center"/>
           <el-table-column prop="unitPrice" label="单价"  align="center"/>
           <el-table-column prop="amount" label="应付金额(元)"  align="center"/>
           <el-table-column prop="realPay" label="已付金额(元)"  align="center"/>
           <el-table-column prop="unloader" label="卸车人"  align="center"/>


      <el-table-column label="操作" align="center" fixed="right" width="220">
        <template #default="scope">
          <el-button
            link
            @click="openPay(scope.row.amount,scope.row.realPay,scope.row.id)"
            v-hasPermi="['erp:purchase-in:pay']"
             v-if="scope.row.isFinish === '0'"
          >
            支付
          </el-button>

          <el-button
            link
            @click="openPrint(scope.row.id)"
            v-hasPermi="['erp:purchase-in:print']"
          >
            打印
          </el-button>
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['erp:purchase-in:update']"
            :disabled="scope.row.status === 20"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete([scope.row.id])"
            v-hasPermi="['erp:purchase-in:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <PurchaseInForm ref="formRef" @success="getList" />
  <PrintSettlement ref="printRef"/>
  <PayForm ref="payRef" @success="getList"/>
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter2 } from '@/utils/formatTime'
import download from '@/utils/download'
import { PurchaseInApi, PurchaseInVO } from '@/api/erp/purchase/in'
import PurchaseInForm from './PurchaseInForm.vue'
import PayForm from './PayForm.vue'
import PrintSettlement from './PrintSettlement.vue'
import { ProductApi, ProductVO } from '@/api/erp/product/product'
import { UserVO } from '@/api/system/user'
import * as UserApi from '@/api/system/user'
import {
  erpCountTableColumnFormatter,
  erpPriceInputFormatter,
  erpPriceTableColumnFormatter
} from '@/utils'
import { WarehouseApi, WarehouseVO } from '@/api/erp/stock/warehouse'
import { AccountApi, AccountVO } from '@/api/erp/finance/account'
import { SupplierApi, SupplierVO } from '@/api/erp/purchase/supplier'

/** ERP 销售入库列表 */
defineOptions({ name: 'ErpPurchaseIn' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<PurchaseInVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  no: undefined,
  inTime: [],
  orderNo: undefined,
  sellerName:undefined,
  isFinish: undefined,
  accountId: undefined,
  status: undefined,
  remark: undefined,
  creator: undefined,
  grainType:undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中
const productList = ref<ProductVO[]>([]) // 产品列表
const supplierList = ref<SupplierVO[]>([]) // 供应商列表
const userList = ref<UserVO[]>([]) // 用户列表
const warehouseList = ref<WarehouseVO[]>([]) // 仓库列表
const accountList = ref<AccountVO[]>([]) // 账户列表

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await PurchaseInApi.getPurchaseInPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

const printRef = ref()
const openPrint = (id?: number)=>{
  printRef.value.open(id)
}

const payRef = ref()
const openPay = (amount?: number,realPay?: number,id?: number)=>{
        payRef.value.open(amount,realPay,id)
      }

/** 删除按钮操作 */
const handleDelete = async (ids: number[]) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await PurchaseInApi.deletePurchaseIn(ids)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
    selectionList.value = selectionList.value.filter((item) => !ids.includes(item.id))
  } catch {}
}

/** 审批/反审批操作 */
const handleUpdateStatus = async (id: number, status: number) => {
  try {
    // 审批的二次确认
    await message.confirm(`确定${status === 20 ? '审批' : '反审批'}该入库吗？`)
    // 发起审批
    await PurchaseInApi.updatePurchaseInStatus(id, status)
    message.success(`${status === 20 ? '审批' : '反审批'}成功`)
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await PurchaseInApi.exportPurchaseIn(queryParams)
    download.excel(data, '销售入库.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 选中操作 */
const selectionList = ref<PurchaseInVO[]>([])
const handleSelectionChange = (rows: PurchaseInVO[]) => {
  selectionList.value = rows
}

/** 初始化 **/
onMounted(async () => {
  await getList()
    // 加载供应商列表
      supplierList.value = await SupplierApi.getSupplierSimpleList()
  // 加载产品、仓库列表、供应商
   //productList.value = await ProductApi.getProductSimpleList()
   //supplierList.value = await SupplierApi.getSupplierSimpleList()
   //userList.value = await UserApi.getSimpleUserList()
   //warehouseList.value = await WarehouseApi.getWarehouseSimpleList()
   //accountList.value = await AccountApi.getAccountSimpleList()
})
// TODO 芋艿：可优化功能：列表界面，支持导入
// TODO 芋艿：可优化功能：详情界面，支持打印
</script>
