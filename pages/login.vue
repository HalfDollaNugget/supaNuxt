<template>
  <div class="flex flex-1 justify-center items-center text-slate-50">
    <div class="flex flex-none p-4 flex-col gap-2 bg-stone-700/50 backdrop-blur rounded-lg">
      <h3 class="font-semibold text-2xl text-slate-50 font-mono px-2 text-center">Log in!</h3>
      <div class="flex flex-col gap-1 flex-none">
        <p class="px-2 text-sm">Email</p>
        <input type="email" v-model="loginForm.email" name="email" placeholder="elplebo@supamail.io" class="outline-none flex flex-none rounded-md px-4 py-2 bg-stone-700 ring-1 ring-transparent invalid:ring-rose-500/50 transition-all">
      </div>
      <div class="flex flex-col gap-1 flex-none">
        <p class="px-2 text-sm">Password</p>
        <input type="password" v-model="loginForm.password" name="password"  placeholder="Supapassword@420" class="outline-none flex flex-none rounded-md px-4 py-2 bg-stone-700 ring-1 ring-transparent invalid:ring-rose-500/50 transition-all">
      </div>
      <div @click="signIn" class="flex flex-none flex-row gap-1 p-2 rounded-md bg-indigo-500 text-sm font-semibold justify-center items-center cursor-pointer italic">
        <p class="">{{ loginError != '' ?? 'Send it!' }}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 -rotate-12">
          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

//const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const loginForm = ({
  email: '',
  password: ''
})

const loginError = ref('')

const signIn = async () => {
  const { data, error } = await auth.signInWithPassword(loginForm)
  console.log(data)
  if (error) loginError.value = error[1]
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/authorized')
  }
})
</script>