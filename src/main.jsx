import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';
import { AuthProvider } from './context/auth.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({});
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <SkeletonTheme highlightColor="#edeeef" baseColor="#C9CCCF">
                <QueryClientProvider client={queryClient}>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                border: '1px solid var(--main-grey)',
                                boxShadow: '2px 2px 6px rgba(0,0,0,0.2)'
                            }
                        }}
                    ></Toaster>
                    <Router></Router>
                </QueryClientProvider>
            </SkeletonTheme>
        </AuthProvider>
    </React.StrictMode>
);
