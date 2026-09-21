import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Tags,
  Car,
  ShoppingCart,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';

const Dashboard = React.lazy(() => import('./Dashboard'));
const Categories = React.lazy(() => import('./Categories'));
const Vehicles = React.lazy(() => import('./Vehicles'));
const Orders = React.lazy(() => import('./Orders'));
const Rentals = React.lazy(() => import('./Rentals'));
const Login = React.lazy(() => import('./Login'));

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const token = localStorage.getItem('admin_token');

  if (!token && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  if (location.pathname === '/admin/login') {
    return (
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Login...</div>}>
        <Login />
      </React.Suspense>
    );
  }

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const navItems = [
    { key: '/admin', icon: <LayoutDashboard size={isMobile ? 24 : 18} />, label: 'Tổng quan', mobileLabel: 'Tổng quan' },
    { key: '/admin/categories', icon: <Tags size={isMobile ? 24 : 18} />, label: 'Danh mục xe', mobileLabel: 'Danh mục' },
    { key: '/admin/vehicles', icon: <Car size={isMobile ? 24 : 18} />, label: 'Danh sách xe', mobileLabel: 'Xe' },
    { key: '/admin/orders', icon: <ShoppingCart size={isMobile ? 24 : 18} />, label: 'Đơn hàng', mobileLabel: 'Đơn hàng' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
        >
          <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {collapsed ? 'CĐX' : 'XE CỐ ĐÔ XANH'}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            items={navItems}
          />
        </Sider>
      )}

      <Layout style={{ width: '100%', marginBottom: isMobile ? 64 : 0 }}>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24, paddingLeft: isMobile ? 16 : 0 }}>
          {isMobile ? (
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#009e4e' }}>XE CỐ ĐÔ XANH</div>
          ) : (
            <Button
              type="text"
              icon={collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          )}
          <Button type="text" danger icon={<LogOut size={16} />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
        <Content
          style={isMobile ? {
            margin: 0,
            padding: 8,
            minHeight: 280,
            background: '#f5f5f5',
            overflow: 'auto'
          } : {
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <React.Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/rentals" element={<Rentals />} />
            </Routes>
          </React.Suspense>
        </Content>
      </Layout>

      {/* Bottom Navigation cho Mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
        }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.key;
            return (
              <div
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: isActive ? '#009e4e' : '#888',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                {item.icon}
                <span style={{ fontSize: 11, marginTop: 4, fontWeight: isActive ? 600 : 400 }}>{item.mobileLabel}</span>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default AdminLayout;
