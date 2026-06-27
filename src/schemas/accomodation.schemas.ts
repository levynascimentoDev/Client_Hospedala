import { z } from 'zod'

export const paramIdSchema = z.object({
    id:z.string()
})

export const propertyTypeSchema = z.enum([
    'APARTAMENTO',
    'CASA',
    'POUSADA',
    'MOTEL',
    'HOTEL',
    'RESORT'
])

export const spaceTypeSchema = z.enum([
    'ALL',
    'BEDROOM',
    'ALBERQUE'
])

export const servicesSchema = z.object({
  wifi: z.boolean(),
  air: z.boolean(),
  tv: z.boolean(),
  kitchen: z.boolean(),
  pool: z.boolean(),
  parking: z.boolean(),
  heater: z.boolean(),
  gym: z.boolean(),
  grill: z.boolean(),
  jacuzzi: z.boolean(),
  hotTub: z.boolean(),
})

export const locationSchema = z.object({
  cep: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  number: z.number(),
  city: z.string(),
  state: z.string().length(2),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
})

export const detailsSchema = z.object({
  maxGuests: z.number().positive(),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  beds: z.number().min(0),
})

export const photosSchema = z.object({
  photos: z.array(
    z.object({
      key: z.string(),
      cover: z.boolean(),
    })
  ).min(1)
})

export const rulesSchema = z.object({
  animals: z.boolean(),
  events: z.boolean(),
  optional: z.string().optional(),
})


export const accommodationSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  available: z.boolean(),

  currentStep: z.enum([
    'PROPERTY_TYPE',
    'SPACE_TYPE',
    'SERVICES',
    'LOCATION',
    'DETAILS',
    'PHOTOS',
    'RULES',
    'FINISH',
    'COMPLETED'
  ]),

  propertyType: z.enum([
    'APARTAMENTO',
    'CASA',
    'POUSADA',
    'MOTEL',
    'HOTEL',
    'RESORT'
  ]).nullable(),

  spacetype: z.enum([
    'ALL',
    'BEDROOM',
    'ALBERG'
  ]).nullable(),

  title: z.string().nullable(),
  description: z.string().nullable(),
  pricePerNight: z.number().nullable(),

  maxGuests: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  beds: z.number().nullable(),

  rating: z.number().nullable(),
  reviewCount: z.number().nullable(),

  address: z.object({
    id: z.number(),
    lat: z.coerce.number(),
    lon: z.coerce.number(),
    cep: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    number: z.number(),
    state: z.string(),
    city: z.string(),
    accommodationId: z.string(),
  }).nullable(),

    services: z.object({
        wifi: z.boolean().default(false),
        air: z.boolean().default(false),
        tv: z.boolean().default(false),
        kitchen: z.boolean().default(false),
        pool: z.boolean().default(false),
        parking: z.boolean().default(false),
        heater: z.boolean().default(false),
        gym: z.boolean().default(false),
        grill: z.boolean().default(false),
        jacuzzi: z.boolean().default(false),
        hotTub: z.boolean().default(false),

        balcony: z.boolean().default(false),
        bedlinen: z.boolean().default(false),
        breakfast: z.boolean().default(false),
        cityView: z.boolean().default(false),
        crib: z.boolean().default(false),
        elevator: z.boolean().default(false),
        reception: z.boolean().default(false),
        safe: z.boolean().default(false),
        seaView: z.boolean().default(false),
        wheelchairAccessibility: z.boolean().default(false),
    }).nullable(),

  rules: z.object({
    id: z.number(),
    accommodationId: z.string(),
    animals: z.boolean(),
    events: z.boolean(),
    optional: z.string().nullable(),
  }).nullable(),

  photos: z.array(
    z.object({
      accommodationId: z.string(),
      key: z.string(),
      cover: z.boolean(),
    })
  ),
})