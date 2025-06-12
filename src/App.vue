<script lang="ts" setup>
import Header from '@/components/core/Header.vue';
import Footer from '@/components/core/Footer.vue';
import MainLayout from '@/views/MainLayout.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Header />

        <main class="flex-grow">
            <MainLayout>
              <RouterView class="" />
            </MainLayout>
        </main>

        <Footer />
    </div>
</template>
