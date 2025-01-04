import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    message: {type: String, required: true},
    recipients: [{type: String, required: true}],
    scheduleTime: {type: Number, required: true},
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'Pending'
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  },
  {timestamps: true}
)

const Campaign = mongoose.model('Campaign', campaignSchema)
export default Campaign
