import { z } from 'zod'

export const FormSchema = z.object({
    name: z
    .string()
    .min(2, { message: 'Name must have two characters at least'})
    .max(50, { message: 'Name can not contain more than 50 characters'}),
    email: z
    .string()
    .email(),
    message: z
    .string()
    .min(50, { message: 'Message must have 50 characters at least'})
    .max(2000, { message: 'Name can not contain more than 2000 characters'})
})

export type FormSchemaType = z.infer<typeof FormSchema>