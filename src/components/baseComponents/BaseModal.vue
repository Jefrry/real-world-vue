<template>
  <div class="modal">
    <div class="modal-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
name: "BaseModal"
}
</script>

<style scoped>
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  visibility: visible;
  z-index: 99999;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  max-width: 80%;
  height: auto;
  min-height: 10%;
  padding: 15px;
  background-color: #adadad85;
  z-index: 999999;
}
</style>