"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import ResetPassword from "@modules/account/components/reset-password"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  RESET_PASSWORD = "reset-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="w-full flex justify-center px-8 py-8">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login setCurrentView={setCurrentView} />
      ) : currentView === LOGIN_VIEW.REGISTER ? (
        <Register setCurrentView={setCurrentView} />
      ) : currentView === LOGIN_VIEW.RESET_PASSWORD ? (
        <ResetPassword setCurrentView={setCurrentView} />
      ) : null}
    </div>
  )
}

export default LoginTemplate
