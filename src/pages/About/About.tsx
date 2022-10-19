import { FC } from "react"
import { useHeight } from "../../hooks/useHeight"
import cl from './About.module.css'

const About: FC = () => {
  const height = useHeight('nav')

  return (
    !height
    ? null
    :
      <div
        className={cl.about}
        style={{
          height
        }}
      >
        <h1>This app is created in order to tackle the main React functionality.</h1>
      </div>
  )
}

export default About
