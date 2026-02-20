export const useMachines = () => {
  const getMachines = async () => ({ data: [], error: null })
  const getMachineLayoutPoints = async () => ({ data: [], error: null })
  const getMachineAlarms = async () => ({ data: [], error: null })
  const getMachineStatusLog = async () => ({ data: [], error: null })
  const getMachineOEE = async () => ({ data: [], error: null })

  return {
    getMachines,
    getMachineLayoutPoints,
    getMachineAlarms,
    getMachineStatusLog,
    getMachineOEE,
  }
}
