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
    <el-form-item label="合同编号" prop="contractNo">
            <el-input
              v-model="queryParams.contractNo"
              placeholder="请输入合同编号"
              clearable
              @keyup.enter="handleQuery"
              class="!w-240px"
            />
          </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['erp:feed:out:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['erp:feed:out:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
       <el-table-column label="合同编号" align="center" prop="contractNo" />
            <el-table-column label="客户名称" align="center" prop="customerName" />
            <el-table-column label="客户手机号" align="center" prop="customerPhone" />
            <el-table-column label="客户地址" align="center" prop="customerAddress" />
            <el-table-column label="出库日期" align="center" >
            <template #default="scope">
            {{ formatDate(scope.row.outboundDate, 'YYYY-MM-DD') }}
            </template>
             </el-table-column>
            <el-table-column label="结算单价" align="center" prop="unitPrice" />
            <el-table-column label="重量" align="center" prop="weight" />
            <el-table-column label="金额" align="center" prop="totalAmount" />
             <el-table-column label="支付方式" align="center" prop="paymentMethod" >
             <template #default="scope">
               <div>
                 <p v-if="scope.row.paymentMethod === '1'">公司扫码</p>
                 <p v-else-if="scope.row.paymentMethod === '2'">现金</p>
                 <p v-else-if="scope.row.paymentMethod === '3'">私人转账</p>
                 <p v-else>对公转账</p>
               </div>
             </template>
             </el-table-column>
             <el-table-column label="包装类型" align="center" prop="packingType" >
             <template #default="scope">
                            <div>
                              <p v-if="scope.row.packingType === '1'">包装</p>
                              <p v-else>散装</p>
                            </div>
                          </template>
             </el-table-column>
             <el-table-column label="是否付款" align="center" prop="isPaid" >
              <template #default="scope">
                                         <div>
                                           <p v-if="scope.row.isPaid === '0'">未付</p>
                                           <p v-else>已付</p>
                                         </div>
                                       </template>
             </el-table-column>
             <el-table-column label="收款人" align="center" prop="payeeName" />
            <el-table-column label="备注" align="center" prop="remark" />
            <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['erp:feed:out:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['erp:feed:out:delete']"
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
  <FeedOutForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { dateFormatter,formatDate } from '@/utils/formatTime'
import download from '@/utils/download'
import { FeedOutBoundApi, feedOutBoundVO } from '@/api/erp/feed/out'
import FeedOutForm from './FeedOutForm.vue'

/** ERP 饲料谷 列表 */
defineOptions({ name: 'FeedOut' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<feedOutBoundVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  contractNo: undefined,
  customerName: undefined,
  customerPhone: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await FeedOutBoundApi.getFeedOutPage(queryParams)
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

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await FeedOutBoundApi.deleteOutFeed(id)
    message.success(t('common.delSuccess'))
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
    const data = await FeedOutBoundApi.exportOutFeed(queryParams)
    download.excel(data, 'ERP 饲料谷入库.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
