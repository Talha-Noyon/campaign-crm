import mongoose from 'mongoose'

const StatusDetailsSchema = new mongoose.Schema(
  {
    processStartTime: {type: Number},
    processingTime: {type: Number},
    processEndTime: {type: Number}
  },
  {_id: false}
)
const campaignSchema = new mongoose.Schema(
  {
    campaignName: {type: String, required: true},
    messageContent: {type: String, required: true},
    recipients: [{type: String, required: true}],
    scheduleTime: {type: {start: String, end: String}, required: true},
    retryCount: {type: Number, default: 0},
    successCount: {type: Number, default: 0},
    failureCount: {type: Number, default: 0},
    statusDetailsByRecipients: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending'
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isApproved: {type: Boolean, default: false},
    approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {timestamps: true}
)

campaignSchema.index({createdBy: 1})

const Campaign = mongoose.model('Campaign', campaignSchema)
export default Campaign
