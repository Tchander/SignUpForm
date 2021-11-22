<template>
  <div class="suf-item">
    <div class="suf-item__title">{{ label }}</div>
    <div class="suf-item__dropdown">
      <div
        @click="isSelectActive = !isSelectActive"
        class="suf-item__input suf-item__input--select"
        :class="{
          'suf-item__input--select--active': isSelectActive === true,
          'suf-item__input--select--changed': value !== 'Язык',
        }"
      >
        {{ value }}
      </div>
      <transition name="fade">
        <div class="suf-item__options" v-if="isSelectActive">
          <ul>
            <li
              class="suf-item__options-item"
              :class="{
                'suf-item__options-item--last': index === languages.length - 1,
              }"
              v-for="(language, index) in languages"
              :key="index"
              @click="changeLanguage(language)"
            >
              <span>{{ language.text }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownSelector",
  props: {
    value: {
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
  data() {
    return {
      isSelectActive: false,
      languages: [
        { value: "rus", text: "Русский" },
        { value: "eng", text: "Английский" },
        { value: "chi", text: "Китайский" },
        { value: "spa", text: "Испанский" },
      ],
    };
  },
  methods: {
    changeLanguage(language) {
      this.isSelectActive = false;
      this.$emit("changeLanguage", language.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.suf-item {
  margin-bottom: 34px;
  .suf-item__dropdown {
    position: relative;
    .suf-item__options {
      position: absolute;
      top: 55px;
      left: 0;
      z-index: 3;
      width: 100%;
      padding: 12px 0;
      font-size: 16px;
      line-height: 21px;
      color: #756f86;
      border: 1px solid #dbe2ea;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
      border-radius: 6px;
      cursor: pointer;
      .suf-item__options-item {
        height: 44px;
        display: flex;
        align-items: center;

        span {
          margin-left: 16px;
        }

        &:hover {
          background: #ebf4f8;
        }

        &--last {
          margin-bottom: 0;
        }
      }
    }
    .fade-enter-active {
      animation: 0.5s fade forwards;
    }
    .fade-leave-active {
      animation: 0.5s fade reverse;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
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
    &--select {
      color: #7c9cbf;
      cursor: pointer;

      &--active {
        border: 2px solid #0880ae;
        color: #2c2738;
        padding: 14px;
      }

      &--changed {
        color: #2c2738;
      }
    }
    &--select:after {
      content: "";
      background: url("../assets/images/arrow-down.png") 0 0 no-repeat;
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
