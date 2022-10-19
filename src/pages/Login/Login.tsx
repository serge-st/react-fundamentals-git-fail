import cl from './Login.module.css'
import { FC, useContext, FormEvent } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { AuthCountext, LOCAL_STORAGE_AUTH_KEY } from '../../context'
import { useHeight } from '../../hooks/useHeight'

const Login: FC = () => {
  const height = useHeight('nav')
  const context = useContext(AuthCountext)
  const login = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    context!.setIsAuthenticated(true)
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'true')
  }

  return (
    !height
    ? null
    :
      <div
        className={cl.login}
        style={{
          height
        }}
      >
        <div>
          <h1>Login Page</h1>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => login(e)}>
            <Input type='text' placeholder='Login' />
            <Input type='password' placeholder='Password' />
            <Button name='Login' />
          </form>
        </div>
      </div>
  )
}

export default Login
