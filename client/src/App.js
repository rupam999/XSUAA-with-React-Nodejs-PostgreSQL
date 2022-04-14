import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts';
import FullNodeTable from './pages/FullNodeTable';

const App = () => {
  const a = '';
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FullNodeTable />} />
      </Routes>
    </Layout>
  );
};

export default App;
