import express from 'express'

import {createCampaign, getCampaigns} from '#controllers/CampaignController.js'

import {verifyToken} from '#middleware/AuthMiddleware.js'
import {zodValidator} from '#middleware/ZodMiddleware.js'
import {campaignSchema} from '#schemas/CampaignSchema.js'

const router = express.Router()

router.get('/', verifyToken, getCampaigns)
router.post('/', verifyToken, zodValidator(campaignSchema), createCampaign)

export default router
