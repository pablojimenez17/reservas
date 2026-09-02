import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { businessConfig } from '../config/businessConfig';

export const useAuth = () => {
  const tokenKey = `reservahub_token_${businessConfig.tenantId}`;
  const userKey = `reservahub_user_${businessConfig.tenantId}`;

  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem(userKey);
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.loginAdmin(email, password);
      const jwtToken = res.data.token;
      const tenantData = res.data.tenant;

      localStorage.setItem(tokenKey, jwtToken);
      localStorage.setItem(userKey, JSON.stringify(tenantData));

      setToken(jwtToken);
      setAdminUser(tenantData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.error || 'Error al iniciar sesión';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setToken(null);
    setAdminUser(null);
  };

  return {
    isAuthenticated: Boolean(token),
    adminUser,
    loading,
    error,
    login,
    logout
  };
};
