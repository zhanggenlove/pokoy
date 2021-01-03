import React from 'react';
import './App.css';

function App() {
  const fibonacciNums = [1, 2, 3, 5, 8, 13, 21]
  
  const [progress, setProgress] = React.useState(0)
  const [isStarted, setStartedFlag] = React.useState(false)
  const [currentTimerId, setCurrentTimerId] = React.useState(null)

  const setTimer = async (num) => {
    console.log('Timer setted', num);
    
    setProgress(num)

    const timeout = 1000 * num    
    const timerId = window.setTimeout(() => { 
      const nextIndex = fibonacciNums.indexOf(num) + 1
      const nextNum = fibonacciNums[nextIndex]
    
      setTimer(nextNum)
    }, timeout)
    
    setCurrentTimerId(timerId)
  }
  
  const handleTimer = () => {
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


  return (
    <main>
      <h1>Покой — приложение для отдыха</h1>
      
      <progress value={progress} max={fibonacciNums[fibonacciNums.length - 1]}/>
      <button onClick={handleTimer}>{isStarted ? 'Закончить' : 'Начать'}</button>
    </main>
  );
}

export default App;
