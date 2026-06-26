<script setup lang="ts">
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref, onMounted, reactive, watch, computed } from 'vue'
import axios from 'axios'
import { useWizardStep } from '../../../composables/useWizardStep'
import { useAccommodationWizardStore } from '../../../stores/accomodation'
import { useGeolocation } from '@vueuse/core'
import { useRouter } from 'vue-router'

type Option = {
    label: string
    value: string
}

const states = ref<Option[]>([])
const cities = ref<Option[]>([])

const loadStates = async () => {
    const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    )

    states.value = data
        .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        .map((s: any) => ({
            label: s.sigla,
            value: s.sigla,
        }))
}

const loadCities = async (uf: string) => {
    address.city = ''
    cities.value = []

    if (!uf) return

    const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )

    cities.value = data.map((c: any) => ({
        label: c.nome,
        value: c.nome,
    }))
}

const { onContinue, canContinue, onBack } = useWizardStep()
const store = useAccommodationWizardStore()
const router = useRouter()

const address = reactive({
    state: "",
    city: "",
    cep: "",
    neighborhood: "",
    street: "",
    number: 0,
    lon: 0,
    lat: 0
})

onContinue.value = async () => {
    const ok = await store.setAddress(address)
    if (ok) {
        await router.push('details')
    }
}

onBack.value = () => {
    router.push('services')
}

const { coords } = useGeolocation()

const geoReady = ref(false)

watch(
    coords,
    (c) => {
        if (!Number.isFinite(c.latitude) || !Number.isFinite(c.longitude)) return

        address.lat = c.latitude
        address.lon = c.longitude

        geoReady.value = true
    },
    { immediate: true }
)

const next = computed(() => {
    const { cep, street, number, neighborhood, state, city } = address
    return !!cep && !!street && number > 0 && !!neighborhood && !!state && !!city
})

watch(next, (value) => {
    canContinue.value = value
}, { immediate: true })

const onMarkerDragEnd = (e: any) => {
    if (!e.latLng) return
    address.lat = e.latLng.lat()
    address.lon = e.latLng.lng()
}

onMounted(() => {
    loadStates()
})

const apikey = import.meta.env.VITE_GOOGLE_MAPS_API as string
</script>

<template>
    <div class="container">
        <div class="title">
            <div>
                <h1>Confirme seu endereço</h1>
                <p>Seu endereço só é compartilhado com os hóspedes depois que a reserva é confirmada!</p>
            </div>
        </div>

        <div class="content">
            <form @submit.prevent="" class="form">

                <div class="label cep">
                    <label for="cep">CEP</label>
                    <InputMask
                        id="cep"
                        mask="99999-999"
                        placeholder="00000-000"
                        slot-char=""
                        fluid
                        v-model="address.cep"
                    />
                    <span>O preenchimento do CEP agiliza seu cadastro.</span>
                </div>

                <div class="label">
                    <label for="address">Endereço / Rua</label>
                    <InputText
                        id="address"
                        type="text"
                        placeholder="ex: Rua das Flores"
                        fluid
                        v-model="address.street"
                    />
                </div>

                <div class="label direction-row">
                    <div class="label" style="flex: 1;">
                        <label for="number">Número</label>
                        <InputNumber
                            inputId="number"
                            :useGrouping="false"
                            fluid
                            placeholder="Numero da Casa"
                            v-model="address.number"
                        />
                    </div>

                    <div class="label" style="flex: 2;">
                        <label for="complement">Complemento (opcional)</label>
                        <InputText
                            id="complement"
                            type="text"
                            placeholder="Complemento"
                            fluid
                        />
                    </div>
                </div>

                <div class="label">
                    <label for="neighborhood">Bairro</label>
                    <InputText
                        id="neighborhood"
                        type="text"
                        placeholder="ex: Centro"
                        fluid
                        v-model="address.neighborhood"
                    />
                </div>

                <div class="label direction-row">
                    <div class="label" style="flex: 1;">
                        <label for="state">Estado (UF)</label>
                        <Select
                            v-model="address.state"
                            inputId="state"
                            optionLabel="label"
                            optionValue="value"
                            :options="states"
                            placeholder="UF"
                            fluid
                            @change="loadCities($event.value)"
                        />
                    </div>

                    <div class="label" style="flex: 2;">
                        <label for="city">Cidade</label>
                        <Select
                            v-model="address.city"
                            inputId="city"
                            optionLabel="label"
                            optionValue="value"
                            :options="cities"
                            :disabled="!address.state"
                            placeholder="Cidade"
                            fluid
                        />
                    </div>
                </div>

            </form>

            <div class="map">
                <GoogleMap
                    v-if="geoReady"
                    :api-key="apikey"
                    style="width: 500px; height: 450px; border-radius: 20px;"
                    :center="{
                        lat: address.lat,
                        lng: address.lon
                    }"
                    :zoom="15"
                >
                    <Marker
                        :options="{
                            position: {
                                lat: address.lat,
                                lng: address.lon
                            },
                            draggable: true
                        }"
                        @dragend="onMarkerDragEnd"
                    />
                </GoogleMap>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
}

.title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.title div {
    text-align: center;
}

.content {
    display: flex;
    align-items: start;
    justify-content: center;
    flex: 1;
    width: 100%;
    gap: 40px;
}

.content .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 400px;
}

.form .label {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: rgb(156, 156, 156);
    width: 100%;
}

.direction-row {
    flex-direction: row !important;
    gap: 10px;
}

.direction-row > .label {
    width: auto;
}
</style>