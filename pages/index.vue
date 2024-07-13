<template>
  <div class="flex flex-1 bg-stone-900 text-slate-50 justify-center items-center">
    <div class="flex flex-none flex-col gap-2 h-full w-1/2 bg-stone-800/50">
      <p class="font-semibold text-xl flex flex-none w-full p-2 justify-center items-center">{{ `Countries [${countries.length}]` }}</p>
      <div class="flex flex-1 flex-col divide-y divide-stone-500/50 overflow-y-auto">
        <template v-for="country in countries">
          <div v-if="!['', null, undefined].includes(country.local_name)" class="flex flex-none w-full flex-row gap-1 text-sm p-2">
            <p class="font-semibold">{{ country.local_name }}</p>
            <span class="opacity-50">{{ `[${country.iso3}]` }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const countries = ref<ICountries[]>([])

const getcountries = async () => {
  let { data, error } = await supabase.from('countries').select().order('local_name', { ascending: true })
  return data
}

onMounted(async () => {
  countries.value = await getcountries()
})

export interface ICountries {
  id: number
  name: string
  iso2: string
  iso3: string
  local_name: string | null
  continent: string | null
}
</script>

