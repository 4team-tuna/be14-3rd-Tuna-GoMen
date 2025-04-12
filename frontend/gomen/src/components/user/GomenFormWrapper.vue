<template>
    <div class="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-md w-[400px] p-6 border border-gray-300">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="GoMen Logo" class="h-12" />
        </div>
        <slot />
      </div>
    </div>
  </template>
  