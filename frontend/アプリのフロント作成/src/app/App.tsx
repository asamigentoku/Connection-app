import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/auth-context';
import { SettingsProvider } from './context/settings-context';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;