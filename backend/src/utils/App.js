import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import authRoutes from '#routes/http/AuthRoutes.js'
import campaignRoutes from '#routes/http/CampaignRoutes.js'

import {env} from '#shared/schemas/EnvSchema.js'

const app = express()
// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.json({limit: '50mb'}))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignRoutes)

const PORT = env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
