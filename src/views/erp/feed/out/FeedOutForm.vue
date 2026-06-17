<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="合同编号" prop="contractNo">
            <el-input v-model="formData.contractNo" placeholder="请输入合同编号" />
          </el-form-item>
        </el-col>
         <el-col :span="12">
             <el-form-item label="出库日期" prop="outboundDate">
              <el-date-picker
                           v-model="formData.outboundDate"
                           placeholder="出库日期"
                           type="date"
                           value-format="x"
                           class="!w-1/1"
                    />
                </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="包装类型" prop="packingType">
                  <el-select
                  v-model="formData.packingType"
                  placeholder="请选择包装类型"
                  class="!w-1/1">
                  <el-option label="包装" value="1"/>
                  <el-option label="散装" value="2"/>
                  </el-select>
                 </el-form-item>
              </el-col>
            <el-col :span="12">
                             <el-form-item label="结算单价(元/斤)" prop="unitPrice">
                               <el-input v-model="formData.unitPrice" placeholder="请输入结算单价" />
                             </el-form-item>
                           </el-col>
            <el-col :span="12">
                     <el-form-item label="重量(斤)" prop="weight">
                       <el-input v-model="formData.weight" placeholder="请输入净重" />
                     </el-form-item>
                   </el-col>

             <el-col :span="12">
                    <el-form-item label="金额(元)" prop="totalAmount">
                      <el-input v-model="formData.totalAmount" placeholder="请输入金额" />
                    </el-form-item>
                   </el-col>
              <el-col :span="12">
             <el-form-item label="支付方式" prop="paymentMethod">
                                 <el-select
                                 v-model="formData.paymentMethod"
                                 placeholder="请选择支付方式"
                                 class="!w-1/1">
                                 <el-option label="公司扫码" value="1"/>
                                 <el-option label="现金" value="2"/>
                                 <el-option label="私人转账" value="3"/>
                                 <el-option label="对公转账" value="4"/>
                                 </el-select>
              </el-form-item>
             </el-col>
                <el-col :span="12">
                <el-form-item label="是否付款" prop="isPaid">
                     <el-select
                       v-model="formData.isPaid"
                       placeholder="请选择是否付款"
                       class="!w-1/1">
                       <el-option label="未付" value="0"/>
                       <el-option label="已付" value="1"/>
                       </el-select>
                       </el-form-item>
                   </el-col>

                  <el-col :span="12">
                    <el-form-item label="收款人" prop="payeeName">
                      <el-input v-model="formData.payeeName" placeholder="请输入收款人" />
                    </el-form-item>
                  </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="formData.customerName" placeholder="请输入客户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
                  <el-form-item label="客户手机号" prop="customerPhone">
                    <el-input v-model="formData.customerPhone" placeholder="请输入客户手机号" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                          <el-form-item label="客户地址" prop="customerAddress">
                            <el-input v-model="formData.customerAddress" placeholder="请输入客户地址" />
                          </el-form-item>
                        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { FeedOutBoundApi, feedOutBoundVO } from '@/api/erp/feed/out'
import { CommonStatusEnum } from '@/utils/constants'

/** ERP  表单 */
defineOptions({ name: 'FeedOutForm' })
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
        id: undefined,
        contractNo: undefined, //合同编号
        outboundDate:undefined, //出库日期
         unitPrice:undefined,//结算单价(元/斤)
         weight:undefined ,//重量(斤)
         totalAmount:undefined, //金额
         paymentMethod:'0', //支付方式(cash:现金, company_scan:公司扫码, private_transfer:私人转账)
         packingType:undefined, //包装类型(packed:包装, bulk:散装)
         isPaid:undefined,  // 是否付款(0:未付, 1:已付)
         customerName: undefined, //客户名称
         customerPhone: undefined, //客户电话,
         customerAddress: undefined,//客户地址
         payeeName:undefined, //收款人
         remark:undefined //备注
})
const formRules = reactive({
  contractNo: [{ required: true, message: '合同编号不能为空', trigger: 'blur' }],
  customerName: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
  customerPhone: [{ required: true, message: '客户手机号不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  console.log(type)
  resetForm()
  formType.value = type
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await FeedOutBoundApi.getFeedOut(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {

    const data = formData.value as unknown as feedOutBoundVO
    if (formType.value === 'create') {
      await FeedOutBoundApi.createOutFeed(data)
      message.success(t('common.createSuccess'))
    } else {
      await FeedOutBoundApi.updateOutFeed(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {

  formData.value = {
   id: undefined,
      contractNo: undefined, //合同编号
      outboundDate:undefined, //出库日期
       unitPrice:undefined,//结算单价(元/斤)
       weight:undefined ,//重量(斤)
       totalAmount:undefined, //金额
       paymentMethod:undefined, //支付方式(cash:现金, company_scan:公司扫码, private_transfer:私人转账)
       packingType:undefined, //包装类型(packed:包装, bulk:散装)
       isPaid:undefined,  // 是否付款(0:未付, 1:已付)
       customerName: undefined, //客户名称
       customerPhone: undefined, //客户电话,
       customerAddress: undefined,//客户地址
       payeeName:undefined, //收款人
       remark:undefined //备注
  }
  formRef.value?.resetFields()
}
</script>
