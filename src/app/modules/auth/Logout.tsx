import { Navigate, Routes, Route } from "react-router-dom";

export function Logout() {
  return (
    <Routes>
      <Route path="auth/*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
