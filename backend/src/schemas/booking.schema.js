import { z } from 'zod'

export const createBookingSchema = z.object({
    service: z.string({
        required_error: "El servicio es requerido."
    }),
    treatment: z.string({
        required_error: "El tipo de tratamiento es requerido,"
    }),
    date: z.date({
        required_error: "La fecha del tratamiento es requerida."
    }),
    info: z.string().optional()
})