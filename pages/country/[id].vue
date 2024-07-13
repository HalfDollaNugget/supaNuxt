<template>
  <div class="flex flex-1 flex-col gap-2 bg-stone-900 text-slate-50 justify-center items-center">
    <p class="font-black text-5xl p-2">{{ country.local_name }}</p>
    <pre v-if="Object.keys(country)" class="flex flex-none p-4 rounded-lg ring-1 ring-stone-600/50 text-sm">{{ country }}</pre>
  </div>
</template>
<script setup lang="ts">
import type { ICountries } from '@/pages/index'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const route = useRoute()
const country = ref<ICountries>({})

const getcountry = async () => {
  let { data, error } = await supabase.from('countries').select().eq('id', route.params.id).maybeSingle()
  return data
}

onMounted(async () => {
  country.value = await getcountry()
})
</script>