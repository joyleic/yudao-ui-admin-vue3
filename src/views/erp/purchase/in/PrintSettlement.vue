<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" width="1440"  v-loading="formLoading">
  <div id="printArea" style="width: 241mm; padding: 5mm; margin: 0 auto; background: #fff;">
   <div style="text-align: center; font-size: 26px; font-weight: bold; margin-bottom: 20px;">
        湖南东安穗星农业发展有限公司粮食收购入库结算单
      </div>
       <div style="text-align:right; font-size: 16px; font-weight: bold; margin-bottom: 20px;">
              结算日期：{{formData.tempData}}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
         </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; line-height: 1.8;">
      <tbody>
      <tr>
              <td style="border:1px solid #000; padding:8px;" width="12%">售粮人姓名</td>
              <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.sellerName}}</td>
              <td style="border:1px solid #000; padding:8px;" width="10%">身份证号</td>
              <td style="border:1px solid #000; padding:8px;" width="19%">{{formData.idCard}}</td>
              <td style="border:1px solid #000; padding:8px;" width="10%">电话</td>
              <td style="border:1px solid #000; padding:8px;" width="14%">{{formData.phone}}</td>
              <td style="border:1px solid #000; padding:8px;" width="10%">车牌号</td>
              <td style="border:1px solid #000; padding:8px;" width="16%">{{formData.plateNo}}</td>
            </tr>
             <tr>
                          <td style="border:1px solid #000; padding:8px;" width="12%">地址</td>
                           <td style="border:1px solid #000; padding:8px;" colspan="7" width="75%">{{formData.address}}</td>
                        </tr>

                          <tr>
                            <td  style="border:1px solid #000; padding:8px;" width="12%">粮食品种</td>
                             <td  style="border:1px solid #000; padding:8px;" width="10%">{{formData.grainTypeName}}</td>
                            <td style="border:1px solid #000; padding:8px;" width="10%">季节</td>
                            <td style="border:1px solid #000; padding:8px;" width="19%">{{formData.seasonName}}</td>
                            <td style="border:1px solid #000; padding:8px;" width="10%">稻谷状态</td>
                             <td style="border:1px solid #000; padding:8px;" width="14%">{{formData.grainStatusName}}</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%"></td>
                             <td style="border:1px solid #000; padding:8px;" width="16%"></td>
                          </tr>
                          <tr>
                       <td style="border:1px solid #000; padding:8px;" width="12%">毛重</td>
                        <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.grossWeight}}</td>
                       <td style="border:1px solid #000; padding:8px;" width="10%">皮重</td>
                       <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.tareWeight}}</td>
                        <td style="border:1px solid #000; padding:8px;" width="10%">净重</td>
                        <td style="border:1px solid #000; padding:8px;" width="10%" >{{formData.netWeight}}</td>
                         <td style="border:1px solid #000; padding:8px;" width="10%">纯净重</td>
                          <td style="border:1px solid #000; padding:8px;" width="10%" >{{formData.pureWeight}}</td>
                     </tr>




              <tr>
                             <td style="border:1px solid #000; padding:8px;" width="12%">水分(%)</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.moisture}}</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%">水分扣重</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.moistDeduction}}</td>
                             <td style="border:1px solid #000; padding:8px;" width="10%">重金属</td>
                             <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.heavyMetal}}</td>
                             <td style="border:1px solid #000; padding:8px;" width="10%">扣杂</td>
                             <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.deduction}}</td>

                           </tr>

                           <tr>
                             <td style="border:1px solid #000; padding:8px;" width="12%">杂质扣重</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.deductionKg}}</td>
                             <td style="border:1px solid #000; padding:8px;" width="10%">结算单价</td>
                              <td style="border:1px solid #000; padding:8px;" width="15%">{{formData.unitPrice}}</td>
                              <td style="border:1px solid #000; padding:8px;" width="12%">结算金额</td>
                             <td style="border:1px solid #000; padding:8px;"  width="10%">{{formData.amount}}</td>
                              <td style="border:1px solid #000; padding:8px;" width="10%"></td>
                               <td style="border:1px solid #000; padding:8px;" width="16%"></td>
                           </tr>

                        <tr>
                         <td style="border:1px solid #000; padding:8px;"  width="10%">金额大写</td>
                         <td style="border:1px solid #000; padding:8px;" colspan="7" >{{formData.amountUp}}</td>
                       </tr>
                        <tr>
                         <td style="border:1px solid #000; padding:8px;" width="10%">收款方姓名</td>
                          <td style="border:1px solid #000; padding:8px;" width="10%">{{formData.bankName}}</td>
                         <td style="border:1px solid #000; padding:8px;"  width="10%">账号</td>
                         <td style="border:1px solid #000; padding:8px;" colspan="2" width="10%">{{formData.bankAccount}}</td>
                         <td style="border:1px solid #000; padding:8px;"  width="10%">开户行</td>
                         <td style="border:1px solid #000; padding:8px;" colspan="2" width="15%">{{formData.bankAddress}}</td>
                       </tr>
                </tbody>
      </table>
   <div style="margin-top: 30px; font-size: 16px;">
         <span style="margin-right: 40px;">检验员：__________</span>
         <span style="margin-right: 40px;">司磅员：__________</span>
           <span style="margin-right: 40px;">结算员：__________</span>
             <span style="margin-right: 40px;">客户签名：__________</span>
       </div>
       </div>
    <template #footer>
      <el-button @click="startPrint" type="primary" :disabled="formLoading" v-if="!disabled">
        打 印
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

