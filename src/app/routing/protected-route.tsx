import {Navigate, Outlet} from 'react-router-dom'
import {UserRole} from '../shared/enums'
import {ReactNode} from 'react'
import {useAuthContext} from '../contexts'

interface IProtectedRouteProps {
  redirectPath?: string
  permissions: UserRole[]
  children: ReactNode
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  redirectPath,
  children,
  permissions,
}) => {
  const {user} = useAuthContext()

  if (!user) {
    return <Navigate to={'/auth'} />
  }
  const hasPermission = permissions?.includes(user.role)

  if (!hasPermission) {
    return <Navigate to={redirectPath || `/error/403`} replace />
  }

  return children ? <div>{children}</div> : <Outlet />
}

export default ProtectedRoute
