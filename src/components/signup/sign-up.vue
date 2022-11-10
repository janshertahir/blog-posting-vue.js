<template>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
</head>
<Header></Header>
<body>
    <div class="vh-100 d-flex justify-content-center align-items-center ">
        <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
            <h2 class="text-center mb-4 text-primary">Sign Up</h2>
            <form id="app" @submit="checkForm" method="post" novalidate="true">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control border border-primary" v-model="username" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control border border-primary" v-model="password" />
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>
            </form>
                <div class="mt-3">
                    <p class="mb-0  text-center">
                        <router-link to="/login" class="text-primary fw-bold">Login</router-link>
                    </p>
                </div>
        </div>
    </div>
</body>
</template>

<script>
import {
    ApiService
} from "../../services/api-service";
import Header from '../header/header.vue';
export default {
    name: "SignUp",
    components:{
        Header
    },
    data() {
        return {
            errors: [],
            username: null,
            password: null,
            service: new ApiService('user')
        };
    },

    methods: {
        checkForm(e) {
            this.errors = [];

            if (!this.username) {
                this.errors.push("Username required.");
            }
            if (!this.password) {
                this.errors.push('Password required.');
            }
            if (!this.errors.length) {
                let obj = {
                    "username": this.username,
                    "password": this.password,
                };
                this.service.addUser(obj);
                this.$router.push({
                    name: 'Login'
                });
            }
            e.preventDefault();
        },
    }

};
</script>