/** ERP 湿稻谷入库表单 */
defineOptions({ name: 'PrintSettlement' })


const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改；detail - 详情
const formData = ref({
  id: undefined,
    sellerName: '',
     idCard: '',
     phone:'',
     plateNo:'',
     address:'',
     grainTypeName:'',
      seasonName:'',
      grainStatusName:'',
      grossWeight:'',
      tareWeight:'',
      netWeight:'',
      calcAmount:'',
      heavyMetal:'',
      deduction:'',
      unitPrice:'',
      amount:'',
      amountUp:'',
      bankName:'',
      bankAccount:'',
      bankAddress:'',
      tempData:'',
      pureWeight:'',
      deductionKg:'',
      moistDeduction:''


})
const formRef = ref() // 表单 Ref



/** 打开弹窗 */
const open = async (id?: number) => {
    dialogVisible.value = true
    formLoading.value = true
    try {
      formData.value = await PurchaseInApi.getPrint(id)
      console.log(formData.value)
      formData.value.tempData = getYmd();
      amountToChinese(formData.value.amount);
    } finally {
      formLoading.value = false
    };
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const getYmd = () => {
  const date = new Date()
  const y = date.getFullYear().toString() // 年后两位：25
  const m = (date.getMonth() + 1).toString().padStart(2, '0') // 月：01-12
  const d = date.getDate().toString().padStart(2, '0') // 日：01-31
  return y +'-'+ m+'-' + d
}

const  amountToChinese = async (amount) => {
        if (!amount) return '零元整'
        const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        const unit = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿']
        let s = Number(amount).toFixed(2)
        let integer = s.split('.')[0]
        let result = ''

        for (let i = 0; i < integer.length; i++) {
          const num = parseInt(integer[i])
          if (num !== 0) {
            result += digit[num] + unit[integer.length - i - 1]
          } else {
            if (result.slice(-1) !== '零') result += '零'
          }
        }
        result = result.replace(/零$/, '') + '元'
        formData.value.amountUp =  result + '整'
      }

const startPrint=async () => {
      const printContent = document.getElementById('printArea').innerHTML
      const printWindow = window.open('', '_blank')
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body { width:241mm;margin:0;padding:5mm;font-family:微软雅黑; }
                        table { width:100%;border-collapse:collapse; }
                        td { border:1px solid #333; }
                        @page { size:241mm auto; margin:0mm; }
                        @media print { body { margin:0; } }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }





</script>
