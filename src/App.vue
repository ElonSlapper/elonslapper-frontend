<script lang="ts" setup>
import Header from '@/components/core/Header.vue';
import Footer from '@/components/core/Footer.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Header />

        <main class="flex-grow">
            <RouterView class="" />
        </main>

        <Footer />
    </div>
</template>
