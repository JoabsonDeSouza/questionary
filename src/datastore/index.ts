import { Report } from '../model/report'

export const saveReport = (value: Report) => {
  try {
    const reports: Report[] = getReports()
    reports.push(value)
    localStorage.setItem('@storage_report', JSON.stringify(value))
  } catch (e) {
    console.warn(e)
  }
}

export const getReports = () => {
  try {
    const value = localStorage.getItem('@storage_report')
    return value ? JSON.parse(value) : []
  } catch (e) {
    return []
  }
}
