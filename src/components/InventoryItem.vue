<template>
  <div class="item">
    <p>{{ item.name }}</p>
    <button @click="$emit('deleteItem')">Удалить</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: number; name: string }
}>()
</script>

<style scoped>
.item {
  width: 100px;
  height: 100px;
  background: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.item button {
  margin-top: 8px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
