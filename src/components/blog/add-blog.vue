<template>
<Header></Header>

<div class="container">
    <form id="app" @submit="checkForm" novalidate="true">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <div>
            <label>Title</label>
        </div>
        <div>
            <input type="text" v-model="title">
        </div>
        <div class="ran">
            <label>Category</label>
        </div>
        <select v-model="category" class="selectbox">
            <option value="sports">Sports</option>
            <option value="news">News</option>
            <option value="fashion">Fashion</option>
            <option value="entertainment">Entertainment</option>
            <option value="economy">Economy</option>
        </select>
        <div class="ran">
            <label>Upload Image</label>
        </div>
        <div>
            <input type="file" @change="onFile" />
            <img :src="imgSrc" v-if="imgSrc" />
        </div>
        <div class="ran">
            <label>Details</label>
        </div>
        <div>
            <textarea v-model="details"></textarea>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
</template>

<script>
import {
    ApiService
} from "../../services/api-service";
import Header from '../header/header.vue'

export default {
    name: 'AddBlog',

    components: {
        Header
    },

    data() {
        return {
            title: null,
            category: null,
            imgSrc: null,
            details: null,
            service: new ApiService('blogs'),
            errors: [],
            update:false
        };
    },

    beforeCreate(){
        if (localStorage.getItem("status") == 'false') {
            this.$router.push({
                name: 'Login'
            });
        }
    },

    created() {
        if(this.$route.params.id){
            this.patchForm();
            this.update=true;
        }
    },

    methods: {
        checkForm(e) {
            this.errors = [];

            if (!this.title) {
                this.errors.push("Title required.");
            }
            if (!this.category) {
                this.errors.push('Please select a Blog Category.');
            }
            if (!this.imgSrc) {
                this.errors.push("Please upload a image.");
            }
            if (!this.details) {
                this.errors.push('Descriptions required.');
            }
            if (!this.errors.length) {
                if(this.update){
                    this.UpdateBlog();
                }
                else{
                    this.submitBlog();
                }
            }
            e.preventDefault();
        },
        UpdateBlog(){
            let obj = {
                "title": this.title,
                "description": this.details,
                "image": this.imgSrc,
                "author": localStorage.getItem("user"),
                "date": new Date(),
                "category": this.category
            };
            this.service.updateBlog(this.$route.params.id,obj);
            this.$router.push({
                name: 'Home'
            });
        },
        submitBlog() {
            let obj = {
                "title": this.title,
                "description": this.details,
                "image": this.imgSrc,
                "author": localStorage.getItem("user"),
                "date": new Date(),
                "category": this.category
            };
            this.service.addBlog(obj);
            this.$router.push({
                name: 'Home'
            });
        },
        onFile(e) {
            const files = e.target.files
            if (!files.length) return

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.imgSrc = reader.result)
        },
        patchForm(){
            this.service.getWithId(this.$route.params.id).then((result) => {
                this.title= result.title;
                this.category= result.category;
                this.imgSrc= result.image;
                this.details= result.description;
            });
        },
    }

}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 10px;
}

@media only screen and (min-width:800px) {
    .container {
        margin: 30px;
    }
}

label {
    font-weight: 400;
    font-size: x-large;
}

input {
    width: 50%;
    min-height: 40px;
    font-size: larger;
}

textarea {
    width: 80%;
    min-height: 10rem;
}

button {
    width: 80%;
    height: 40px;
    background-color: #e74242;
    border: none;
    color: white;
}

.ran {
    margin-top: 30px;
}
.selectbox{
    width: 30%;
    height: 40px;
}
</style>
