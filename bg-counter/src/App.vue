<script setup lang="ts">
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import Counter from "./components/Counter.vue"
import InputSwitch from "primevue/inputswitch"
import InputText from "primevue/inputtext"
import ColorPicker from 'primevue/colorpicker'
import {useStorage, useWakeLock} from "@vueuse/core"
import {reactive, type Ref, ref, watch} from "vue"
interface counter {
  name: string
  color: string
  value: number
}

const counters: Ref<counter[]> = useStorage("counters", ref([{name: '', color: '', value: 0}]));
const wakeLock = reactive(useWakeLock())
wakeLock.request('screen')

const showSidebar = ref(false)
const keepAwake = ref(true)
watch(keepAwake, (value) => {
  if (value) {
    wakeLock.request('screen')
  } else {
    wakeLock.release()
  }
})
</script>

<template>
  <Button @click="showSidebar = !showSidebar" icon="pi pi-cog" class="overlay-button"/>
  <div class="counters" >
    <Counter v-for="(counter, index) in counters"  :name="counter.name" :color="counter.color" v-model="counter.value" :key="index"/>
  </div>
  <Sidebar v-model:visible="showSidebar" :header="'Options'">
    <p class="line">
    Keep screen on <InputSwitch v-model="keepAwake" />
    </p>
    <p class="line" v-for="(counter, index) in counters" :key="index">
      <InputText v-model="counter.name" />  <ColorPicker v-model="counter.color" default-color="ffffff"/>
    </p>

    <p class="line" >
      <Button @click="counters.push({name: '', color: '', value: 0})" icon="pi pi-plus" />
      <Button @click="counters.pop()" icon="pi pi-minus" v-if="counters.length>1"/>
    </p>
  </Sidebar>
</template>

<style scoped>
.line {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
.counters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.overlay-button {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
}

:deep(.p-inputswitch-slider::before) {
  top: 10%;
}
</style>
