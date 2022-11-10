<template>
<div class="curved-header">
    <ul class="nav-links">
        <li>
            <a>
                <router-link to="/">Home</router-link>
            </a>
        </li>
        <li>
            <a @click="viewCategory('sports')">Sports</a>
        </li>
        <li>
            <a @click="viewCategory('fashion')">Fashion</a>
        </li>
        <li>
            <a @click="viewCategory('news')">News</a>
        </li>
        <li>
            <a @click="viewCategory('entertainment')">Entertainment</a>
        </li>
        <li>
            <a @click="viewCategory('economy')">Economy</a>
        </li>

        <li v-if="status" @click="logout()"><a>Logout</a></li>
        <li v-else @click="login()"><a>Login</a></li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Header",

    data() {
        return {
            status: this.abc,
        };
    },
    mounted() {
        let status = localStorage.getItem("status")
        if (status == "false") {
            this.status = false;
        } else {
            this.status = true;
        }
    },
    methods: {
        login() {
            this.$router.push({
                name: "Login",
            });
        },
        logout() {
            localStorage.setItem("status", "false");
            this.status = false;
            localStorage.removeItem("user");
            this.$router.push({
                name: 'Login'
            });

        },
        viewCategory(selected) {
            this.$router.push({
                name: "Category",
                params: {
                    category: selected
                }
            });
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.curved-header {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: Montserrat, sans-serif;
    position: relative;
}

.curved-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url("https://res.cloudinary.com/dliyqijim/image/upload/v1666775654/pexels-fauxels-3183197_tphzpp.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    z-index: -1;
}

.curved-header .nav-links {
    margin: 25px;
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.curved-header .nav-links li {
    margin: 0 15px;
}

.curved-header .nav-links li a {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    position: relative;
}

.nav-links li a:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 0.3s;
}

.nav-links li a:hover:after {
    transform: scaleX(1);
}
</style>
