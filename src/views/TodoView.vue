<template>
    <div class="py-5 d-flex justify-content-center align-items-center">
        <div class="auth-content overflow-hidden">
            <div class="container" id="authPage">
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
                                        <div v-if="messageValidation" :class="['alert', alertClass, 'mt-3']" id="alertSingIn">
                                            {{ messageValidation }}
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

                                        <!-- 驗證 -->
                                        <div class="pt-3">
                                            <div v-if="user.uid">
                                                <div class="card p-4">
                                                    <h5>登入驗證</h5>
                                                    <p>嗨！ {{ user.nickname }} 請點擊驗證進入待辦清單</p>
                                                    <div class="d-flex">
                                                        <div class="col">
                                                            <input type="text" class="form-control" v-model="memberToken" />
                                                        </div>
                                                        <button class="btn btn-secondary w-25 ms-2" @click="validateToken"> 驗證 </button>
                                                    </div>
                                                    <p class="text-danger float-end">{{ messageCheckOut }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end 驗證 -->
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
                            <button type="button" class="btn btn-success w-100" @click="signUp"> 註冊 </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Modal -->
    </div>
    <div class="py-5" id="todoPage">
        <div class="todo-content">
            <div class="container-fluid">
                <!-- Todo List -->
                <div class="row justify-content-center align-items-center">
                    <div class="col-xl-8">
                        <div id="todoList">
                            <div class="card">
                                <div class="card-header p-3">
                                    <h3 class="fw-bold mb-0">待辦事項清單</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div class="col-9">
                                            <input type="text" class="form-control" placeholder="輸入代辦事項">
                                        </div>
                                        <div class="col-3">
                                            <button type="button" class="btn btn-primary w-100" @click="addProject"> 新增 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end List -->
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const api = 'https://todolist-api.hexschool.io'

//註冊
const messageSignUp = ref('') // 用來顯示成功或失敗的訊息
const alertSignUp = ref('alert-danger') // 預設為錯誤訊息的樣式

const signUpField = ref({
  email: '',
  password: '',
  nickname: ''
})

const signUp = async () => {
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
            const modalElement = document.getElementById('authSignUp')
            const modalInstance = bootstrap.Modal.getInstance(modalElement)
            modalInstance.hide() // 關閉Modal
        }, 2000)
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

const messageValidation = ref('') // 顯示驗證訊息
const alertClass = ref('alert-danger') // 預設錯誤訊息的樣式
const token = ref('');

// 登入邏輯
const signIn = async () => {
    try {
        const response = await axios.post(`${api}/users/sign_in`, signInField.value)

        // 儲存 Token
        token.value = response.data.token;
        console.log(response.data.token);

        messageValidation.value = '登入成功，請驗證'
        alertClass.value = 'alert-success' // 更改為成功訊息樣式
    } catch (error) {
        console.log(error);
        messageValidation.value = '登入失敗，請檢查帳號和密碼'
        alertClass.value = 'alert-danger' // 更改為成功訊息樣式
    }
}

// 驗證 Token
const user = ref({
    nickname: '',
    uid: ''
})

const memberToken = ref('') // 帳號Tokan
const messageCheckOut = ref('') // 顯示驗證訊息

const validateToken = async () => {
    try {
        const response = await axios.get(`${api}/users/checkout`, {
            header: {
                Authorization: memberToken.value,
            },
        });
        memberToken.value = response.data.token;
        messageCheckOut.value = '驗證成功，3秒後自動跳轉至待辦事項'
    } catch (error) {
        console.log(error);
        messageCheckOut.value = '驗證失敗，請再次登入'
    }
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
.alert.alert-danger {
    color: #da3e3e;
}
.alert.alert-success {
    color:  #3fab6c;
}
</style>