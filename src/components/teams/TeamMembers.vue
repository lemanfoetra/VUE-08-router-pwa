<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>
    <RouterLink to="/teams/t2">Go to team 2</RouterLink>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],

  components: {
    UserItem
  },
  created() {
    this.loadTeamMember(this.teamId);
    console.log(this.$route.query);
  },
  data() {
    return {
      teamName: 'Test',
      members: [],
    };
  },
  watch: {
    teamId(newTeamId) {
      this.loadTeamMember(newTeamId);
    }
  },
  methods: {
    loadTeamMember(teamId) {
      // const teamId = this.$route.params.teamId;
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMember = [];
      for (const member of members) {
        const selecteduser = this.users.find(user => user.id === member);
        selectedMember.push(selecteduser);
      }
      this.members = selectedMember;
      this.teamName = selectedTeam.name;
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>