<script setup>
import axios from 'axios'
console.log(axios)

// Promise 正式撰寫方式 以下程式將依序執行
// axios.get('https://randomuser.me/api/')
//     .then(response => {
//     console.log(1, response);
//     return axios.get('https://randomuser.me/api/');
//     })
//     .then(response => {
//     console.log(2, response);
//     })


// async 非同步 function寫法
async function getData() {
    console.log('getData');
    const response = await axios.get('https://randomuser.me/api/');
    // await 會變逐行執行 => 同步語言
    console.log('response');
}
</script>

<template>
  <h1>Asyns Function</h1>
</template>
