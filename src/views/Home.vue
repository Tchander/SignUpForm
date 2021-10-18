<template>
  <div class="suf-container">
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm";
export default {
  name: "Home",
  components: { SignUpForm },
};
</script>

<style lang="scss" scoped>
.suf-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
</style>
