<template>
  <section class="search-cmp">
    <input
    ref="input-search"
      :class="{active: input.length}"
      type="search"
      v-model="input"
      name="input"
      placeholder="Search For Project..."
      title="Search By name"
      @input="search"
    />
    <svg
      role="presentation"
      :class="{active: input.length}"
      viewBox="0 0 32 32"
      width="14"
      height="14"
      fill="none"
      stroke="#ffedb8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
    >
      <circle cx="14" cy="14" r="12" />
      <path d="M23 23 L30 30" />
    </svg>
    <img
      @click="$emit('toggleFilters')"
      src="../../assets/svg/downloading2.svg"
      alt="More option"
      title="Show search options"
    />

    <!-- {{input}} -->
  </section>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    }
  },
  data() {
    return {
      input: this.value
    };
  },
  // created() {
  //   if (this.$refs.inputRef){
  //     this.$refs.inputRef.focus()

  //   }
  //   console.log(this.$refs.inputRef);
    
  // },
  methods: {
    search() {
      this.$emit("input", this.input);
    }
  }
};
</script>