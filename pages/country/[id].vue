<template>
  <div class="flex flex-1 flex-col gap-2 bg-stone-900 text-slate-50 justify-center items-center">
    <div class="flex flex-none flex-col gap-2 animate-slide-up">
      <div v-show="Object.keys(country).length" class="flex flex-col gap-2">
        <div class="justify-center items-center flex flex-row flex-wrap w-full gap-2">
          <p class="font-black text-5xl p-2 break-all inline-flex flex-none justify-center items-center text-center">{{ jpnName || country.name || country.local_name }}</p>
          <div v-if="countryWarflag != undefined" class="inline-flex flex-none size-12">
            <img v-if="countryWarflag != ''" :src="countryWarflag" class="size-12 animate-slide-up">
            <div v-else class="size-12 flex flex-none justify-center items-center">
              <svg class="animate-spin size-6 text-slate-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <pre class="flex flex-1 p-4 rounded-lg ring-1 ring-stone-600/50 text-sm justify-center break-all">{{ {...country, ...extendedInfo} }}</pre>
        </div>
      </div>
      <div class="flex flex-row flex-none w-full gap-2">
        <div @click="getCountry(Number(route.params.id) - 1)" class="flex flex-1 rounded-lg ring-1 ring-stone-600/50 text-sm py-2 justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
          </svg>
        </div>
        <div @click="getCountry(Number(route.params.id) + 1)" class="flex flex-1 rounded-lg ring-1 ring-stone-600/50 text-sm py-2 justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ICountries } from '~/pages/index.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const route = useRoute()
const router = useRouter()
const country = ref<ICountries>({
  id: 0,
  name: '',
  iso2: '',
  iso3: '',
  local_name: null,
  continent: null,
  warflag: null,
  jpnname: null
})
const extendedInfo = ref({})
const countryWarflag = ref('')
const jpnName = ref('')
const cachedCountries = reactive<{ [id: number]: ICountries }>({})

onKeyStroke(['ArrowLeft', 'ArrowRight'], (e) => {
  if (e.key == 'ArrowLeft') {
    getCountry(Number(route.params.id) - 1)
  } else if (e.key == 'ArrowRight') {
    getCountry(Number(route.params.id) + 1)
  }
}, { dedupe: true })

const loadImage = (src: string) => {
  if (!src) return countryWarflag.value = src
  let img = new Image()
  img.onload = () => {
    countryWarflag.value = img.src
  }
  img.src = src
}

const getCountry = async (id: number) => {
  if (cachedCountries[id]) console.log(cachedCountries[id])
  if (id == 0) return
  let { data, error } = await supabase.from('countries').select().eq('id', id).maybeSingle()
  if (error) return
  let jpn: any = await getJPY(data.iso2)
  delete data.id
  let info = jpn[0]
  extendedInfo.value = {
    population: info.population,
    currencies: info.currencies,
  }
  jpnName.value = info?.translations?.jpn?.official
  loadImage(info.coatOfArms.png)
  data.capital = info.capital[0]
  country.value = data
  router.push({
    params: {
      id
    }
  })
  const tempUpdate: Partial<ICountries> = {}
  if (data.warflag == null) tempUpdate.warflag = info.coatOfArms.png
  if (data.jpnname == null) tempUpdate.jpnname = info?.translations?.jpn?.official
  if (Object.keys(tempUpdate).length) {
    let { error } = await supabase.from('countries').update(tempUpdate).eq('id', id)
  }
}

const getJPY = async (iso: string) => {
  let res = await $fetch(`https://restcountries.com/v3.1/alpha/${iso}`)
  return res
}

onMounted(async () => {
  await getCountry(Number(route.params.id))
})
</script>{
  id: 0,
  name: '',
  iso2: '',
  iso3: '',
  local_name: null,
  continent: null,
  warflag: null,
  jpnname: null
}