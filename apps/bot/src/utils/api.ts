import axios from 'axios'
import { env } from '../../../../config/env.ts'

export const api = axios.create({
  baseURL: `${env.DEV_URL}/api/v1`,
  timeout: 5000,
})
