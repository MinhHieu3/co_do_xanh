import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { Download } from 'lucide-react';
import { fetchApi } from './api';

const Rentals: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/statistics/details');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  const handleExport = async () => {
    try {
      const res = await fetchApi('/statistics/export-excel');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BaoCao.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      message.error('Lỗi tải Excel');
    }
  };

  const columns = [
    { title: 'ID Thuê', dataIndex: 'id', key: 'id' },
    { title: 'ID Đơn Hàng', dataIndex: 'id_order', key: 'id_order' },
    { 
      title: 'Các xe đã thuê (ID)', 
      dataIndex: 'vehicle_ids', 
      key: 'vehicle_ids',
      render: (ids: any) => {
        try {
          return Array.isArray(ids) ? ids.join(', ') : JSON.parse(ids).join(', ');
        } catch {
          return String(ids);
        }
      }
    },
    { title: 'Trạng thái TT', dataIndex: 'payment', key: 'payment', render: (val: any) => val ? 'Đã TT' : 'Chưa' },
    { title: 'Thời gian TT', dataIndex: 'time_payment', key: 'time_payment' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Lịch sử Thuê Xe</h2>
        <Button type="primary" icon={<Download size={16} />} onClick={handleExport}>
          Xuất Excel
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    </div>
  );
};

export default Rentals;
