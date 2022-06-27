import { FC } from "react"
import { useSelector } from "react-redux"
import { State } from "../../types/state"
import { Landing } from "../Landing/Landing"
import { useNavigate } from "react-router-dom"
import { Main } from "../Main/Main"
import { RegisterStep2 } from "../Auth/Register/RegisterStep2"

export const Home: FC<Props> = function () {
  const user = useSelector((state: State) => state.user.value)
  const navigate = useNavigate()

  return user !== null ? (
    user?.complete ? (
      <Main />
    ) : (
      <RegisterStep2 uid={user?.uid} />
    )
  ) : (
    <Landing login={() => navigate("/login")} />
  )
}

interface Props {}
