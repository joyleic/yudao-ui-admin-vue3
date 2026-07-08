<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" width="1440">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
      :disabled="disabled"
    >
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="收购时间" prop="purchaseTime">
            <el-date-picker
              v-model="formData.purchaseTime"
              type="date"
              value-format="x"
              placeholder="选择收购时间"
              class="!w-1/1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="售粮人姓名" prop="sellerName">
            <el-select
              v-model="formData.sellerName"
              clearable
              filterable
              placeholder="请选择客户"
              class="!w-1/1"
            >
              <el-option
                v-for="item in supplierList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
                  <el-form-item label="粮食品种" prop="grainType">
                    <el-select
                      v-model="formData.grainType"
                      placeholder="请选择粮食品种"
                      class="!w-1/1"
                    >
                      <el-option label="普杂" value="1"/>
                      <el-option label="泰优" value="2"/>
                      <el-option label="天龙" value="3"/>
                      <el-option label="优质稻" value="4"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                   <el-col :span="5">
                      <el-form-item label="季节" prop="season">
                      <el-select
                      v-model="formData.season"
                      placeholder="请选择水稻季节"
                      class="!w-1/1">
                      <el-option label="早稻" value="1"/>
                      <el-option label="中稻" value="2"/>
                      <el-option label="晚稻" value="3"/>
                      </el-select>
                      </el-form-item>
                   </el-col>
                   <el-col :span="5">
                     <el-form-item label="稻谷状态" prop="grainStatus">
                     <el-select
                     v-model="formData.grainStatus"
                     placeholder="请选择稻谷状态"
                     class="!w-1/1">
                     <el-option label="湿稻谷" value="1"/>
                     <el-option label="干稻谷" value="2"/>
                     </el-select>
                     </el-form-item>
                </el-col>

<el-col :span="5">
          <el-form-item label="车牌号" prop="plateNo">
            <el-select
              v-model="formData.plateNo"
              clearable
              filterable
              placeholder="请选择车牌号"
              class="!w-1/1"
            >
              <el-option
                v-for="item in plateList"
                :key="item.licPlateNumber"
                :label="item.licPlateNumber"
                :value="item.licPlateNumber"
              />
            </el-select>
          </el-form-item>
          </el-col>

          <el-col :span="5">
                            <el-form-item label="毛重（KG）" prop="grossWeight">
                              <el-input
                                type="text"
                                v-model="formData.grossWeight"
                                class="!w-1/1"
                                placeholder="请输入重量"
                              />
                            </el-form-item>
                          </el-col>
          <el-col :span="5">
           <el-form-item label="皮重（KG）" prop="tareWeight">
                                        <el-input
                                          type="text"
                                          v-model="formData.tareWeight"
                                          class="!w-1/1"
                                          placeholder="请输入重量"
                                          @input="calcNet"
                                        />
                                      </el-form-item>
                                    </el-col>
           <el-col :span="5">
           <el-form-item label="净重（KG）" prop="netWeight">
                                                   <el-input
                                                   disabled
                                                     type="text"
                                                     v-model="formData.netWeight"
                                                     class="!w-1/1"
                                                     placeholder="请输入重量"
                                                     @input="calcNet"
                                                   />
                                                 </el-form-item>
                                               </el-col>
           <el-col :span="5">
          <el-form-item label="纯净重(KG)" prop="pureWeight">
                    <el-input
                    disabled
                      type="text"
                      v-model="formData.pureWeight"
                      class="!w-1/1"
                      placeholder="请输入重量"
                      @input="calcNet"
                    />
                  </el-form-item>
                </el-col>

        <el-col :span="5">
                       <el-form-item label="水分" prop="moisture">
                       <el-input
                       type="text"
                       v-model="formData.moisture"
                       class="!w-1/1"
                       placeholder="水分"
                       @input="calcMoisture"
                       />
                       </el-form-item>
          </el-col>
           <el-col :span="5">
                                 <el-form-item label="水分扣重(KG)" prop="moistDeduction">
                                 <el-input
                                 type="text"
                                 disabled
                                 v-model="formData.moistDeduction"
                                 class="!w-1/1"
                                 placeholder="水分扣重"
                                 />
                                 </el-form-item>
                    </el-col>
           <el-col :span="5">
                                 <el-form-item label="重金属值" prop="heavyMetal">
                                 <el-input
                                 type="text"
                                 v-model="formData.heavyMetal"
                                 class="!w-1/1"
                                 placeholder="重金属值"
                                 />
                                 </el-form-item>
                    </el-col>
           <el-col :span="5">
            <el-form-item label="扣杂" prop="deduction">
            <el-input
            type="text"
            v-model="formData.deduction"
            class="!w-1/1"
            placeholder="扣杂"
             @input="calcMoisture"/>
            </el-form-item>
            </el-col>
            <el-col :span="5">
                 <el-form-item label="杂质扣重(KG)" prop="deductionKg">
                 <el-input
                 type="text"
                 disabled
                 v-model="formData.deductionKg"
                 class="!w-1/1"
                 placeholder="杂质扣重"
                 @input="calcAmount"
                 />
                 </el-form-item>
          </el-col>
            <el-col :span="5">
                <el-form-item label="结算单价(KG)" prop="unitPrice">
                <el-input
                type="text"
                v-model="formData.unitPrice"
                class="!w-1/1"
                placeholder="请输入结算单价"
                 @input="calcAmount"/>
                </el-form-item>
              </el-col>
               <el-col :span="5">
                  <el-form-item label="结算金额" prop="amount">
                  <el-input
                  type="text"
                  v-model="formData.amount"
                  class="!w-1/1"
                  placeholder="请输入金额"
                   />
                  </el-form-item>
                </el-col>
                 <el-col :span="5">
                                  <el-form-item label="卸车人" prop="unloader">
                                  <el-input
                                  type="text"
                                  v-model="formData.unloader"
                                  class="!w-1/1"
                                  placeholder="请输入卸车人"/>
                                  </el-form-item>
                                </el-col>
        <el-col :span="16">
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              v-model="formData.remark"
              :rows="1"
              placeholder="请输入备注"
            />
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
import { PurchaseInApi, PurchaseInVO } from '@/api/erp/purchase/in'
import PurchaseInItemForm from './components/PurchaseInItemForm.vue'
import { AccountApi, AccountVO } from '@/api/erp/finance/account'
import { erpPriceInputFormatter, erpPriceMultiply } from '@/utils'
import PurchaseOrderInEnableList from '@/views/erp/purchase/order/components/PurchaseOrderInEnableList.vue'
import { PurchaseOrderVO } from '@/api/erp/purchase/order'
import * as UserApi from '@/api/system/user'
import { SupplierApi, SupplierVO } from '@/api/erp/purchase/supplier'
import { VehicleApi, VehicleVO } from '@/api/erp/purchase/vehicle'

