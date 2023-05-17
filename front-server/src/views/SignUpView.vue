<template>
	<div>
		<h1>Sign Up Page</h1>
		<form>
			<label for="username">username : </label>
			<input id="username" type="text" /><br />

			<label for="password1"> password : </label>
			<input id="password1" type="password" /><br />

			<label for="password2"> password confirmation : </label>
			<input id="password2" type="password" />

			<input type="submit" value="SignUp" />
		</form>
	</div>
</template>

<script>
export default {
	name: 'SignUpView',
	data() {},
	methods: {},
}
</script>
