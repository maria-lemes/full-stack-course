import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props)=> {
  return(<p>{props.name} {props.value}</p>)
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine name='good' value={props.good}/>
      <StatisticLine name='neutral' value={props.neutral}/>
      <StatisticLine name='bad' value={props.bad}/>
      <StatisticLine name='all' value={props.good+ props.neutral + props.bad}/>
      <StatisticLine name='average' value={(props.good*1 + props.bad*-1)/(props.good+props.neutral+props.bad)}/>
      <StatisticLine name='positive' value={props.good*100/(props.good+props.neutral+props.bad)+'%'}/>
    </div>
  )

}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={handleGoodClick} text='good'/>
        <Button handleClick={handleNeutralClick} text='neutral'/>
        <Button handleClick={handleBadClick} text='bad'/>
      </p>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
