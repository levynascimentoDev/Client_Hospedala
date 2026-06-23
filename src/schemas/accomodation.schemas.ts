

import { z } from 'zod'

export const paramCreateSchema = z.object({
    id:z.coerce.string(),
})