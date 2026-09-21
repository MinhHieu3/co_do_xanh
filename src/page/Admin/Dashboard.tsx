import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, message, Table, DatePicker, Button, Space } from 'antd';
import { DollarSign, CheckCircle, Download } from 'lucide-react';
import { fetchApi } from './api';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const [data, setData] = useState<{ total_revenue: number; total_rentals: number } | null>(null);
  const [incomes, setIncomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  const fetchStatistics = () => {
    let query = '';
    if (dateRange && dateRange[0] && dateRange[1]) {
      query = `?start=${dateRange[0].startOf('day').toISOString()}&end=${dateRange[1].endOf('day').toISOString()}`;
    }
    loadData(query);
    loadDetails(query);
  };

  const loadData = async (query: string = '') => {
    setLoading(true);
    try {
      const res = await fetchApi(`/statistics/revenue${query}`);
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

  const loadDetails = async (query: string = '') => {
    setTableLoading(true);
    try {
      const res = await fetchApi(`/statistics/details${query}`);
      const json = await res.json();
      if (json.success) {
        setIncomes(json.data);
      }
    } catch (error) {
      message.error('Lỗi kết nối chi tiết thu nhập');
    }
    setTableLoading(false);
  };

  const handleExport = () => {
    let query = '';
    if (dateRange && dateRange[0] && dateRange[1]) {
      query = `?start=${dateRange[0].startOf('day').toISOString()}&end=${dateRange[1].endOf('day').toISOString()}`;
    }
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_URL || 'https://xe-co-do-xanh-be.hieubyipro.workers.dev/api';
    
    fetch(`${baseUrl}/statistics/export-excel${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BaoCaoThuNhap${dateRange && dateRange[0] ? `_${dateRange[0].format('DD-MM-YYYY')}` : ''}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => message.error('Lỗi khi tải file excel'));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { 
      title: 'Số tiền', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (text: number) => <span style={{ fontWeight: 500, color: '#52c41a' }}>{text?.toLocaleString()} VNĐ</span>
    },
    { 
      title: 'Thời gian', 
      dataIndex: 'date', 
      key: 'date',
      render: (text: string) => text ? new Date(text).toLocaleString('vi-VN') : '-'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (text: string) => <span style={{ color: '#666', fontStyle: 'italic' }}>{text || '-'}</span>
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 style={{ margin: 0 }}>Tổng quan thống kê</h2>
        <Space>
          <RangePicker 
            value={dateRange as any} 
            onChange={(dates) => setDateRange(dates as any)} 
            placeholder={['Từ ngày', 'Đến ngày']}
          />
          <Button icon={<Download size={16} />} onClick={handleExport}>
            Xuất Excel
          </Button>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card>
              <Statistic
                title="Tổng doanh thu"
                value={data?.total_revenue || 0}
                suffix="VNĐ"
                prefix={<DollarSign size={20} style={{ color: '#52c41a', marginRight: 8 }} />}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card style={{ marginTop: window.innerWidth < 768 ? 16 : 0 }}>
              <Statistic
                title="Tổng lượt thanh toán"
                value={data?.total_rentals || 0}
                prefix={<CheckCircle size={20} style={{ color: '#1890ff', marginRight: 8 }} />}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
      
      <div style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 16 }}>Lịch sử thu nhập</h3>
        <Table 
          columns={columns} 
          dataSource={incomes} 
          rowKey="id" 
          loading={tableLoading} 
          pagination={false} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
