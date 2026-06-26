import { reactive, ref } from "vue";
import api from "../services/http/api";
import type { ibgeLocationPlaces, placeRequests, currentLoc } from "../types";
import { defineStore } from "pinia";


type ISODateString = `${number}-${number}-${number}`

interface QueryPlaces {
    city?:string;
    state?:string;
    query?:string;
    checkin:ISODateString;
    checkout:ISODateString;
    adult:number;
    children:number;
    baby:number;
    animal:number;
}


export const useHostStore = defineStore('hosts', () => {
    const places = ref([
        {
            title: 'Em destaque',
            items: [
                {
                    images: ['https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=600'],
                    title: 'Jericoacoara, CE',
                    distance: 'A 320 km de distância',
                    dates: '12–17 de jul.',
                    price: 487,
                    isNew: true,
                },
                {
                    images: ['https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=600'],
                    title: 'Gramado, RS',
                    distance: 'A 1.890 km de distância',
                    dates: '3–9 de ago.',
                    price: 612,
                    isNew: false,
                },
                {
                    images: ['https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=600'],
                    title: 'Paraty, RJ',
                    distance: 'A 1.040 km de distância',
                    dates: '20–25 de jul.',
                    price: 398,
                    isNew: true,
                },
                {
                    images: ['https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600'],
                    title: 'Fernando de Noronha, PE',
                    distance: 'A 540 km de distância',
                    dates: '1–6 de set.',
                    price: 1250,
                    isNew: false,
                },
                {
                    images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600'],
                    title: 'Florianópolis, SC',
                    distance: 'A 1.620 km de distância',
                    dates: '15–20 de ago.',
                    price: 540,
                    isNew: false,
                },
                {
                    images: ['https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=600'],
                    title: 'Ouro Preto, MG',
                    distance: 'A 290 km de distância',
                    dates: '8–12 de jul.',
                    price: 320,
                    isNew: true,
                },
                {
                    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5KMAdSYWgHcrBlZwHWHuExy54dScr0_dp-HRcDDR9Q&s=10'],
                    title: 'Búzios, RJ',
                    distance: 'A 980 km de distância',
                    dates: '22–27 de jul.',
                    price: 705,
                    isNew: false,
                },
                {
                    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL92dkFRNeXfedjhDvLPRJBK2bHu6X0PysuN0aFPWmLA&s=10'],
                    title: 'Alter do Chão, PA',
                    distance: 'A 2.430 km de distância',
                    dates: '5–10 de set.',
                    price: 410,
                    isNew: true,
                },
            ],
        },
        {
            title: 'Perto de você',
            items: [
                {
                    images: ['https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRfDwq_ktqqZlYduFztAdRT3LKu54IJSXR93mgMbglsma_eD6x1g8W4i58sEuSGAi9Ero1Gsz6Noq_0_45bxUiA4iKT&s=19'],
                    title: 'Canoa Quebrada, CE',
                    distance: 'A 165 km de distância',
                    dates: '14–19 de jul.',
                    price: 295,
                    isNew: false,
                },
                {
                    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600'],
                    title: 'Cumbuco, CE',
                    distance: 'A 35 km de distância',
                    dates: '11–14 de jul.',
                    price: 350,
                    isNew: true,
                },
                {
                    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKbNnDYDeIt9ys7pYJxjxOXjaoV2V-OSLMU5HVttMeg&s=10'],
                    title: 'Lagoinha, CE',
                    distance: 'A 110 km de distância',
                    dates: '18–22 de jul.',
                    price: 275,
                    isNew: false,
                },
                {
                    images: ['https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSJy532BnldMLBcT_wvU-9kS-WoIuVuzqOczfUrSuMMvVCRioUEhuHtSxVj2tMxiQkM4ZWU3kshRgG2ZG-AhWbiQ74&s=19'],
                    title: 'Morro Branco, CE',
                    distance: 'A 85 km de distância',
                    dates: '9–13 de jul.',
                    price: 260,
                    isNew: false,
                },
                {
                    images: ['https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600'],
                    title: 'Icaraí de Amontada, CE',
                    distance: 'A 145 km de distância',
                    dates: '16–21 de jul.',
                    price: 330,
                    isNew: true,
                },
                {
                    images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'],
                    title: 'Beberibe, CE',
                    distance: 'A 78 km de distância',
                    dates: '7–11 de jul.',
                    price: 240,
                    isNew: false,
                },
            ],
        },
    ]);


    const locations = ref<ibgeLocationPlaces>({citys:[], states:[]})
    const filterPlaces = ref<placeRequests[][]>([])
    const currentLocation = reactive<currentLoc>({})

    const fetchApiPlaces = async () => {

        if (!localStorage.getItem('ibgePlaces')) {
            
            const respStates = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const respDataStates = await respStates.json() as any[];
            const states = respDataStates.map((s:any) => ({ name:s.nome, sigla:s.sigla }))

            const respCitys = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
            const respDataCitys = await respCitys.json() as any[];
            const citys = respDataCitys.map((c:any) => ({ name:c.nome, sigla:c.microrregiao?.mesorregiao?.UF?.sigla }))


            const locationsApi = {
                "citys":[
                    ...citys
                ],
                "states":[
                    ...states
                ]
            }

            localStorage.setItem('ibgePlaces', JSON.stringify(locationsApi));

            locations.value = locationsApi;

        } else {                
            
            
            const values:ibgeLocationPlaces = JSON.parse(localStorage.getItem('ibgePlaces') as string) as ibgeLocationPlaces;

            locations.value = values;
            
        }
    }

    const fetchAllPlaces = async () => {
            
        try {
            
            const resp = await api.get('/host/places', {
                headers:{
                    "Content-Type":"application/json"
                }
            })

            for (let i = 0; i < resp.data.length; i+= 8) {
                filterPlaces.value.push(resp.data.slice(i, i+8))
            }
            
            
        } catch (err) {
            filterPlaces.value = [];
        } 

    }

    const fetchCurrentLocation = async () => {
        try {
            if (!Object.keys(currentLocation).length) {            
            
                const resp = await fetch('https://ipinfo.io/json')    
                const data = await resp.json()
                currentLocation.region = data.region as string;
                currentLocation.city = data.city as string;
            }
        } catch {
            
        }
        
        
    }


    return {
        locations,
        filterPlaces,
        currentLocation,
        fetchAllPlaces,
        fetchApiPlaces,
        fetchCurrentLocation,
        places
    }
    
})