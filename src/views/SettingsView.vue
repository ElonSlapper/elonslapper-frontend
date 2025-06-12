<template>
<div>
  <div class="px-4 sm:px-0">
    <h1 class="text-4xl font-semibold text-gray-900">Settings</h1>
  </div>
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">App Version</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 font-mono">v1.23.3</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Device ID</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 font-mono">0197601b-e15d-73e1-a96f-1f55cbb97c99 </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Actions</dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm/6 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="$emit('reset')"
          >
            Reset App
          </button>
        </dd>
      </div>
    </dl>
  </div>
</div>

</template>
