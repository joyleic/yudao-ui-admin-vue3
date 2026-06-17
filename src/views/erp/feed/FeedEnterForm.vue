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
             <el-form-item label="入库时间" prop="storageTime">
              <el-date-picker
                           v-model="formData.storageTime"
                           placeholder="入库时间"
                           type="datetime"
                           value-format="x"
                           class="!w-1/1"
                    />
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
                          <el-form-item label="货源地" prop="originSource">
                            <el-input v-model="formData.originSource" placeholder="请输入货源地" />
                          </el-form-item>
                        </el-col>

        <el-col :span="12">
          <el-form-item label="车牌号码" prop="plateNumber">
            <el-input v-model="formData.plateNumber" placeholder="请输入车牌号码" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
                  <el-form-item label="结算单价(元/吨)" prop="unitPrice">
                    <el-input v-model="formData.unitPrice" placeholder="请输入结算单价" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
          <el-form-item label="净重(吨)" prop="netWeight">
            <el-input v-model="formData.netWeight" placeholder="请输入净重" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="金额(元)" prop="totalAmount">
          <el-input v-model="formData.totalAmount" placeholder="请输入金额" />
        </el-form-item>
       </el-col>
       <el-col :span="12">
        <el-form-item label="运费(元)" prop="freight">
          <el-input v-model="formData.freight" placeholder="请输入手机号码" />
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
import { FeedEnterApi, feedStorageVO } from '@/api/erp/feed/enter'
import { CommonStatusEnum } from '@/utils/constants'

/** ERP  表单 */
defineOptions({ name: 'FeedEnterForm' })
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: ndefined,
  contractNo:undefined,
  customerName:undefined,
  customerPhone:undefined,
  plateNumber:undefined,
  originSource:undefined,
   storageTime:undefined,
    unitPrice:undefined,
    netWeight:undefined,
    totalAmount:undefined,
       freight:undefined,
        remark:undefined
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
  resetForm()
  formType.value = type
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await FeedEnterApi.getFeedEnter(id)
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

    const data = formData.value as unknown as feedStorageVO
    if (formType.value === 'create') {
      await FeedEnterApi.createFeed(data)
      message.success(t('common.createSuccess'))
    } else {
      await FeedEnterApi.updateFeed(data)
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
    contractNo:undefined,
    customerName:undefined,
    customerPhone:undefined,
    plateNumber:undefined,
    originSource:undefined,
     storageTime:undefined,
      unitPrice:undefined,
      netWeight:undefined,
      totalAmount:undefined,
      freight:undefined,
      remark:undefined
  }
  formRef.value?.resetFields()
}
</script>
