<template>
  <button @click="toTeamPage()" type="button">To Teams Page</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    toTeamPage() {
      this.$router.push('/teams');
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('Guard di dalam komponen user')
    next();
  },
  unmounted() {
    console.log('unmounted');
  },
  beforeRouteLeave(to, from, next) {
    console.log('before route leave')
    const result = confirm('Anda yakin akan meninggalkan halaman ini?');
    if (result) {
      return next();
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>