import React, { useState } from 'react';
import Layout from '../../components/common/Layout';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Layout open={open} toggleSidebar={() => setOpen(!open)}>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p>Welcome to the Dashboard!</p>
    </Layout>
  );
};

export default Dashboard;
