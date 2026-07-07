<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" width="600">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
      :disabled="disabled"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="支付时间" prop="payTime">
            <el-date-picker
              v-model="formData.payTime"
              type="date"
              value-format="x"
              placeholder="支付时间"
              class="!w-1/1"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
            <el-form-item label="支付方式" prop="payType">
              <el-select
                v-model="formData.payType"
                placeholder="请选择支付方式"
                class="!w-1/1"
              >
                <el-option label="银行卡" value="1"/>
                <el-option label="现金" value="2"/>
                <el-option label="微信" value="3"/>
              </el-select>
            </el-form-item>
           </el-col>
            <el-col :span="24">
               <el-form-item label="应付金额" prop="shouldPay">
               <el-input
               type="text"
               v-model="formData.shouldPay"
               class="!w-1/1"
               placeholder="请输入金额"
                @input="calcAmount"/>
               </el-form-item>
              </el-col>

            <el-col :span="24">
              <el-form-item label="实付金额" prop="realPay">
              <el-input
              type="text"
              v-model="formData.realPay"
              class="!w-1/1"
              placeholder="请输入金额"
               />
              </el-form-item>
             </el-col>

              <el-col :span="16">
                        <el-form-item label="是否完结">
                                 <el-radio-group v-model="formData.isFinish">
                                   <el-radio :label="1">已完结</el-radio>
                                   <el-radio :label="0">未完结</el-radio>
                                 </el-radio-group>
                                </el-form-item>
                     </el-col>

      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading" v-if="!disabled">
        确 定
      </el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>

</template>
<script setup lang="ts">
import { PurchaseInApi, PurchasePayVo } from '@/api/erp/purchase/in'
import PurchaseInItemForm from './components/PurchaseInItemForm.vue'
import { AccountApi, AccountVO } from '@/api/erp/finance/account'
import { erpPriceInputFormatter, erpPriceMultiply } from '@/utils'
import PurchaseOrderInEnableList from '@/views/erp/purchase/order/components/PurchaseOrderInEnableList.vue'
import { PurchaseOrderVO } from '@/api/erp/purchase/order'
import * as UserApi from '@/api/system/user'
import { SupplierApi, SupplierVO } from '@/api/erp/purchase/supplier'

/** ERP 湿稻谷入库表单 */
defineOptions({ name: 'PayForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改；detail - 详情
const formData = ref({
 payTime: undefined,
    payType: '1',
         shouldPay: undefined,
         realPay:'',
         isFinish:0,
         tempPay:undefined
})
const formRules = reactive({
  payTime: [{ required: true, message: '支付时间不能为空', trigger: 'blur' }],
  realPay: [{ required: true, message: '实付金额不能为空', trigger: 'blur' }]
})
const disabled = computed(() => formType.value === 'detail')
const formRef = ref() // 表单 Ref


/** 打开弹窗 */
const open = async (amount?: number,realPay?: number,orderNo?: String) => {
  dialogVisible.value = true
  dialogTitle.value = '粮食收购支付'
  resetForm()
  formData.value.tempPay = realPay
  formData.value.shouldPay = amount-realPay
  formData.value.orderNo = orderNo
}

const openKkkk = async () => {
  dialogVisible.value = true
  dialogTitle.value = '粮食收购支付'
  resetForm()
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
   addAmount()
    const data = formData.value as unknown as PurchasePayVo
    dialogVisible.value = true
     await PurchaseInApi.createPurchasePay(data)
     message.success(t('common.createSuccess'))
      dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

const addAmount = () => {
  // 第一步：转数字，空值默认为 0
  let shouldPay = parseFloat(formData.value.tempPay || 0)
  let realPay = parseFloat(formData.value.realPay || 0)

  // 第二步：相加
  let total = shouldPay + realPay

  // 第三步：保留 2 位小数（金额必须保留）
  total = total.toFixed(2)
  formData.value.tempPay = total
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
   payTime: undefined,
      payType: '1',
              shouldPay: '',
              realPay:'',
              isFinish:0,
              tempPay:undefined
  }
  formRef.value?.resetFields()
}


</script>
