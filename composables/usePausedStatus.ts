export const usePausedStatus = () => {
  const pausedStatus = useState('pausedStatus', () => true)

  const setPausedStatus = (boolean: boolean) => {
    pausedStatus.value = boolean
  }

  return { pausedStatus, setPausedStatus }
}