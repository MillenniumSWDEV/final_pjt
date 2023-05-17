module.exports = {
	extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',
		'plugin:vue/vue3-recommended',
		// 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
		'@vue/eslint-config-prettier',
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: false,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
				// 프리티어가 2.0인가부터 기본 개행이 CR만 사용한다고 함. 그래서 CRLF를 사용하는 윈도우랑 충돌남 그래서.. 빨간줄 킹받는거 해결해주려면 endOfLine: 'auto' 설정 해줘야함
				endOfLine: 'auto',
			},
		],
	},
}
