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
          <el-form-item label="司机姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="车牌号码" prop="licPlateNumber">
            <el-input v-model="formData.licPlateNumber" placeholder="请输入车牌号码" />
          </el-form-item>
        </el-col>
         <el-col :span="12">
                  <el-form-item label="身份证号码" prop="idCard">
                    <el-input v-model="formData.idCard" placeholder="请输入身份证号码" />
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
import { VehicleApi, VehicleVO } from '@/api/erp/purchase/vehicle'
import { CommonStatusEnum } from '@/utils/constants'

/** ERP  表单 */
defineOptions({ name: 'VehicleForm' })
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  phone: undefined,
  licPlateNumber:undefined,
  idCard: undefined,
  remark: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '司机姓名不能为空', trigger: 'blur' }],
  licPlateNumber: [{ required: true, message: '车牌号不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
   idCard: [{ required: true, message: '身份证号不能为空', trigger: 'blur' }]
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
      formData.value = await VehicleApi.getVehicle(id)
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
    const data = formData.value as unknown as VehicleVO
    if (formType.value === 'create') {
      await VehicleApi.createVehicle(data)
      message.success(t('common.createSuccess'))
    } else {
      await VehicleApi.updateVehicle(data)
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
    name: undefined,
    phone: undefined,
    licPlateNumber:undefined,
    idCard:undefined,
    remark: undefined
  }
  formRef.value?.resetFields()
}
</script>
