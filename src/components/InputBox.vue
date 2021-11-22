<template>
  <div class="suf-item">
    <div class="suf-item__title">{{ label }}</div>
    <input
      class="suf-item__input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="onChangeValue"
    />
  </div>
</template>
<script>
export default {
  name: "InputBox",
  props: {
    value: {
      type: String,
      required: true,
      default: () => "",
    },
    placeholder: {
      type: String,
      required: true,
      default: () => "",
    },
    label: {
      type: String,
      required: true,
      default: () => "",
    },
  },
  methods: {
    onChangeValue({ target: { value } }) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.suf-item {
  margin-bottom: 34px;
  .suf-item__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #756f86;
    margin-bottom: 6px;
  }
  .suf-item__input {
    position: relative;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    line-height: 21px;
    color: #2c2738;
    border: 1px solid #dbe2ea;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 6px;
    &::placeholder {
      color: #7c9cbf;
    }
  }
}
</style>
