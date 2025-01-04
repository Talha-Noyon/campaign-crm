import {Schema, model} from 'mongoose'

const AppErrorLogSchema = new Schema(
  {
    error_data: {
      type: Schema.Types.Mixed
    },
    token: {
      type: String
    }
  },
  {timestamps: true}
)
const AppErrorLogModel = model('apperrorlog', AppErrorLogSchema)

export default AppErrorLogModel
