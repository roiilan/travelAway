<template>
    <div class="accodion-item-open">
      <p>Yinon Eliyahu | {{item}}</p>
      <p>Tel: +972-3-5555555</p>
      <p>Mob: +972-50-5555555</p>
      <p>E-mail: user@toy-store.org.il</p>
    </div>
</template>

<script>
export default {
  props: {
    item: String
  }
}
</script>