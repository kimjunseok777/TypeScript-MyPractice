import { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'

function App() {
  // const [count, setCount] = useState(0)
  const [count, setCount] = useState<number>()

  // react typescript event type 검색하면 쉽게 리소스를 얻을 수 있다
  //--> FormEvent , MouseEvent ... 등이 있다
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Button variant={'primary'} color={'white'}>확인</Button>
  )
}

export default App
