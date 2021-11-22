<template>
  <form class="suf-form" @submit.prevent="">
    <div class="suf-title">Регистрация</div>
    <div class="suf-subtitle">Уже есть аккаунт? <a href="#">Войти</a></div>
    <input-box
      v-model.trim="signUpData.name"
      :class="{ 'suf-item--error-message': !$v.signUpData.name.checkName }"
      placeholder="Введите Ваше имя"
      label="Имя"
    />
    <input-box
      v-model.trim="signUpData.email"
      :class="{ 'suf-item--error-message': !$v.signUpData.email.email }"
      placeholder="Введите ваш email"
      label="Email"
    />
    <input-box
      v-model.trim="signUpData.phoneNumber"
      :class="{
        'suf-item--error-message':
          !$v.signUpData.phoneNumber.checkPhoneNumberBySymbols ||
          !$v.signUpData.phoneNumber.checkPhoneNumberByNumberOfDigits,
      }"
      placeholder="Введите номер телефона"
      label="Номер телефона"
    />
    <dropdown-selector
      @changeLanguage="changeSelectLanguage"
      v-bind:value="signUpData.language"
      label="Язык"
    />
    <check-box
      @changeCheckBox="changeCheckBox"
      v-model="signUpData.isChecked"
    />
    <form-button
      :is-button-disabled="isButtonDisabled"
      text="Зарегистрироваться"
      @sendData="sendData"
    />
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import {
  checkName,
  checkPhoneNumberBySymbols,
  checkPhoneNumberByNumberOfDigits,
} from "@/helpers";
import InputBox from "@/components/InputBox";
import DropdownSelector from "@/components/DropdownSelector";
import CheckBox from "@/components/CheckBox";
import FormButton from "@/components/FormButton";
export default {
  name: "SignUpForm",
  components: { FormButton, CheckBox, DropdownSelector, InputBox },
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
      this.signUpData.language = language;
    },
    changeCheckBox() {
      this.signUpData.isChecked = !this.signUpData.isChecked;
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
  .suf-title {
    font-weight: 700;
    font-size: 34px;
    line-height: 44px;
    color: #2c2738;
    margin-bottom: 10px;
  }
  .suf-subtitle {
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
  .suf-item {
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
  }
}
</style>
