// Los dos reseñadores fijos del sitio.
// Para cambiar un nombre, edita el valor aquí y se actualiza en toda la app.
export const AUTHORS = ["Franco", "Cecilia"] as const

export type Author = (typeof AUTHORS)[number]
