import { z } from 'zod'

export const FormSchema = z.object({
    name: z
    .string()
    .min(2, { message: 'Name must have two characters at least'})
    .max(50, { message: 'Name can not contain more than 50 characters'}),
    email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
    message: z
    .string()
    .min(50, { message: 'Message must have 50 characters at least'})
    .max(10000, { message: 'Message can not contain more than 10000 characters'})
})

export type FormSchemaType = z.infer<typeof FormSchema>