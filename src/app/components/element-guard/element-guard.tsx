import React, {ReactNode} from 'react'
import {useAuthContext} from '../../contexts'
import {UserRole} from '../../shared/enums'

interface ElementGuardProps {
  allowedRoles: UserRole[]
  children: ReactNode
}

const ElementGuard = ({allowedRoles, children}: ElementGuardProps) => {
  const {user} = useAuthContext()
  if (!user) {
    return null
  }
  if (!allowedRoles.includes(user?.role)) {
    return null
  }

  return <>{children}</>
}

export default ElementGuard
