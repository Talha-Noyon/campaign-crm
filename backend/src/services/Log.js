import AppErrorLogModel from '#models/AppErrorLog.js'

export function appErrorLog(data) {
  const appErrorLog = new AppErrorLogModel()
  appErrorLog.error_data = data
  appErrorLog.save()
}
