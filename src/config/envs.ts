import { type infer as Infer, object, string } from 'zod'

const envSchema = object({
	API_URL: string().nonempty(),
	API_AUTH_TOKEN: string().nonempty(),
	API_IMAGE_URL: string().nonempty()
})

const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
	console.log('\n\nX Error en las variables de entorno X')
	console.error(error.errors)
	// Lanzamos un error en vez de hacer un process.exit(1), ya que process.exit(1) no esta disponible en Edge Runtime
	throw new Error('')
}

export const ENVS = data as Infer<typeof envSchema>
