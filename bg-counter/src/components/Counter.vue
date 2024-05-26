<script setup lang="ts">
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import {computed, type ModelRef} from "vue";
import {darkenColor} from "@/colorUtil";

const model: ModelRef<number> = defineModel({default: 0})
const props = withDefaults(defineProps<{
  name?: string
  color?: string
  compact?: boolean
}>(), {
  color: "#2196f3"
})
const increment = (n: number) => {
  model.value += n;
}
const decrement = (n: number) => {
  model.value = Math.max(model.value - n, 0);
}
const colorstring = computed(() => {
  return '#' + props.color;
})
const darkenedColor = computed(() => {
  return darkenColor(props.color, 50)
})
</script>

<template>
  <div class="counterContainer normal-size" :class="{ 'small-size': compact}">
    <Button class="button-topleft" @click="increment(10)"
            :style='{backgroundColor: colorstring, borderColor: darkenedColor}'>
      +10
    </Button>
    <Button class="button-topright" @click="increment(1)"
            :style='{backgroundColor: colorstring, borderColor: darkenedColor}'>
      +1
    </Button>
    <div class="number-input">
      <InputNumber v-model="model" :min="0"/>
      <span class="textlabel"> {{ props.name }}</span>
    </div>
    <Button class="button-bottomleft" @click="decrement(10)"
            :style='{backgroundColor: colorstring, borderColor: darkenedColor}'>
      -10
    </Button>
    <Button class="button-bottomright" @click="decrement(1)"
            :style='{backgroundColor: colorstring, borderColor: darkenedColor}'>
      -1
    </Button>
  </div>
</template>

<style scoped>

.normal-size {
  --font-size-buttons: 4rem;
  --font-size-input: 5rem;
  --font-size-label: 2.3rem;
}
.small-size {
  --font-size-buttons: 2rem;
  --font-size-input: 2.5rem;
  --font-size-label: 1.65rem;
}
.counterContainer {

  border-radius: 32px;
  background: #2c3e50;
  border: 1px solid black;
  display: grid;
  grid-template-areas:
    "button-topleft button-topright"
    "number-input number-input"
    "button-bottomleft button-bottomright";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.2fr 1fr;
  gap: 0;
}

.number-input {
  grid-area: number-input;
  text-align: center;
  display: flex;

  span {
    width: 100%;

    input {
      text-align: center;
    }
  }
  position: relative;
}

:deep(.p-inputnumber-input) {
  width: 100%;
  font-size: var(--font-size-input);
  text-align: center;
}

.button-topleft {
  grid-area: button-topleft;
  border-radius: 32px 0 0 0;
  font-size: var(--font-size-buttons);
  justify-content: center;
  align-items: center;
}

.button-topright {
  grid-area: button-topright;
  border-radius: 0 32px 0 0;
  font-size: var(--font-size-buttons);
  justify-content: center;
  align-items: center;
}

.button-bottomleft {
  grid-area: button-bottomleft;
  border-radius: 0 0 0 32px;
  font-size: var(--font-size-buttons);
  justify-content: center;
  align-items: center;
}

.button-bottomright {
  grid-area: button-bottomright;
  border-radius: 0 0 32px 0;
  font-size: var(--font-size-buttons);
  justify-content: center;
  align-items: center;
}

.number-input .textlabel {
  position: absolute;
  top: 0.4rem;
  left: 1rem;
  font-size: var(--font-size-label);
  z-index: 1;
  color: grey;
  text-align: start;
}
</style>
