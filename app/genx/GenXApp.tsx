import React from 'react';
import { GenXRootInterceptor } from './core/GenXRootInterceptor';
import { GENX_CONFIG } from './config/genx.config';

interface GenXAppProps {
  OriginalApp: React.ComponentType;
  children?: React.ReactNode;
}

export const GenXApp: React.FC<GenXAppProps> = ({ OriginalApp, children }) => {
  return (
    <GenXRootInterceptor config={GENX_CONFIG} originalApp={OriginalApp}>
      {children}
    </GenXRootInterceptor>
  );
};

// // app/genx/GenXApp.tsx
// import React from 'react';
// import { GENX_CONFIG } from './config/genx.config';
// import { GenXRootInterceptor } from './core/GenXRootInterceptor';

// // Import your original app
// // This is the ONLY line you need to change in existing code
// export const GenXApp: React.FC<{ 
//   OriginalApp: React.ComponentType;
//   children?: React.ReactNode;
// }> = ({ OriginalApp, children }) => {
//   return (
//     <GenXRootInterceptor config={GENX_CONFIG} originalApp={OriginalApp}>
//       {children}
//     </GenXRootInterceptor>
//   );
// };

// // =============================================================================
// // 9. INTEGRATION POINT - Modify only root.tsx
// // =============================================================================

// // In your existing app/root.tsx, change ONLY this:
// /*
// // Before:
// export default function App() {
//   return (
//     <Layout>
//       <Outlet />
//     </Layout>
//   );
// }

// // After:
// import { GenXApp } from '~/genx/GenXApp';

// const OriginalApp = () => (
//   <Layout>
//     <Outlet />
//   </Layout>
// );

// export default function App() {
//   return <GenXApp OriginalApp={OriginalApp} />;
// }
// */