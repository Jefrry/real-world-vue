<template>
 <BaseModal v-if="confirm.show">
   <div class="confirm">
     <h3 class="confirm-title">{{confirm.title}}</h3>
     <div class="confirm-buttons">
       <BaseButton button-class="-fill-green" @click="confirm.acceptAction">Yes</BaseButton>
       <BaseButton button-class="-fill-red" @click="confirm.cancelAction">No</BaseButton>
     </div>
   </div>
 </BaseModal>
</template>

<script>
import BaseButton from '@/components/baseComponents/BaseButton'
import BaseModal from '@/components/baseComponents/BaseModal'
import { mapState } from 'vuex'
export default {
  name: 'confirm',
  components: { BaseModal, BaseButton },
  computed: {
    ...mapState(['confirm'])
  }
}
</script>

<style scoped>
.confirm-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
