<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createNewEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
        class="field"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
        placeholder="Title"
        class="field"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
      </template>

      <BaseInput
        label="Description"
        v-model="event.description"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
        placeholder="Add a description"
        class="field"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
        placeholder="Add a location"
        class="field"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <DatePicker
          v-model="event.date"
          @closed="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
          placeholder="Select a date"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required</p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        @blur="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
        class="field"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
      </template>

      <BaseButton type="submit" buttonClass="-fill-gradient" :disabled="$v.anyError">Submit</BaseButton>
      <p v-if="$v.anyError" class="errorMessage">Please, fill out the required fields</p>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'event-create',
  components: {
    DatePicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(`${i}:00`)
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    ...mapActions('event', ['createEvent']),
    createNewEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createEvent(this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(e => console.log(e))
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 100000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
