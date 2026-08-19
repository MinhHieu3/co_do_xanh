import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tags, 
  Car, 
  ShoppingCart, 
  History,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';
import Dashboard from './Dashboard';
import Categories from './Categories';
import Vehicles from './Vehicles';
import Orders from './Orders';
import Rentals from './Rentals';
import Login from './Login';

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
    return <Login />;
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

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={
          isMobile
            ? { position: 'absolute', zIndex: 999, height: '100vh', left: 0, top: 0 }
            : {}
        }
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {collapsed ? 'CĐX' : 'CỜ ĐỎ XANH'}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={[
            {
              key: '/admin',
              icon: <LayoutDashboard size={18} />,
              label: 'Tổng quan',
            },
            {
              key: '/admin/categories',
              icon: <Tags size={18} />,
              label: 'Danh mục xe',
            },
            {
              key: '/admin/vehicles',
              icon: <Car size={18} />,
              label: 'Danh sách xe',
            },
            {
              key: '/admin/orders',
              icon: <ShoppingCart size={18} />,
              label: 'Đơn hàng',
            },
            {
              key: '/admin/rentals',
              icon: <History size={18} />,
              label: 'Lịch sử thuê',
            },
          ]}
        />
      </Sider>
      <Layout style={{ width: '100%' }}>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
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
          <Button type="text" danger icon={<LogOut size={16} />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/rentals" element={<Rentals />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
