<template>
    <div class="py-5 d-flex justify-content-center align-items-center">
        <div class="auth-content overflow-hidden">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card overflow-hidden m-0">
                            <div class="row justify-content-center g-0">
                                <div class="col-lg-5 col-md-6 d-none d-md-block">
                                    <img src="https://images.unsplash.com/photo-1726551195923-346249e1c6b7?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="login" class="img-fluid">
                                </div>
                                <div class="col-lg-7 col-md-6">
                                    <div class="p-lg-5 p-4">
                                        <h1 class="fw-bold">Todo List</h1>
                                        <h5 class="mt-3">請先註冊帳號</h5>
                                        <div class="input">
                                            <div class="mb-3">
                                                <label for="inputEmail" class="form-label text-secondary">Email</label>
                                                <input type="email" id="inputEmail" class="form-control" placeholder="設定您的Email信箱為帳號" v-model="signupField.email">
                                            </div>
                                            <div class="mb-3">
                                                <label for="inputPw" class="form-label text-secondary">登入密碼</label>
                                                <input type="text" id="inputPw" class="form-control" placeholder="請設定登入密碼" v-model="signupField.password">
                                            </div>
                                            <div class="mb-3">
                                                <label for="inputNickname" class="form-label text-secondary">暱稱</label>
                                                <input type="text" id="inputNickname" class="form-control" placeholder="請設定暱稱" v-model="signupField.nickname">
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary w-100" @click="signup">註冊</button>
                                        <p class="text-center mt-2">已經有帳號嗎？ <a href="#!" class="link-primary">登入</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const api = 'https://todolist-api.hexschool.io'

const signupField = ref ({
  email: '',
  password: '',
  nickname: ''
})

const signup = async () => {
    console.log(`${api}/users/sign_up`)

    const res = await axios.post(`${api}/users/sign_up`,
        signupField.value
    );
    console.log(res)
}

</script>

<style>
.auth-content {
    padding-bottom: 60px;
    position: relative;
    z-index: 2;
    width: 100%;
}
.form-control {
    font-size: 0.875rem;
}
</style>