import React from 'react'

type Props = {
  isStarted: boolean
  handleTimerClick: () => void
}

export const TimerButton: React.FC<Props> = ({isStarted, handleTimerClick}) => {
  return (
    <p>
      <button onClick={handleTimerClick}>
        {isStarted ? 'Закончить' : 'Начать'}
      </button>
    </p>
  )
}