/** ERP 湿稻谷入库表单 */
defineOptions({ name: 'PurchaseInForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改；detail - 详情
const formData = ref({
  id: undefined,
   purchaseTime: '',
    sellerName: undefined,
     grainType: '',
     season: '',
     grainStatus: '',
      plateNo: '',
      grossWeight: undefined,
      tareWeight: undefined,
      netWeight: undefined,
      moisture: undefined,
      heavyMetal: undefined,
      deduction: undefined,
      unitPrice: undefined,
      amount: undefined,
      unloader: '陈三英',
      remark: '',
      pureWeight:'',
      deductionKg:'',
      moistDeduction:'',
  no: undefined // 入库单号，后端返回
})
const formRules = reactive({
  purchaseTime: [{ required: true, message: '入库时间不能为空', trigger: 'blur' }],
  unitPrice: [{ required: true, message: '车牌号', trigger: 'blur' }]
})
const disabled = computed(() => formType.value === 'detail')
const formRef = ref() // 表单 Ref
const supplierList = ref<SupplierVO[]>([]) // 售粮人列表
const plateList = ref<VehicleVO[]>([]) //车牌列表

/** 子表的表单 */
const subTabsName = ref('item')
const itemFormRef = ref()

// 自动算净重
function calcNet() {
  formData.value.netWeight = (formData.value.grossWeight || 0) - (formData.value.tareWeight || 0);
  calcAmount();

}


// 自动算纯净重
function calcMoisture() {
  formData.value.moistDeduction = (formData.value.netWeight * ((formData.value.moisture)-25|| 0))/100;
  formData.value.deductionKg = (formData.value.netWeight * ((formData.value.deduction||0)))/100;
  formData.value.pureWeight =  formData.value.netWeight - formData.value.moistDeduction -formData.value.deductionKg;
  calcAmount();
}
// 自动算金额
function calcAmount() {
  const price = Number(formData.value.unitPrice || 0);    // 结算单价
    // 金额 = 结算单价 * 纯净重
    formData.value.amount = Math.ceil(price*formData.value.pureWeight);
}


/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 加载供应商列表
    supplierList.value = await SupplierApi.getSupplierSimpleList()
  // 加载车牌列表
    plateList.value = await VehicleApi.getVehicleSimpleList()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await PurchaseInApi.getPurchaseIn(id)
    } finally {
      formLoading.value = false
    }
  }

}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 打开【可入库的订单列表】弹窗 */
const purchaseOrderInEnableListRef = ref() // 可入库的订单列表 Ref
const openPurchaseOrderInEnableList = () => {
  purchaseOrderInEnableListRef.value.open()
}


/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as PurchaseInVO
    if (formType.value === 'create') {
      await PurchaseInApi.createPurchaseIn(data)
      message.success(t('common.createSuccess'))
    } else {
      await PurchaseInApi.updatePurchaseIn(data)
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
      purchaseTime: undefined,
       sellerName: '',
        grainType: '1',
        season: '1',
        grainStatus: '1',
         plateNo: '',
         grossWeight: undefined,
               tareWeight: undefined,
               netWeight: undefined,
               moisture: undefined,
               heavyMetal: undefined,
               deduction: undefined,
               unitPrice: undefined,
               amount: undefined,
         unloader: '',
         remark: ''
  }
  formRef.value?.resetFields()
}

</script>
