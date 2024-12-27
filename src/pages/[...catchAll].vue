<script setup lang="ts">
import AppErrorPage from '@/components/AppError/AppErrorPage.vue'

useErrorStore().setError({
  customCode: 404,
  error: 'Page not found'
})
</script>

<template>
  <AppErrorPage />
</template>