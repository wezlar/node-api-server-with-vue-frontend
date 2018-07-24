<template>
  <div class="ticket-create">
    <div class="description">
      <h3>Product feedback list</h3>
      <p>Below are the feedback tickets raised.</p>
    </div>
    <div class="tickets">
      <template v-if="!tickets.length">
        <p><strong>There are currently no tickets.</strong></p>
      </template>
      <table v-else border="1" cellspacing="0" cellpadding="1">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Nature of feedback</th>
          <th>Details</th>
          <th>Date</th>
        </tr>
        <tr
          v-for="(ticket, i) in tickets"
        >
          <td>{{ `${ticket.first_name} ${ticket.last_name}` }}</td>
          <td>{{ ticket.email }}</td>
          <td>{{ ticket.feedback_type }}</td>
          <td>{{ ticket.feedback_details }}</td>
          <td>{{ ticket.created }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'TicketDashboard',
    data() {
      return {
        tickets: []
      }
    },
    mounted() {
      axios.get("http://localhost:3128/tickets")
        .then(res => {
          if (res.data.status == true) {
            this.tickets = res.data.tickets
            console.table(this.tickets)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>

</style>
