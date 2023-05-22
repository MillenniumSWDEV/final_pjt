const API_URL = "http://127.0.0.1:8000";

const article = {
	state: {
		articles: [],
		article: null
	},
	mutations: {
		// 게시글
		GET_ARTICLES(state, newArticle) {
			state.articles = newArticle;
		},
		GET_ARTICLE_DETAIL(state, articleDetail) {
			state.article = articleDetail
		}
	},
	actions: {
			// 게시글 axios
		getArticles(context) {
			axios({
				method: "get",
				url: `${API_URL}/api/v1/articles/`,
			})
			.then((res) => {
				context.commit("GET_ARTICLES", res.data);
			})
			.catch((err) => {
				console.log(err);
				// 404 싫어요
				context.commit("GET_ARTICLES", []);
			});
		},
		// article의 id로 detail을 불러오는 함수
		getArticleDetail(context, articleId) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/articles/${articleId}/`,
      })
			.then((res) => {
				context.commit("GET_ARTICLE_DETAIL", res.data)
			})
			.catch((err) => {
				console.log(err);
			});
    },
		// 게시글 지우는 코드
		articleDelete(context, articleId) {
      console.log("deleted");
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/articles/${articleId}/`,
      })
			.then((res) => {
				console.log(res);
				this.$router.push({ name: "ArticleView" });
			})
			.catch((error) => {
				console.log(error, context);
			});
    },
		// 댓글 달기
		createComment(context, articleId, content) {
      axios({
        method: "post",
        url: `${API_URL}/api/v1/articles/${articleId}/comments/`,
        data: { content },
      })
			.catch((error) => console.log(error, context));
    },
		// 댓글 지우기
    deleteComment(context, commentId) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
      })
			.then()
			.catch((err) => console.log(err, context));
    },
	}
}