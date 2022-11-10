<template>
<Header class="sticky"></Header>
<div class="nav-blogcard">
    <div class="side-nav">
        <SideNav class="sticky-nav" @searchBlog="applyFilter"></SideNav>
    </div>
    <div class="pagination-card">
        <div class="cards">
            <div v-for="blog in blogs" :key="blog.id" v-on:click="viewBlog(blog.id)">
                <BlogCard :showDelete=true :data="blog" @deleted="getBlogs()"></BlogCard>
            </div>
        </div>
        <div class="fixed">
            <paginate :page-count="pageCount" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </div>
    </div>
</div>
</template>

<script>
import SideNav from "../sidenav/side-nav.vue";
import BlogCard from "../blog/blog-card.vue";
import Blog from "../blog/view-blog.vue";
import Header from "../header/header.vue";
import {
    ApiService
} from "../../services/api-service";
import Paginate from 'vuejs-paginate-next';

export default {
    name: "MyBlogs",

    components: {
        BlogCard,
        Blog,
        Header,
        SideNav,
        Paginate
    },

    data() {
        return {
            blogs: [],
            allBlogs: [],
            permanentAllBlogs: [],
            service: new ApiService("blogs"),
            enteriesPerPage: 6,
        };
    },

    created() {
        this.getBlogs();
    },

    computed: {
        pageCount() {
            return (this.allBlogs.length / this.enteriesPerPage);
        }
    },

    methods: {
        getBlogs() {
            this.blogs = [];
            this.service.get().then((result) => {
                for (let blog of result) {
                    if (blog.author == localStorage.getItem("user")) {
                        this.blogs.push(blog);
                    }
                }
            });
            this.allBlogs.reverse();
            this.permanentAllBlogs = this.allBlogs;
        },
        viewBlog(blogId) {
            this.$router.push({
                name: "Blog",
                params: {
                    id: blogId
                }
            });
        },
        clickCallback(pageNum) {
            this.blogs = this.allBlogs.slice((pageNum - 1) * this.enteriesPerPage, ((pageNum - 1) * this.enteriesPerPage) + this.enteriesPerPage);
        },
        applyFilter(search) {
            if (search == '') {
                this.allBlogs = this.permanentAllBlogs;
                return;
            }
            this.allBlogs = this.permanentAllBlogs.filter(post => {
                return post.title.toLowerCase().includes(search.toLowerCase()) || post.author.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase())
            })

        }

    },
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
@media only screen and (max-width: 600px) {
    .side-nav {
        display: none;
    }
}

.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
}

.sticky-nav {
    position: -webkit-sticky;
    position: sticky;
    z-index: 0;
    top: 5rem;
}

/* Write your own CSS for pagination */
.pagination {
    justify-content: center;
}

.pagination-card {
    display: flex;
    flex-direction: column;
}
.nav-blogcard {
    display: flex;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: row;
    margin: 2rem 10rem;
}

.card {
    margin: 20px;
}
</style>
