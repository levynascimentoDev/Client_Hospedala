import { z } from 'zod'

export const paramIdSchema = z.object({
    id:z.string()
})

export const propertyTypeSchema = z.object({
  propertyType: z.enum([
    'APARTAMENTO',
    'CASA',
    'POUSADA',
    'MOTEL',
    'HOTEL',
    'RESORT'
  ])
})

export const spaceTypeSchema = z.object({
  spaceType: z.enum([
    'ALL',
    'BEDROOM',
    'ALBERQUE'
  ])
})

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
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  pricePerNight: z.coerce.number().positive(),
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
    'ALBERQUE'
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
    lat: z.number(),
    lon: z.number(),
    cep: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    number: z.number(),
    state: z.string(),
    city: z.string(),
    accommodationId: z.string(),
  }).nullable(),

  services: z.object({
    id: z.number(),
    accommodationId: z.string(),

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