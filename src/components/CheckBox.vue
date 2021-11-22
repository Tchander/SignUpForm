<template>
  <div class="suf-item suf-item--checkbox">
    <input
      :value="value"
      id="checkbox"
      class="suf-item__checkbox"
      type="checkbox"
      @click="onChangeValue"
    />
    <label
      class="suf-item__checkbox-label"
      :class="{
        'suf-item__checkbox-label--checked': value,
      }"
      for="checkbox"
      >Принимаю <a href="#">условия</a> использования</label
    >
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  methods: {
    onChangeValue() {
      this.$emit("changeCheckBox");
    },
  },
};
</script>

<style lang="scss" scoped>
.suf-item {
  margin-bottom: 34px;
  &--checkbox {
    position: relative;
    margin-bottom: 44px;
    .suf-item__checkbox {
      -webkit-appearance: none;
      appearance: none;
      position: absolute;
    }
    .suf-item__checkbox-label {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #756f86;
      padding-left: 36px;
      a {
        color: #0880ae;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: -4px;
        left: 0;
        z-index: 1;
        width: 28px;
        height: 28px;
        border: 1px solid #dbe2ea;
        box-sizing: border-box;
        box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        left: 6px;
        z-index: 2;
        width: 16px;
        height: 16px;
        background: url("../assets/images/check.svg") no-repeat;
        background-size: 16px 16px;
        opacity: 0;
        cursor: pointer;
      }
      &--checked {
        &:before {
          border: 1px solid #0880ae;
        }

        &:after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
