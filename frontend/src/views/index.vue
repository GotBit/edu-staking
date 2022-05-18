<template>
  <div class="relative flex flex-col w-full min-h-screen p-4 space-y-1">
    <header class="relative flex items-center justify-center w-full">
      <span class="text-3xl font-semibold text-red-400"> Staking </span>
      <button
        @click="connectMetamask"
        class="absolute group right-0 top-0 w-[200px] h-[50px] bg-blue-400 rounded-md text-white border-4 border-blue-300 shadow-sm hover:opacity-70 active:brightness-90"
      >
        {{ walletLabel }}
        <div
          class="hidden absolute -left-[4px] top-[42px] group-hover:flex w-[200px] h-[200px] bg-blue-400 border-4 border-blue-300 shadow-md justify-center items-center"
        >
          {{ token.balance.formatString(18, 2) }} TKN
        </div>
      </button>
    </header>
    <div
      class="w-[700px] h-[700px] bg-blue-400 border-4 border-blue-300 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center p-4 text-white"
    >
      <section class="w-full text-lg text-right">Rate: {{ staking.rate }}%</section>
      <section v-if="txLink">
        <a :href="txLink" class="underline"> Block scanner </a>
      </section>
      <section
        v-if="staking.isStaked"
        class="flex flex-col items-center justify-center h-full space-y-3"
      >
        Staked {{ staking.userStake?.amount.formatString(18, 2) }} TKN
        <span class="w-full text-lg text-right">
          Reward: {{ staking.reward.formatString(18, 2) }} TKN
        </span>
        <button
          @click="onHarvest"
          :disabled="staking.loading"
          :class="{
            'opacity-40': staking.loading,
          }"
          class="w-[150px] h-[50px] bg-red-400 border-4 border-red-500 rounded-md font-semibold hover:opacity-70 active:brightness-90"
        >
          Harvest
        </button>
        <button
          @click="onUnstake"
          :disabled="staking.loading"
          :class="{
            'opacity-40': staking.loading,
          }"
          class="w-[150px] h-[50px] bg-red-400 border-4 border-red-500 rounded-md font-semibold hover:opacity-70 active:brightness-90"
        >
          Unstake
        </button>
      </section>
      <section v-else class="flex flex-col items-center justify-center h-full space-y-3">
        <input
          v-model="amount"
          type="number"
          placeholder="Amount"
          class="text-black w-[200px] h-[40px] rounded-md p-4 border-4 border-blue-500 shadow-md"
        />
        <button
          @click="onStake"
          class="w-[150px] h-[50px] bg-red-400 border-4 border-red-500 rounded-md font-semibold hover:opacity-70 active:brightness-90"
          :disabled="staking.loading"
          :class="{
            'opacity-40': staking.loading,
          }"
        >
          Stake
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { useWallet } from '@/gotbit-tools/vue'
import { useToken } from '@/store/contracts/token'
import { useStaking } from '@/store/contracts/staking'

const { walletLabel, connectMetamask } = useWallet()

const token = useToken()
const staking = useStaking()

const amount = ref(0)
const txLink = ref('')

let timerId = ref<NodeJS.Timer | null>(null)

onMounted(() => {
  timerId.value = setInterval(staking.updateReward, 1000)
})

onBeforeUnmount(() => {
  if (timerId.value) clearInterval(timerId.value)
})

const onStake = async () => {
  txLink.value = await staking.stake(amount.value)
}
const onHarvest = async () => {
  txLink.value = await staking.harvest(amount.value)
}
const onUnstake = async () => {
  txLink.value = await staking.unstake(amount.value)
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
