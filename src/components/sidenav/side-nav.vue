<template>
<div class="container">

    <nav class="side-nav">

        <ul class="nav-menu">
            <input type="text" placeholder=" Search.."  v-model="search">
            <li class="nav-item"><a>
                    <router-link to="/add-blog"><i class="fas fa-tachometer-alt"></i><span class="menu-text">Create Blog</span></router-link>
                </a></li>
            <li class="nav-item" v-if="showMyBlogs"><a>
                    <router-link to="/my-blogs"><i class="fas fa-tachometer-alt"></i><span class="menu-text">My Blogs</span></router-link>
                </a></li>
            <li class="nav-item"><a>
                    <i class="fas fa-tachometer-alt"></i>
                    <h3 class="menu-heading">Categories</h3>
                </a></li>
            <li class="nav-item" v-for="blog in Object.entries(counts)" :key="blog"><a>
                    <i class="fas fa-tachometer-alt"></i><span class="menu-text">{{blog[0].toUpperCase()}}</span>
                </a>
                <a>
                    <i class="fas fa-tachometer-alt"></i><span class="menu-text">{{blog[1]}}</span>
                </a></li>
        </ul>
    </nav>
</div>
</template>

<script>
import {
    ApiService
} from "../../services/api-service";
export default {
    name: 'SideNAv',

    data() {
        return {
            blogs: [],
            service: new ApiService("blogs"),
            counts: {},
            search: '',
        };
    },
    mounted() {
        this.getBlogs();
    },
    watch:{
        search:{
            handler(){
                this.$emit('searchBlog', this.search);
            }
        }
    },
    computed: {
        showMyBlogs() {
            return localStorage.getItem('status') == 'true' ? true : false;
        }
    },

    methods: {
        getBlogs() {
            this.service.get().then((result) => {
                this.blogs = result;
            }).then(() => {
                for (let blog of this.blogs) {
                    let category = blog.category;
                    this.counts[category] = this.counts[category] ? this.counts[category] + 1 : 1;
                }
            });
        },
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Grandstander&display=swap");

body {
    font-family: "Grandstander", cursive;
}

* {
    margin: 0;
    padding: 0;
}

.container {
    height: 100vh;
    --bs-gutter-x: 0rem;

}

input {
    margin: 0px 10px;
    width: 13rem;
    border: none;
    border-radius: 7px;
    height: 2rem;
    margin-bottom: 30px;
}

.side-nav,
.nav-menu {
    height: 100%;
}

.side-nav .nav-menu {
    list-style: none;
    padding: 40px 0;
    width: auto;
    background-color: #434242;
}

.side-nav .nav-item {
    position: relative;
    padding: 10px 20px;
}

.nav-item.active {
    background-color: #fff;
    box-shadow: 0px -3px rgba(0, 0, 0, 0.2), 0px 3px rgba(0, 0, 0, 0.2);
}

.nav-item.active a {
    color: #2980b9;
}

.nav-item a {
    text-decoration: none;
    color: #fff;
}

.menu-text {
    padding: 0 20px;
    color: white;
}

.menu-heading {
    padding-top: 20px;
    color: black;
}

.side-nav .nav-item.active::before {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 100%;
    right: 0;
    height: 150%;
    width: 20px;
    border-bottom-right-radius: 25px;
    box-shadow: 0 20px 0 0 #fff;
}

.side-nav .nav-item.active::after {
    content: "";
    position: absolute;
    background-color: transparent;
    top: 100%;
    right: 0;
    height: 150%;
    width: 20px;
    border-top-right-radius: 25px;
    box-shadow: 0 -20px 0 0 #fff;
}
</style>
