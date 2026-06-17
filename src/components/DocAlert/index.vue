
<script setup lang="tsx">
import { propTypes } from '@/utils/propTypes'

defineOptions({ name: 'DocAlert' })

const props = defineProps({
  title: propTypes.string,
  url: propTypes.string
})


</script>
<style scoped>
.el-alert--success.is-light {
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid green;
}
</style>
