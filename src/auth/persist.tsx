import { existsSync } from 'fs'
import { readFile, writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'


const CLI_FOLDER = join(homedir(), '.vitrine')
const TOKEN_FILE = join(CLI_FOLDER, 'admin-cli-auth-token')


const ensureDir = async () => {
  if (!existsSync(CLI_FOLDER)) {
    await mkdir(CLI_FOLDER)
  }
}

export const save = async (token: string) => {
  await ensureDir()
  await writeFile(TOKEN_FILE, token)
}

export const load = async () => {
  try {
    return await readFile(TOKEN_FILE, 'utf8')
  } catch {
    return undefined
  }
}

export const clear = async () => {
  try {
    await unlink(TOKEN_FILE)
  } catch { /* ignore */ }
}
