'use client';

import { axiosInstance } from '@/lib/axios-instance.lib';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
//   const router = useRouter();
  const { error, isError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      await axiosInstance.get('/auths/me');
    },
    retry: false,
  });

//   if (isError && axios.isAxiosError(error)) {
//     const statusCode = error?.response?.status;

//     console.log(statusCode);
//     if (statusCode === 401) router.push('/');
//   }

  return <>{children}</>;
}
