<template>
<div>
    <div v-if="!showUpdateBoard">
        <h1>게시글상세</h1>
        <p>글 번호 : {{ article?.id }}</p>
        <p>제목 : {{ article?.title }}</p>
        <p>내용 : {{ article?.content }}</p>
        <p>작성시간 : {{ article?.created_at }}</p>
        <p>수정시간 : {{ article?.updated_at }}</p>
        <p>작성자 : {{ article?.user }}</p>
        <button @click="showUpdateBoard=true">수정하러가기</button>
        <button @click="articleDelete">삭제하기</button>
        <hr />
        <div v-for="com in article?.comment_set" :key="com.id">
            <p>
                내용 - {{ com.content }}
                <input
                id="delete"
                type="submit"
                value="댓글삭제"
            @click="deleteComment(com.id)"
            />
        </p>
        </div>
        <form @submit.prevent="createComment">
            <label for="comment">댓글 작성 : </label>
            <input
            id="comment"
            v-model.trim="comment"
            type="text"
            @keyup.enter="createComment"
            />
            <input id="submit" type="submit" />
        </form>
    </div>
    <UpdateBoard v-if="showUpdateBoard" @goBack="handleGoBack"/>
</div>
</template>

<script>
import axios from "axios";
import UpdateBoard from "./UpdateBoard.vue";
const API_URL = "http://127.0.0.1:8000";

export default {
name: "DetailView",
components:{
    UpdateBoard
},
data() {
    return {
    article: null,
    comment: null,
    showUpdateBoard: false,
    };
},
created() {
    this.getArticleDetail();
},
computed:{
isLogin(){
    return this.$store.getters.isLogin //로그인 여부
},
},
methods: {
    handleGoBack(updatedArticle) {
      this.showUpdateBoard = false;
      this.article = updatedArticle
    },
    getArticleDetail() {
    axios({
        method: "get",
    //   url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
        url: `${API_URL}/api/v1/articles/20/`,     // 테스트용    
    })
        .then((res) => {
        console.log(res);
        this.article = res.data;
        })
        .catch((err) => {
        console.log(err);
        });
    },
    articleDelete() {
    console.log("삭제요청");
    if(this.isLogin){
        axios({
            method: "DELETE",
            url: `${API_URL}/api/v1/articles/${this.$route.params.id}`,
            // url: `${API_URL}/api/v1/articles/20/`,     // 테스트용   
            headers: {
            Authorization: `Token ${this.$store.state.user.token}`,
            // Authorization: `Token a365d5005ce82ab5dd1681e97e5042216dd2aa8a`, // 테스트용
            },
        })
        .then((res) => {
            console.log(res.data)
            this.$router.push({ name: "MainPageView" });
            console.log('삭제완료')
        })
        .catch((err) => {
            console.log(err);
        });
    }else{
        alert('로그인이필요합니다')
    }
    },
    createComment() {
    const content = this.comment;
    axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/`,
        data: { content },
    })
        .then(this.$router.go(0))
        .catch((error) => console.log(error));
    },
    deleteComment(commentId) {
    axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
    })
        .them(this.$router.go(0))
        .catch((err) => console.log(err));
    },
},
}
</script>
