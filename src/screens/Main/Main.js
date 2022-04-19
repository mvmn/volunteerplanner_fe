import { Box, Toolbar } from '@mui/material';
import { createContext, useState } from 'react';

export const CategoriesContext = createContext();

export function Main({ children }) {
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
          {children}
        </CategoriesContext.Provider>
        <Toolbar />
      </Box>
    </Box>
  );
}
