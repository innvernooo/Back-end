'use client';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { ComponentType } from 'react';

export default function withAuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[],
) {
  return function AuthGuardComponent(props: P) {
    const { role } = useAuthStore();
    const isAuthorized = allowedRoles.includes(role);

    if (!isAuthorized) {
      return (
        <h1 className='font-bold text-2xl text-red-600'>
          User role unauthorized to open this page
        </h1>
      );
    }

    return <WrappedComponent {...props} />;
  };
}