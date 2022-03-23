import { Box, Toolbar } from '@mui/material';
import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '../../navigation/routes';
import { TasksList } from '../../screens/TasksList';

const ProtectedRoute = ({ isAuthorized, role, children }) => {
  const currentRole = useSelector(state => state.user.role);

  if (!isAuthorized || (role && currentRole !== role)) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export const CategoriesContext = createContext();

export function Main() {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <CategoriesContext.Provider
          value={{
            selectedCategory,
            setSelectedCategory,
            selectedSubCategory,
            setSelectedSubCategory
          }}
        >
          <Routes>
            <Route path='/' element={isAuthorized ? <TasksList /> : <div>please, log in</div>} />
            {routes.map(item => {
              return (
                <Route
                  key={item.link}
                  path={item.link}
                  element={
                    item.isAuthorized || item.role ? (
                      <ProtectedRoute isAuthorized={isAuthorized} role={item.role}>
                        <item.component />
                      </ProtectedRoute>
                    ) : (
                      <item.component />
                    )
                  }
                />
              );
            })}
          </Routes>
        </CategoriesContext.Provider>
        <Toolbar />
      </Box>
    </Box>
  );
}
