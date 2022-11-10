<template>
<div class="card">
    <div class="card-header">
        <img :src=data.image alt="None">
    </div>
    <div class="card-content">
        <div class="date-category">
            <span>{{data.category}}</span>
            <p>{{date[0]}}</p>
        </div>
        <h3>{{subTitle}}</h3>
        <p>{{subDescription}}</p>
    </div>
    <div class="card-footer">
        <div class="author">
            <p>By {{data.author}}</p>

        </div>
        <div v-if="showDelete">
            <button class="update-btn" @click.stop="editBlog()">Edit</button>
            <button class="delete-btn" @click.stop="deleteBlog()">Delete</button>
        </div>

    </div>
</div>
</template>

<script>
import {
    ApiService
} from "../../services/api-service";

export default {
    name: 'BlogCard',

    data() {
        return {
            subDescription: String,
            subTitle: String,
            service: new ApiService("blogs"),
            date:Date
        };
    },

    props: {
        data: {
            type: Object
        },
        showDelete: {
            type: Boolean,
            default: false
        }
    },

    mounted() {

        this.subDescription = this.data.description.substring(0, 50);
        this.subTitle = this.data.title.substring(0, 40);

    },
    created(){
        this.date=this.data.date.split('T');
    },

    methods: {
        deleteBlog() {
            this.service.deleteBlog(this.data.id);
            this.$emit('deleted');
        },
        editBlog() {
            this.$router.push({
                name: "UpdateBlog",
                params: {
                    id: this.data.id
                }
            });
        },
    },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.date-category{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
body {
    height: 100vh;
    font-family: "Open Sans", sans-serif;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    width: 360px;
    background-color: #fff;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
    border-radius: 0.5rem;
}

.card-header {
    width: 100%;
}

.card-header img {
    width: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    height: 250px;
}

.card-content {
    padding: 1rem;
    min-height: 15rem;
}

.card-content span {
    background-color: #51adc4;
    color: #fff;
    font-weight: 300;
    font-size: 10px;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    text-transform: uppercase;
}

.card-content h3 {
    margin: 1rem 0 0.5rem 0;
}

.card-content p {
    font-size: 14px;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.author p {
    font-weight: 700;
    font-size: 14px;
}

.update-btn {
    border: none;
    padding: 5px;
    color: white;
    background: #35a70f;
    border-radius: 5px;
    margin-inline: 12px;
    width: 60px;
}

.delete-btn {
    border: none;
    padding: 5px;
    color: white;
    background: red;
    border-radius: 5px;
    width: 60px;
}

.author small {
    font-size: 12px;
}
</style>
