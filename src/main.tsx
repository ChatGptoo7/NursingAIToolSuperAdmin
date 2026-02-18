import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWrapper } from './comman/PageMeta.tsx';
import { Toaster } from 'sonner';
import './i18n'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
      <App />
      </AppWrapper>
    </QueryClientProvider>
     <Toaster closeButton={true} />
  </StrictMode>,



  //  <StrictMode>
  //     <QueryClientProvider client={queryClient}>
  //       <ThemeProvider>
  //         <AppWrapper>
  //           <App />
  //         </AppWrapper>
  //       </ThemeProvider>
  //       <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
  //     </QueryClientProvider>
  //     <Toaster closeButton={true} />
  //   </StrictMode>,
)
