<template>
  <form class="suf-form" @submit.prevent="">
    <div class="suf-form-title">Регистрация</div>
    <div class="suf-form-subtitle">Уже есть аккаунт? <a href="#">Войти</a></div>
    <div
      class="suf-form-item"
      :class="{ 'suf-form-item--error-message': !$v.signUpData.name.checkName }"
    >
      <div class="suf-form-item__title">Имя</div>
      <input
        class="suf-form-item__input"
        type="text"
        placeholder="Введите Ваше имя"
        v-model.trim="signUpData.name"
      />
    </div>
    <div
      class="suf-form-item"
      :class="{ 'suf-form-item--error-message': !$v.signUpData.email.email }"
    >
      <div class="suf-form-item__title">Email</div>
      <input
        class="suf-form-item__input"
        type="email"
        placeholder="Введите ваш email"
        v-model.trim="signUpData.email"
      />
    </div>
    <div
      class="suf-form-item"
      :class="{
        'suf-form-item--error-message':
          !$v.signUpData.phoneNumber.checkPhoneNumberBySymbols ||
          !$v.signUpData.phoneNumber.checkPhoneNumberByNumberOfDigits,
      }"
    >
      <div class="suf-form-item__title">Номер телефона</div>
      <input
        class="suf-form-item__input"
        type="text"
        placeholder="Введите номер телефона"
        v-model.trim="signUpData.phoneNumber"
      />
    </div>
    <div class="suf-form-item">
      <div class="suf-form-item__title">Язык</div>
      <div class="suf-form-item__dropdown">
        <div
          @click="isSelectActive = !isSelectActive"
          class="suf-form-item__input suf-form-item__input--select"
          :class="{
            'suf-form-item__input--select--active': isSelectActive === true,
            'suf-form-item__input--select--changed':
              signUpData.language !== 'Язык',
          }"
        >
          {{ signUpData.language }}
        </div>
        <transition name="fade">
          <div class="suf-form-item__options" v-if="isSelectActive">
            <ul>
              <li
                class="suf-form-item__options-item"
                :class="{
                  'suf-form-item__options-item--last':
                    index === languages.length - 1,
                }"
                v-for="(language, index) in languages"
                :key="index"
                @click="changeSelectLanguage(language)"
              >
                <span>{{ language.text }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="suf-form-item suf-form-item--checkbox">
      <input
        v-model="signUpData.isChecked"
        id="checkbox"
        class="suf-form-item__checkbox"
        type="checkbox"
      />
      <label
        class="suf-form-item__checkbox-label"
        :class="{
          'suf-form-item__checkbox-label--checked': signUpData.isChecked,
        }"
        for="checkbox"
        >Принимаю <a href="#">условия</a> использования</label
      >
    </div>
    <button
      :disabled="isButtonDisabled"
      class="suf-form-btn"
      :class="{ 'suf-form-btn--active': !isButtonDisabled }"
      @click="sendData()"
    >
      Зарегистрироваться
    </button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import {
  checkName,
  checkPhoneNumberBySymbols,
  checkPhoneNumberByNumberOfDigits,
} from "@/helpers";
export default {
  name: "SignUpForm",
  data() {
    return {
      isSelectActive: false,
      languages: [
        { value: "rus", text: "Русский" },
        { value: "eng", text: "Английский" },
        { value: "chi", text: "Китайский" },
        { value: "spa", text: "Испанский" },
      ],
      signUpData: {
        name: "",
        email: "",
        phoneNumber: "",
        language: "Язык",
        isChecked: false,
      },
    };
  },
  computed: {
    isButtonDisabled() {
      return (
        this.$v.signUpData.name.$invalid ||
        this.$v.signUpData.email.$invalid ||
        this.$v.signUpData.phoneNumber.$invalid ||
        this.signUpData.language === "Язык" ||
        this.signUpData.isChecked === false
      );
    },
  },
  methods: {
    changeSelectLanguage(language) {
      this.signUpData.language = language.text;
      this.isSelectActive = false;
    },
    sendData() {
      // Отправляем данные
      this.signUpData.name = "";
      this.signUpData.email = "";
      this.signUpData.phoneNumber = "";
      this.signUpData.language = "Язык";
      this.signUpData.isChecked = false;
    },
  },
  validations: {
    signUpData: {
      name: {
        required,
        checkName,
      },
      email: {
        required,
        email,
      },
      phoneNumber: {
        required,
        checkPhoneNumberBySymbols,
        checkPhoneNumberByNumberOfDigits,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.suf-form {
  width: 100%;
  max-width: 460px;
  margin: 70px auto 0 auto;
  background: #fff;
  padding: 40px 30px;
  box-shadow: 0 12px 24px rgba(44, 39, 56, 0.02),
    0 32px 64px rgba(44, 39, 56, 0.04);
  border-radius: 24px;
  @media (max-width: 460px) {
    max-width: 360px;
    padding: 30px 20px;
  }
  .suf-form-title {
    font-weight: 700;
    font-size: 34px;
    line-height: 44px;
    color: #2c2738;
    margin-bottom: 10px;
  }
  .suf-form-subtitle {
    font-size: 16px;
    line-height: 22px;
    color: #2c2738;
    margin-bottom: 58px;
    @media (max-width: 460px) {
      margin-bottom: 25px;
    }
    a {
      color: #0880ae;
      margin-left: 3px;
    }
  }
  .suf-form-item {
    margin-bottom: 34px;
    position: relative;
    &--error-message:after {
      content: "Введено не корректное значение";
      position: absolute;
      top: 86px;
      left: 0;
      font-size: 14px;
      line-height: 18px;
      color: #ff7171;
    }
    .suf-form-item__dropdown {
      position: relative;
      .suf-form-item__options {
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
        .suf-form-item__options-item {
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
    .suf-form-item__title {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #756f86;
      margin-bottom: 6px;
    }
    .suf-form-item__input {
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
    &--checkbox {
      position: relative;
      margin-bottom: 44px;
      .suf-form-item__checkbox {
        -webkit-appearance: none;
        appearance: none;
        position: absolute;
      }
      .suf-form-item__checkbox-label {
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
  .suf-form-btn {
    width: 100%;
    background: #dbe2ea;
    box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08),
      0 4px 8px rgba(44, 39, 56, 0.08);
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #b1b5bf;
    padding: 16px;
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
}
</style>
