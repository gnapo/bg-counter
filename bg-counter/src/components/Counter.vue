<script setup lang="ts">
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import {ref} from "vue";

const counter = ref(0);
const increment = (n: number) => {
  counter.value += n;
}
const decrement = (n: number) => {
  counter.value = Math.max(counter.value - n, 0);
}
</script>

<template>
  <div class="counterContainer">
    <Button class="button-topleft" @click="increment(10)">
      +10
    </Button>
    <Button class="button-topright" @click="increment(1)">
      +1
    </Button>
    <div class="number-input">
      <InputNumber v-model="counter" :min="0" />
    </div>
    <Button class="button-bottomleft" @click="decrement(10)">
      -10
    </Button>
    <Button class="button-bottomright" @click="decrement(1)">
      -1
    </Button>
  </div>
</template>

<style scoped>
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
  grid-template-rows: 1fr 2fr 1fr;
  gap: 0;
  height: 20rem;
  font-size: 9rem;
}

.number-input {
  grid-area: number-input;
  font-size: 3rem;
  text-align: center;
  display: flex;
  span {
    width: 100%;
    input {
      text-align: center;
    }
  }
}

:deep(.p-inputnumber-input) {
  width: 100%;
  font-size: 5rem;
  text-align: center;

}

.button-topleft {
  grid-area: button-topleft;
  border-radius: 32px 0 0 0;
  font-size: 4rem;

}

.button-topright {
  grid-area: button-topright;
  border-radius: 0 32px 0 0;
  font-size: 4rem;

}

.button-bottomleft {
  grid-area: button-bottomleft;
  border-radius: 0 0 0 32px;
  font-size: 4rem;

}

.button-bottomright {
  grid-area: button-bottomright;
  border-radius: 0 0 32px 0;
  font-size: 4rem;

}
</style>
