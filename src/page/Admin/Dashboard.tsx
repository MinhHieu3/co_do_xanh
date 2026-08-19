import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, message } from 'antd';
import { DollarSign, CheckCircle } from 'lucide-react';
import { fetchApi } from './api';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<{ total_revenue: number; total_rentals: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchApi('/statistics/revenue');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        message.error('Lỗi khi tải thống kê');
      }
    } catch (error) {
      message.error('Lỗi kết nối');
    }
    setLoading(false);
  };

  if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }} />;

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Tổng quan thống kê</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={data?.total_revenue || 0}
              suffix="VNĐ"
              prefix={<DollarSign size={20} style={{ color: '#52c41a', marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng đơn đã thanh toán"
              value={data?.total_rentals || 0}
              prefix={<CheckCircle size={20} style={{ color: '#1890ff', marginRight: 8 }} />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
