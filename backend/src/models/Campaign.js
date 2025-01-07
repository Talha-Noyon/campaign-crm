import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    message: {type: String, required: true},
    recipients: [{type: String, required: true}],
    scheduleTime: {type: Number, required: true},
    statusDetailsByRecipients: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'Pending'
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isApproved: {type: Boolean, default: false},
    approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {timestamps: true}
)

const Campaign = mongoose.model('Campaign', campaignSchema)
export default Campaign
