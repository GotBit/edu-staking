<template>
  <div
    v-if="web3.globalLoading"
    class="absolute z-10 flex items-center justify-center w-screen h-screen text-3xl text-white bg-black bg-opacity-20"
  >
    LOADING...
  </div>
  <div>
    <KeyHandler />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { KeyHandler, useWeb3 } from '@/gotbit-tools/vue'

const web3 = useWeb3()
web3.init()
</script>
