<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">
          <img src="/src/assets/img/logo-v.png" width="60" class="d-inline-block align-top ms-3" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <RouterLink to="/" class="nav-link">Vue新手營</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/HW01" class="nav-link">Week 01</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/HW02" class="nav-link">Week 02</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/HW03" class="nav-link">Week 03</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
