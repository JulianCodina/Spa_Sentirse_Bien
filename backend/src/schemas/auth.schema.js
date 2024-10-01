import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario no puede estar vacío.'
    }),
    email: z.string({
        required_error: 'El campo email no puede estar vacío.'
    }).email({
        message: 'El email ingresado no es válido.'
    }),
    password: z.string({
        required_error: 'El campo contraseña no puede estar vacío.'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres.'
    })
})

export const loginSchema = z.object ({
    email: z.string({
        required_error: 'El campo email no puede estar vacío.'
    }).email({
        message: 'El email ingresado no es válido.'
    }),
    password: z.string({
        required_error: 'El campo contraseña no puede estar vacío.'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres.'
    })
})