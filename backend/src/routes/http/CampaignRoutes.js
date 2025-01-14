import express from 'express'

import {createCampaign, getCampaigns} from '#controllers/CampaignController.js'

import {verifyToken} from '#middleware/AuthMiddleware.js'
import {zodValidator} from '#middleware/ZodMiddleware.js'
import {campaignSchema} from '#shared/schemas/CampaignSchema.js'
import {sendTaskToQueue} from '#worker/WorkerWrapper.js'

const router = express.Router()

router.get('/', verifyToken, getCampaigns)
router.post('/', verifyToken, zodValidator(campaignSchema), createCampaign)
const tasks = [
  {
    campaignName: 'Subscription Renewal Reminder',
    messageContent:
      'Your subscription will renew in 3 days. Ensure your payment method is up to date.',
    recipients: [
      'kamal2@gmail.com',
      'alamal2@gmail.com',
      'john.doe2@example.com',
      'jane.doe2@example.com',
      'peter.parker2@example.com',
      'mary.jane2@example.com',
      'tony.stark2@example.com',
      'pepper.potts2@example.com',
      'bruce.banner2@example.com',
      'clint.barton2@example.com',
      'steve.rogers2@example.com',
      'natasha.romanoff2@example.com',
      'loki2@example.com',
      'thor2@example.com',
      'wanda.maximoff2@example.com',
      'vision2@example.com',
      'sam.wilson2@example.com',
      'bucky.barnes2@example.com',
      'daniel.cage2@example.com',
      'eleanor.pryce2@example.com',
      'lucas.donovan2@example.com',
      'grace.harris2@example.com',
      'paul.rudd2@example.com',
      'evangeline.lilly2@example.com',
      'kate.bishop2@example.com',
      'maya.lopez2@example.com',
      'clarence.kingsley2@example.com',
      'pauline.hodge2@example.com',
      'wanda.maximoff4@example.com',
      'peter.parker4@example.com',
      'tony.stark4@example.com',
      'pepper.potts4@example.com',
      'steve.rogers4@example.com',
      'natasha.romanoff4@example.com',
      'thor4@example.com',
      'loki4@example.com',
      'sam.wilson4@example.com',
      'bucky.barnes4@example.com',
      'lucas.donovan4@example.com',
      'grace.harris4@example.com',
      'clarence.kingsley4@example.com',
      'pauline.hodge4@example.com',
      'wanda.maximoff5@example.com',
      'peter.parker5@example.com',
      'tony.stark5@example.com',
      'pepper.potts5@example.com',
      'sam.wilson5@example.com',
      'bucky.barnes5@example.com',
      'daniel.cage5@example.com',
      'eleanor.pryce5@example.com'
    ],
    scheduleTime: {start: '2025-02-09T00:00:00', end: '2025-02-09T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Exclusive Offer',
    messageContent: 'Take advantage of this exclusive offer: Get 20% off your next purchase!',
    recipients: [
      'kamal3@gmail.com',
      'alamal3@gmail.com',
      'john.doe3@example.com',
      'jane.doe3@example.com',
      'peter.parker3@example.com',
      'mary.jane3@example.com',
      'tony.stark3@example.com',
      'pepper.potts3@example.com',
      'bruce.banner3@example.com',
      'clint.barton3@example.com',
      'steve.rogers3@example.com',
      'natasha.romanoff3@example.com',
      'loki3@example.com',
      'thor3@example.com',
      'wanda.maximoff3@example.com',
      'vision3@example.com',
      'sam.wilson3@example.com',
      'bucky.barnes3@example.com',
      'daniel.cage3@example.com',
      'eleanor.pryce3@example.com',
      'lucas.donovan3@example.com',
      'grace.harris3@example.com',
      'paul.rudd3@example.com',
      'evangeline.lilly3@example.com',
      'kate.bishop3@example.com',
      'maya.lopez3@example.com',
      'clarence.kingsley3@example.com',
      'pauline.hodge3@example.com',
      'wanda.maximoff6@example.com',
      'peter.parker6@example.com',
      'tony.stark6@example.com',
      'pepper.potts6@example.com',
      'steve.rogers6@example.com',
      'natasha.romanoff6@example.com',
      'thor6@example.com',
      'loki6@example.com',
      'sam.wilson6@example.com',
      'bucky.barnes6@example.com',
      'lucas.donovan6@example.com',
      'grace.harris6@example.com',
      'clarence.kingsley6@example.com',
      'pauline.hodge6@example.com',
      'wanda.maximoff7@example.com',
      'peter.parker7@example.com',
      'tony.stark7@example.com',
      'pepper.potts7@example.com',
      'sam.wilson7@example.com',
      'bucky.barnes7@example.com',
      'daniel.cage7@example.com',
      'eleanor.pryce7@example.com'
    ],
    scheduleTime: {start: '2025-02-10T00:00:00', end: '2025-02-10T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Upgrade Plan',
    messageContent: 'Upgrade your plan now and enjoy additional features and benefits.',
    recipients: [
      'kamal4@gmail.com',
      'alamal4@gmail.com',
      'john.doe4@example.com',
      'jane.doe4@example.com',
      'peter.parker4@example.com',
      'mary.jane4@example.com',
      'tony.stark4@example.com',
      'pepper.potts4@example.com',
      'bruce.banner4@example.com',
      'clint.barton4@example.com',
      'steve.rogers4@example.com',
      'natasha.romanoff4@example.com',
      'loki4@example.com',
      'thor4@example.com',
      'wanda.maximoff4@example.com',
      'vision4@example.com',
      'sam.wilson4@example.com',
      'bucky.barnes4@example.com',
      'daniel.cage4@example.com',
      'eleanor.pryce4@example.com',
      'lucas.donovan4@example.com',
      'grace.harris4@example.com',
      'paul.rudd4@example.com',
      'evangeline.lilly4@example.com',
      'kate.bishop4@example.com',
      'maya.lopez4@example.com',
      'clarence.kingsley4@example.com',
      'pauline.hodge4@example.com',
      'wanda.maximoff8@example.com',
      'peter.parker8@example.com',
      'tony.stark8@example.com',
      'pepper.potts8@example.com',
      'steve.rogers8@example.com',
      'natasha.romanoff8@example.com',
      'thor8@example.com',
      'loki8@example.com',
      'sam.wilson8@example.com',
      'bucky.barnes8@example.com',
      'lucas.donovan8@example.com',
      'grace.harris8@example.com',
      'clarence.kingsley8@example.com',
      'pauline.hodge8@example.com',
      'wanda.maximoff9@example.com',
      'peter.parker9@example.com',
      'tony.stark9@example.com',
      'pepper.potts9@example.com',
      'sam.wilson9@example.com',
      'bucky.barnes9@example.com',
      'daniel.cage9@example.com',
      'eleanor.pryce9@example.com'
    ],
    scheduleTime: {start: '2025-02-11T00:00:00', end: '2025-02-11T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Free Trial Ending',
    messageContent:
      'Your free trial will end in 24 hours. Upgrade now to continue enjoying our services.',
    recipients: [
      'kamal5@gmail.com',
      'alamal5@gmail.com',
      'john.doe5@example.com',
      'jane.doe5@example.com',
      'peter.parker5@example.com',
      'mary.jane5@example.com',
      'tony.stark5@example.com',
      'pepper.potts5@example.com',
      'bruce.banner5@example.com',
      'clint.barton5@example.com',
      'steve.rogers5@example.com',
      'natasha.romanoff5@example.com',
      'loki5@example.com',
      'thor5@example.com',
      'wanda.maximoff5@example.com',
      'vision5@example.com',
      'sam.wilson5@example.com',
      'bucky.barnes5@example.com',
      'daniel.cage5@example.com',
      'eleanor.pryce5@example.com',
      'lucas.donovan5@example.com',
      'grace.harris5@example.com',
      'paul.rudd5@example.com',
      'evangeline.lilly5@example.com',
      'kate.bishop5@example.com',
      'maya.lopez5@example.com',
      'clarence.kingsley5@example.com',
      'pauline.hodge5@example.com',
      'wanda.maximoff10@example.com',
      'peter.parker10@example.com',
      'tony.stark10@example.com',
      'pepper.potts10@example.com',
      'steve.rogers10@example.com',
      'natasha.romanoff10@example.com',
      'thor10@example.com',
      'loki10@example.com',
      'sam.wilson10@example.com',
      'bucky.barnes10@example.com',
      'lucas.donovan10@example.com',
      'grace.harris10@example.com',
      'clarence.kingsley10@example.com',
      'pauline.hodge10@example.com',
      'wanda.maximoff11@example.com',
      'peter.parker11@example.com',
      'tony.stark11@example.com',
      'pepper.potts11@example.com',
      'sam.wilson11@example.com',
      'bucky.barnes11@example.com',
      'daniel.cage11@example.com',
      'eleanor.pryce11@example.com'
    ],
    scheduleTime: {start: '2025-02-12T00:00:00', end: '2025-02-12T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Payment Due',
    messageContent: 'Your payment is due in 2 days. Please make the payment before the due date.',
    recipients: [
      'kamal6@gmail.com',
      'alamal6@gmail.com',
      'john.doe6@example.com',
      'jane.doe6@example.com',
      'peter.parker6@example.com',
      'mary.jane6@example.com',
      'tony.stark6@example.com',
      'pepper.potts6@example.com',
      'bruce.banner6@example.com',
      'clint.barton6@example.com',
      'steve.rogers6@example.com',
      'natasha.romanoff6@example.com',
      'loki6@example.com',
      'thor6@example.com',
      'wanda.maximoff6@example.com',
      'vision6@example.com',
      'sam.wilson6@example.com',
      'bucky.barnes6@example.com',
      'daniel.cage6@example.com',
      'eleanor.pryce6@example.com',
      'lucas.donovan6@example.com',
      'grace.harris6@example.com',
      'paul.rudd6@example.com',
      'evangeline.lilly6@example.com',
      'kate.bishop6@example.com',
      'maya.lopez6@example.com',
      'clarence.kingsley6@example.com',
      'pauline.hodge6@example.com',
      'wanda.maximoff12@example.com',
      'peter.parker12@example.com',
      'tony.stark12@example.com',
      'pepper.potts12@example.com',
      'steve.rogers12@example.com',
      'natasha.romanoff12@example.com',
      'thor12@example.com',
      'loki12@example.com',
      'sam.wilson12@example.com',
      'bucky.barnes12@example.com',
      'lucas.donovan12@example.com',
      'grace.harris12@example.com',
      'clarence.kingsley12@example.com',
      'pauline.hodge12@example.com',
      'wanda.maximoff13@example.com',
      'peter.parker13@example.com',
      'tony.stark13@example.com',
      'pepper.potts13@example.com',
      'sam.wilson13@example.com',
      'bucky.barnes13@example.com',
      'daniel.cage13@example.com',
      'eleanor.pryce13@example.com'
    ],
    scheduleTime: {start: '2025-02-13T00:00:00', end: '2025-02-13T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Account Deactivation',
    messageContent:
      'Your account will be deactivated in 7 days. Please update your information to avoid deactivation.',
    recipients: [
      'kamal7@gmail.com',
      'alamal7@gmail.com',
      'john.doe7@example.com',
      'jane.doe7@example.com',
      'peter.parker7@example.com',
      'mary.jane7@example.com',
      'tony.stark7@example.com',
      'pepper.potts7@example.com',
      'bruce.banner7@example.com',
      'clint.barton7@example.com',
      'steve.rogers7@example.com',
      'natasha.romanoff7@example.com',
      'loki7@example.com',
      'thor7@example.com',
      'wanda.maximoff7@example.com',
      'vision7@example.com',
      'sam.wilson7@example.com',
      'bucky.barnes7@example.com',
      'daniel.cage7@example.com',
      'eleanor.pryce7@example.com',
      'lucas.donovan7@example.com',
      'grace.harris7@example.com',
      'paul.rudd7@example.com',
      'evangeline.lilly7@example.com',
      'kate.bishop7@example.com',
      'maya.lopez7@example.com',
      'clarence.kingsley7@example.com',
      'pauline.hodge7@example.com',
      'wanda.maximoff14@example.com',
      'peter.parker14@example.com',
      'tony.stark14@example.com',
      'pepper.potts14@example.com',
      'steve.rogers14@example.com',
      'natasha.romanoff14@example.com',
      'thor14@example.com',
      'loki14@example.com',
      'sam.wilson14@example.com',
      'bucky.barnes14@example.com',
      'lucas.donovan14@example.com',
      'grace.harris14@example.com',
      'clarence.kingsley14@example.com',
      'pauline.hodge14@example.com',
      'wanda.maximoff15@example.com',
      'peter.parker15@example.com',
      'tony.stark15@example.com',
      'pepper.potts15@example.com',
      'sam.wilson15@example.com',
      'bucky.barnes15@example.com',
      'daniel.cage15@example.com',
      'eleanor.pryce15@example.com'
    ],
    scheduleTime: {start: '2025-02-14T00:00:00', end: '2025-02-14T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Membership Renewal',
    messageContent:
      'Your membership will expire in 5 days. Renew now to continue enjoying benefits.',
    recipients: [
      'kamal8@gmail.com',
      'alamal8@gmail.com',
      'john.doe8@example.com',
      'jane.doe8@example.com',
      'peter.parker8@example.com',
      'mary.jane8@example.com',
      'tony.stark8@example.com',
      'pepper.potts8@example.com',
      'bruce.banner8@example.com',
      'clint.barton8@example.com',
      'steve.rogers8@example.com',
      'natasha.romanoff8@example.com',
      'loki8@example.com',
      'thor8@example.com',
      'wanda.maximoff8@example.com',
      'vision8@example.com',
      'sam.wilson8@example.com',
      'bucky.barnes8@example.com',
      'daniel.cage8@example.com',
      'eleanor.pryce8@example.com',
      'lucas.donovan8@example.com',
      'grace.harris8@example.com',
      'paul.rudd8@example.com',
      'evangeline.lilly8@example.com',
      'kate.bishop8@example.com',
      'maya.lopez8@example.com',
      'clarence.kingsley8@example.com',
      'pauline.hodge8@example.com',
      'wanda.maximoff16@example.com',
      'peter.parker16@example.com',
      'tony.stark16@example.com',
      'pepper.potts16@example.com',
      'steve.rogers16@example.com',
      'natasha.romanoff16@example.com',
      'thor16@example.com',
      'loki16@example.com',
      'sam.wilson16@example.com',
      'bucky.barnes16@example.com',
      'lucas.donovan16@example.com',
      'grace.harris16@example.com',
      'clarence.kingsley16@example.com',
      'pauline.hodge16@example.com',
      'wanda.maximoff17@example.com',
      'peter.parker17@example.com',
      'tony.stark17@example.com',
      'pepper.potts17@example.com',
      'sam.wilson17@example.com',
      'bucky.barnes17@example.com',
      'daniel.cage17@example.com',
      'eleanor.pryce17@example.com'
    ],
    scheduleTime: {start: '2025-02-15T00:00:00', end: '2025-02-15T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'System Maintenance',
    messageContent: 'Scheduled system maintenance will take place tomorrow. Expect some downtime.',
    recipients: [
      'kamal9@gmail.com',
      'alamal9@gmail.com',
      'john.doe9@example.com',
      'jane.doe9@example.com',
      'peter.parker9@example.com',
      'mary.jane9@example.com',
      'tony.stark9@example.com',
      'pepper.potts9@example.com',
      'bruce.banner9@example.com',
      'clint.barton9@example.com',
      'steve.rogers9@example.com',
      'natasha.romanoff9@example.com',
      'loki9@example.com',
      'thor9@example.com',
      'wanda.maximoff9@example.com',
      'vision9@example.com',
      'sam.wilson9@example.com',
      'bucky.barnes9@example.com',
      'daniel.cage9@example.com',
      'eleanor.pryce9@example.com',
      'lucas.donovan9@example.com',
      'grace.harris9@example.com',
      'paul.rudd9@example.com',
      'evangeline.lilly9@example.com',
      'kate.bishop9@example.com',
      'maya.lopez9@example.com',
      'clarence.kingsley9@example.com',
      'pauline.hodge9@example.com',
      'wanda.maximoff18@example.com',
      'peter.parker18@example.com',
      'tony.stark18@example.com',
      'pepper.potts18@example.com',
      'steve.rogers18@example.com',
      'natasha.romanoff18@example.com',
      'thor18@example.com',
      'loki18@example.com',
      'sam.wilson18@example.com',
      'bucky.barnes18@example.com',
      'lucas.donovan18@example.com',
      'grace.harris18@example.com',
      'clarence.kingsley18@example.com',
      'pauline.hodge18@example.com',
      'wanda.maximoff19@example.com',
      'peter.parker19@example.com',
      'tony.stark19@example.com',
      'pepper.potts19@example.com',
      'sam.wilson19@example.com',
      'bucky.barnes19@example.com',
      'daniel.cage19@example.com',
      'eleanor.pryce19@example.com'
    ],
    scheduleTime: {start: '2025-02-16T00:00:00', end: '2025-02-16T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  },
  {
    campaignName: 'Feedback Request',
    messageContent:
      'We value your feedback! Please take a moment to share your experience with us.',
    recipients: [
      'kamal10@gmail.com',
      'alamal10@gmail.com',
      'john.doe10@example.com',
      'jane.doe10@example.com',
      'peter.parker10@example.com',
      'mary.jane10@example.com',
      'tony.stark10@example.com',
      'pepper.potts10@example.com',
      'bruce.banner10@example.com',
      'clint.barton10@example.com',
      'steve.rogers10@example.com',
      'natasha.romanoff10@example.com',
      'loki10@example.com',
      'thor10@example.com',
      'wanda.maximoff10@example.com',
      'vision10@example.com',
      'sam.wilson10@example.com',
      'bucky.barnes10@example.com',
      'daniel.cage10@example.com',
      'eleanor.pryce10@example.com',
      'lucas.donovan10@example.com',
      'grace.harris10@example.com',
      'paul.rudd10@example.com',
      'evangeline.lilly10@example.com',
      'kate.bishop10@example.com',
      'maya.lopez10@example.com',
      'clarence.kingsley10@example.com',
      'pauline.hodge10@example.com',
      'wanda.maximoff20@example.com',
      'peter.parker20@example.com',
      'tony.stark20@example.com',
      'pepper.potts20@example.com',
      'steve.rogers20@example.com',
      'natasha.romanoff20@example.com',
      'thor20@example.com',
      'loki20@example.com',
      'sam.wilson20@example.com',
      'bucky.barnes20@example.com',
      'lucas.donovan20@example.com',
      'grace.harris20@example.com',
      'clarence.kingsley20@example.com',
      'pauline.hodge20@example.com',
      'wanda.maximoff21@example.com',
      'peter.parker21@example.com',
      'tony.stark21@example.com',
      'pepper.potts21@example.com',
      'sam.wilson21@example.com',
      'bucky.barnes21@example.com',
      'daniel.cage21@example.com',
      'eleanor.pryce21@example.com'
    ],
    scheduleTime: {start: '2025-02-17T00:00:00', end: '2025-02-17T00:00:00'},
    createdBy: '6783ec28d1abda6c136d8454'
  }
]
/* setTimeout(() => {
  for (const task of tasks) {
    sendTaskToQueue('pending-queue-when-initiate', task)
  }
}, 5000) */

export default router
