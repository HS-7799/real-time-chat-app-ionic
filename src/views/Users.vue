<template>
    <auth-layout title="hello" >
      All users
    </auth-layout>
</template>

<script>
import AuthLayout from './layouts/Auth.vue'

export default {

  components : {
    AuthLayout,
  },
}
</script>

<style scoped >
.form-in
{
  max-width: 400px;
  margin: auto;
}
</style>