import { readFile, writeFile } from 'fs/promises'


const TOKEN_FILE = '.auth-token'

export const save = async (token: string) => {
  await writeFile(TOKEN_FILE, token)
}

export const load = async () => {
  try {
    return await readFile(TOKEN_FILE, 'utf8')
  } catch {
    return undefined
  }
}
