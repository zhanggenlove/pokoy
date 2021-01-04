import React from 'react';
import './App.css';
import { FibonacciProgress } from './FibonacciProgress';

function App() {
  const fibonacciNums = [1, 2, 3, 5, 8, 13, 21]
  
  const [progress, setProgress] = React.useState(0)
  const [isStarted, setStartedFlag] = React.useState(false)
  const [currentTimerId, setCurrentTimerId] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    return () => {
      clearTimeout(currentTimerId);
    }
  }, [currentTimerId])

  const setTimer = (num: number) => {
    setProgress(num)
    
    if (fibonacciNums.includes(num)) {
      console.log('next!')

      // TODO: add sound notification
    }

    const timerId = window.setTimeout(() => {     
      setTimer(num + 1)
    }, 100)
    
    setCurrentTimerId(timerId)
  }
  
  const handleTimerClick = () => {
    if (isStarted) {
      setStartedFlag(false)
      setProgress(0)

      window.clearTimeout(currentTimerId)
      console.log('Timer resetted');
      
      return
    }

    setStartedFlag(true)
    setTimer(fibonacciNums[0])
    return
  }

  const lastFibNumber = fibonacciNums[fibonacciNums.length - 1]


  return (
    <main>
      <h1>Покой — приложение для отдыха</h1>
      
      <div>
        <progress value={progress} max={lastFibNumber}/>
        <p>
          <button onClick={handleTimerClick}>{isStarted ? 'Закончить' : 'Начать'}</button>
        </p>
      </div>


      <FibonacciProgress value={progress} />

    </main>
  );
}

export default App;
