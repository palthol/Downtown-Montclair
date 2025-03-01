import React from 'react';
import type { Route } from './+types/auth'; // adjust or remove types as needed
import AuthPage from '~/components/auth/authPage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Authentication - Downtown Montclair" },
    { name: "description", content: "Sign in or create a new account using our secure multi-step process." },
  ];
}

export default function Auth(): React.ReactElement {
  return <AuthPage />;
}