<template>
    <div class="py-5 d-flex justify-content-center align-items-center">
        <div class="auth-content overflow-hidden">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card overflow-hidden m-0">
                            <div class="row justify-content-center align-items-center g-0">
                                <div class="col-lg-5 col-md-6 d-none d-md-block">
                                    <img src="https://images.unsplash.com/photo-1726551195923-346249e1c6b7?q=100&w=450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="login" class="img-fluid">
                                </div>
                                <div class="col-lg-7 col-md-6">
                                    <div class="p-lg-5 p-4">
                                        <h3 class="fw-bold">登入您的Todo List帳戶</h3>
                                        <div v-if="messageSignIn" :class="['alert', alertClass, 'mt-3']" id="alertSingIn">
                                            {{ messageSignIn }}
                                        </div>
                                        <div class="input mt-4">
                                            <div class="mb-3">
                                                <label for="inputEmail" class="form-label text-secondary">電子郵件地址</label>
                                                <input type="email" id="inputEmail" class="form-control" v-model="signInField.email">
                                            </div>
                                            <div class="mb-3">
                                                <label for="inputPw" class="form-label text-secondary">密碼</label>
                                                <input type="password" id="inputPw" class="form-control" v-model="signInField.password">
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary w-100" @click="signIn">登入</button>
                                        <div class="mt-2 d-flex align-items-center justify-content-center">
                                            <span>還沒有帳號嗎？</span>
                                            <button type="button" class="btn btn-md btn-link link-offset-2" data-bs-toggle="modal" data-bs-target="#authSignUp"> 註冊 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="authSignUp" tabindex="-1" aria-labelledby="authSignUpLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5 pt-1">
                        <h3 class="text-center" id="authSignUpLabel">會員註冊</h3>
                        <div v-if="messageSignUp" :class="['alert', alertSignUp, 'mt-3']">
                            {{ messageSignUp }}
                        </div>
                        <form>
                            <div class="input mt-4">
                                <div class="mb-3">
                                    <label for="SignUpEmail" class="form-label text-secondary">電子郵件地址</label>
                                    <input type="email" id="SignUpEmail" class="form-control" placeholder="設定您的Email信箱為帳號" v-model="signUpField.email">
                                </div>
                                <div class="mb-3">
                                    <label for="SignUpPw" class="form-label text-secondary">設定密碼</label>
                                    <input type="password" id="SignUpPw" class="form-control" placeholder="請設定登入密碼" v-model="signUpField.password">
                                </div>
                                <div class="mb-3">
                                    <label for="SignUpNickname" class="form-label text-secondary">暱稱</label>
                                    <input type="text" id="SignUpNickname" class="form-control" placeholder="請設定暱稱" v-model="signUpField.nickname">
                                </div>
                            </div>
                            <button type="button" class="btn btn-success w-100" @click="signup"> 註冊 </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Modal -->
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const api = 'https://todolist-api.hexschool.io'

//註冊
const messageSignUp = ref('') // 用來顯示成功或失敗的訊息
const alertSignUp = ref('alert-danger') // 預設為錯誤訊息的樣式

const signUpField = ref({
  email: '',
  password: '',
  nickname: ''
})

const signup = async () => {
    try {
        const res = await axios.post(`${api}/users/sign_up`, signUpField.value)
        console.log(res);
        
        messageSignUp.value = '註冊成功！' // 註冊成功訊息
        alertSignUp.value = 'alert-success' // 註冊成功的樣式

        // 清空表單欄位
        signUpField.value.email = ''
        signUpField.value.password = ''
        signUpField.value.nickname = ''
        
        // 1秒後關閉Modal視窗
        setTimeout(() => {
            const modalElement = document.querySelector('#exampleModal') // 確保選到正確的Modal ID
            const modalInstance = bootstrap.Modal.getInstance(modalElement)
            modalInstance.hide() // 關閉Modal
        }, 1000) // 1秒後關閉
    } catch (error) {
        console.log(error)
        messageSignUp.value = error.response.data.message // 顯示錯誤訊息
        alertSignUp.value = 'alert-danger' // 錯誤樣式
    }
}

//登入
const signInField = ref({
  email: '',
  password: ''
})

const messageSignIn = ref('')
const alertClass = ref('alert-danger') // 預設錯誤訊息的樣式

const signIn = async () => {
    try {
        const res = await axios.post(`${api}/users/sign_In`, signInField.value)
        console.log(res)
        messageSignIn.value = '登入成功！正在跳轉到Todo List...' // 顯示成功訊息
        alertClass.value = 'alert-success' // 更改為成功訊息樣式
        document.cookie = `custonTodoName=${res.data.token};`

        // 延遲一段時間後跳轉頁面
        setTimeout(() => {
            window.location.href = '/todo-list' // 替換成你的Todo List頁面的路徑
        }, 1500) // 1.5秒後跳轉
    } catch (error) {
        console.log(error)
        messageSignIn.value = error.response.data.message // 顯示錯誤訊息
        alertClass.value = 'alert-danger' // 顯示錯誤時的樣式
    }
}




//驗證登入



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
.alert.alert-danger {
    color: #da3e3e;
}
.alert.alert-danger {
    color:  #34bd6d;
}
</style>