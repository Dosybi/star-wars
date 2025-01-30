import { type FC } from 'react'

const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  return <div>{message}</div>
}

export default ErrorMessage
