import cors from 'cors'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import {join} from 'path'

import authRoutes from '#routes/http/AuthRoutes.js'
import campaignRoutes from '#routes/http/CampaignRoutes.js'

import {getLegacyPath} from '#utils/Helper.js'

const {__dirname} = getLegacyPath(import.meta.url)
const app = express()
// Middleware
app.use(
  session({
    secret: 'rfftgfrrf',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.json({limit: '50mb'}))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use(express.static(join(__dirname, '../../../frontend/dist')))
app.get('*', (req, res) => {
  if (req.url.indexOf('/auth/login') > -1) {
    res.redirect('/')
  } else {
    res.sendFile(join(__dirname, '../../../frontend/dist/index.html'))
  }
})
export default app
