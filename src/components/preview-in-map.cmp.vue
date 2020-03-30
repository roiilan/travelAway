<template>
  <div class="preview-in-map">
    <img
      class="img-on-map"
      v-if="isShow"
      :src="url"
      :title="id"
      alt
      :style="`top:${y}px; left:${x}px`"
      @click="openDetails(id)"
    />
  </div>
</template>

<script>
export default {
  props: ["proj"]
};
</script>