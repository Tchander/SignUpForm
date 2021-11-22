<template>
  <button
    :disabled="isButtonDisabled"
    class="suf-btn"
    :class="{ 'suf-btn--active': !isButtonDisabled }"
    @click="sendData"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    isButtonDisabled: {
      type: Boolean,
      required: true,
      default: () => true,
    },
    text: {
      type: String,
      required: true,
      default: () => "",
    },
  },
  methods: {
    sendData() {
      this.$emit("sendData");
    },
  },
};
</script>

<style lang="scss" scoped>
.suf-btn {
  width: 100%;
  background: #dbe2ea;
  box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08), 0 4px 8px rgba(44, 39, 56, 0.08);
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #b1b5bf;
  padding: 14px;
  border: 2px solid transparent;
  &--active {
    background: #0880ae;
    color: #ebf4f8;
    &:hover {
      box-shadow: 0 12px 24px rgba(44, 39, 56, 0.08),
        0 24px 48px rgba(44, 39, 56, 0.16);
    }
    &:active {
      border: 2px solid rgba(44, 39, 56, 0.86);
    }
  }
}
</style>
