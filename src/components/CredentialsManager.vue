<template>
  <div class="creds-manager">
    <div class="mb-4">
      <h4> My Credentials </h4>
    </div>
    <div class="table-responsive">
      <table class="table table-dark">
        <thead>
          <tr class="text-center">
            <th> Portal </th>
            <th> Username </th>
            <th> Password </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cred, portal) in credentialsList"
            :key = "portal"
          >
            <td> {{ portal }} </td>
            <td>
              <div class="d-flex justify-content-center">
                <input
                  type="text"
                  :disabled="cred.username.disabled"
                  v-model="cred.username.value"
                  placeholder="Username"
                  class="mr-2"
                />
                <button
                  class="btn btn-info btn-sm ws-btn-rounded"
                  @click="toggleFieldState(portal, 'username')"
                  v-if="isEditable"
                >
                  <font-awesome-icon icon="edit"
                    v-show="cred.username.disabled"
                  ></font-awesome-icon>
                  <font-awesome-icon icon="check"
                    v-show="!cred.username.disabled"
                  ></font-awesome-icon>
                </button>
              </div>
            </td>
            <td>
              <div class="d-flex justify-content-center">
                <input
                  type="password"
                  :disabled="cred.password.disabled"
                  v-model="cred.password.value"
                  placeholder="Password"
                  class="mr-2"
                />
                <button
                  class="btn btn-info btn-sm ws-btn-rounded"
                  @click="toggleFieldState(portal, 'password')"
                  v-if="isEditable"
                >
                  <font-awesome-icon icon="edit"
                    v-show="cred.password.disabled"
                  ></font-awesome-icon>
                  <font-awesome-icon icon="check"
                    v-show="!cred.password.disabled"
                  ></font-awesome-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CredentialsManager',
  props: {
    credentials: {
      type: Object,
      required: true,
    },
    isEditable: {
      type: Boolean,
    },
  },
  methods: {
    toggleFieldState(portal, type) {
      // Do not perform any action if the form is not editable.
      if (!this.isEditable) {
        return;
      }
      this.credentialsList[portal][type].disabled = !this.credentialsList[portal][type].disabled;
    },
  },
  data() {
    return {
      credentialsList: this.credentials,
    };
  },
};
</script>
