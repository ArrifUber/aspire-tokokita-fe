import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';
import { accessTokenStorage, refreshTokenStorage, userStorage } from '@/lib/storage';
import { LoginReq } from '@/types/api/auth.types';

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(payload: LoginReq) {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(payload);
      console.log(data)
      // tokenStorage.set(data.);
      accessTokenStorage.set(data.accessToken)
      refreshTokenStorage.set(data.refreshToken)
      userStorage.set(data.user)
      router.push('/');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Login gagal, coba lagi');
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}