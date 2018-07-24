<template>
  <div class="ticket-create">
    <template v-if="isComplete">
      <div class="description">
        <h3>Product feedback received</h3>
        <p>Thank you for taking time to submit feedback about the product suite. A member of the team will review your submission and get back to you should we have any questions.</p>
        <p>Best wishes<br>The team</p>
      </div>
    </template>
    <template v-else>
      <div class="description">
        <h3>Product feedback</h3>
        <p>We are continually working to enhance our product suite and welcome all customer feedback to help us prioritise and improve the features and functionality available with our solutions.</p>
      </div>

      <form @submit="onSubmit">
        <div class="ticket-create__field first-name">
          <label for="first-name">First name *</label>
          <input
            type="text"
            v-model="firstName"
            name="first_name"
          >
        </div>

        <div class="ticket-create__field last-name">
          <label for="last-name">Last name *</label>
          <input
            type="text"
            v-model="lastName"
            name="last_name"
          >
        </div>

        <div class="ticket-create__field email-address">
          <label for="email-address">Email address *</label>
          <input
            type="email"
            v-model="emailAddress"
            name="email"
          >
        </div>

        <div class="ticket-create__field telephone">
          <label for="telephone">Telephone number</label>
          <input
            type="tel"
            v-model="telephone"
            name="telephone"
          >
        </div>

        <div class="ticket-create__field feedback-type">
          Nature of feedback *
          <div class="radio-input-wrapper">
            <input
              type="radio"
              v-model="feedbackType"
              id="feedback-type__feature"
              name="feedback_type"
              value="Feature request"
            >
            <label for="feedback-type__feature">Feature request</label>
          </div>
          <div class="radio-input-wrapper">
            <input
              type="radio"
              v-model="feedbackType"
              id="feedback-type__general"
              name="feedback_type"
              value="General feedback"
            >
            <label for="feedback-type__general">General feedback</label>
          </div>
          <div class="radio-input-wrapper">
            <input
              type="radio"
              v-model="feedbackType"
              id="feedback-type__bug"
              name="feedback_type"
              value="Bug"
            >
            <label for="feedback-type__bug">Bug</label>
          </div>
        </div>

        <div class="ticket-create__field feedback-details">
          <label for="feedback-details">Details</label>
          <textarea
            name="feedback_details"
            v-model="feedbackDetails"
            placeholder="Please provide as much information as possible in relation to the feedback you are submitting."
          >
            {{ feedbackDetails }}
          </textarea>
        </div>

        <div class="ticket-create__field submit">
          <input type="submit" name="submit" value="Submit">
        </div>
      </form>
    </template>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      isComplete: false,
      status: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      telephone: '',
      feedbackType: 'Feature request',
      feedbackDetails: '',
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()

      let error = false
      if (!this.firstName) {
        const errRow = document.querySelectorAll('.ticket-create__field.first-name')[0]
        errRow.classList.remove('error')
        errRow.classList.add('error')
        error = true
      }
      if (!this.lastName) {
        const errRow = document.querySelectorAll('.ticket-create__field.last-name')[0]
        errRow.classList.remove('error')
        errRow.classList.add('error')
        error = true
      }
      if (!this.emailAddress) {
        const errRow = document.querySelectorAll('.ticket-create__field.email-address')[0]
        errRow.classList.remove('error')
        errRow.classList.add('error')
        error = true
      }
      if (error) return

      const formData = new FormData();
      formData.append('first_name', this.firstName)
      formData.append('last_name', this.lastName)
      formData.append('email', this.emailAddress)
      formData.append('telephone', this.telephone)
      formData.append('feedback_type', this.feedbackType)
      formData.append('feedback_details', this.feedbackDetails)

      axios.post("http://localhost:3128/ticket", formData)
        .then(res => {
          if (res.data.status == true) {
            this.status = res.data.message;
            this.isComplete = true
          } else {
            this.status = res.data.message;
            this.isComplete = false
          }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .ticket-create__field {
    width: 45%;
    margin: 8px 0;

    label,
    input[type=text],
    input[type=tel],
    input[type=email],
    textarea {
      display: block;
      width: 100%;
    }

    textarea {
      height: 100px;
    }

    input[type=submit] {
      border-radius: 2px;
      padding: 5px 15px;
      color: #fff;
      background: #1991a4;
      border: none;
    }

    &.feedback-type,
    &.feedback-details {
      width: 100%;

      label,
      input[type=radio] {
        display: inline-block;
        width: auto;
      }
    }

    &.error label {
      color: red;
    }
  }

}
</style>
