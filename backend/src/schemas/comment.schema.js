import {z} from 'zod'

export const createCommentSchema = z.object({
    author: z.string().optional(),
    content: z.string({
        required_error: "El texto del comentario es requerido."
    })
})