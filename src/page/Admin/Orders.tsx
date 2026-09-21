import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Select, Form, Tag, Radio, Input, InputNumber } from 'antd';
import { Car, CreditCard } from 'lucide-react';
import { fetchApi } from './api';
// @ts-ignore
import qrImage from '../../assets/image/IMG_8501.JPG';

const Orders: React.FC = () => {
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [allAvailableVehicles, setAllAvailableVehicles] = useState([]);
  const [assignCategoryFilter, setAssignCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [assigningOrderId, setAssigningOrderId] = useState<number | null>(null);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [checkoutOrderId, setCheckoutOrderId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [checkoutForm] = Form.useForm();

  useEffect(() => {
    loadData();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchApi('/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (e) { }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/orders');
      const json = await res.json();
      if (json.success) setData(json.data.sort((a: any, b: any) => b.id - a.id));
    } catch (e) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  const loadAllAvailableVehicles = async () => {
    try {
      const res = await fetchApi('/vehicles');
      const json = await res.json();
      if (json.success) {
        setAllAvailableVehicles(json.data.filter((v: any) => v.status === 0 || v.status === false));
      }
    } catch (e) {}
  };

  const showAssignModal = (record: any) => {
    setAssigningOrderId(record.id);
    setIsAssignModalVisible(true);
    form.resetFields();
    setAssignCategoryFilter(record.type_category || 'all');
    loadAllAvailableVehicles();
  };

  const handleAssignOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetchApi(`/orders/${assigningOrderId}/assign-vehicles`, {
        method: 'POST',
        body: JSON.stringify({ vehicle_ids: values.vehicle_ids }),
      });
      const text = await res.text();
      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        console.warn('Response is not JSON:', text);
      }

      if (res.ok || json.success) {
        const now = new Date();
        const formattedNow = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        await fetchApi(`/orders/${assigningOrderId}`, {
          method: 'PUT',
          body: JSON.stringify({ status: true, time_start: formattedNow }),
        });
        message.success('Đã giao xe thành công');
        setIsAssignModalVisible(false);
        loadData();
      } else {
        message.error(json.message || 'Lỗi khi giao xe');
      }
    } catch (e) {
      // validation failed
    }
  };

  const showCheckoutModal = (record: any) => {
    setCheckoutOrderId(record.id);
    setIsCheckoutModalVisible(true);
    checkoutForm.resetFields();
  };

  const handleCheckoutSubmit = async () => {
    try {
      const values = await checkoutForm.validateFields();
      const res = await fetchApi(`/orders/${checkoutOrderId}/checkout`, {
        method: 'POST',
        body: JSON.stringify({ amount: Number(values.amount), note: values.note })
      });
      const text = await res.text();
      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        console.warn('Response is not JSON:', text);
      }

      if (res.ok || json.success) {
        message.success('Thanh toán và trả xe thành công');
        setIsCheckoutModalVisible(false);
        loadData();
      } else {
        message.error(json.message || 'Lỗi thanh toán');
      }
    } catch (e: any) {
      if (e?.name !== 'ValidationError') {
        message.error('Lỗi kết nối hoặc lỗi server');
        console.error(e);
      }
    }
  };

  const columns: any = [
    { title: 'Mã', dataIndex: 'id', key: 'id', responsive: ['md'] },
    { 
      title: 'Khách hàng', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string, record: any) => (
        <a style={{ fontWeight: 600, color: '#0d9488', cursor: 'pointer' }} onClick={() => {
          if (!record.status) showAssignModal(record);
          else message.info('Chức năng sửa thông tin xe đang cập nhật');
        }}>
          {text}
        </a>
      )
    },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone', responsive: ['md'] },
    { 
      title: 'Ngày nhận', 
      dataIndex: 'time_start', 
      key: 'time_start', 
      responsive: ['md'],
      render: (text: string, record: any) => record.status ? <span style={{ fontWeight: 500, color: '#0d9488' }}>{text}</span> : <span style={{ color: '#ccc' }}>-</span>
    },
    { title: 'Loại xe', dataIndex: 'type_category', key: 'type_category', responsive: ['md'] },
    { title: 'SL', dataIndex: 'quantity', key: 'quantity', responsive: ['md'] },
    {
      title: 'Biển số',
      key: 'assigned_plates',
      render: (_: any, record: any) => (
        <span style={{ fontWeight: 500, color: '#14b8a6' }}>
          {record.assigned_plates || '-'}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => (
        record.status ? <Tag color="green">Đang thuê</Tag> : <Tag color="orange">Chờ giao xe</Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {!record.status ? (
            <Button type="default" icon={<Car size={16} />} onClick={() => showAssignModal(record)} style={{ width: 32, height: 32, padding: 0 }} />
          ) : (
            <Button type="primary" icon={<CreditCard size={16} />} onClick={() => showCheckoutModal(record)} style={{ width: 32, height: 32, padding: 0 }} />
          )}
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((item: any) => {
    if (filterStatus === 'waiting' && item.status) return false;
    if (filterStatus === 'renting' && !item.status) return false;

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      const matchName = item.name && item.name.toLowerCase().includes(lowerSearch);
      const matchPhone = item.phone && item.phone.toLowerCase().includes(lowerSearch);
      if (!matchName && !matchPhone) return false;
    }

    return true;
  });

  const filteredVehicles = allAvailableVehicles.filter((v: any) => {
    if (assignCategoryFilter === 'all') return true;
    const cat: any = categories.find((c: any) => c.id === v.id_category);
    if (!cat) return false;
    // Map Frontend category names to Backend if necessary
    let mappedCategory = assignCategoryFilter;
    if (mappedCategory === 'Vinfast Feliz S') mappedCategory = 'Vinfast Feliz II';
    return cat.type === mappedCategory;
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="m-0 text-xl font-bold">Quản lý Đơn Đặt</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Select
            value={filterStatus} 
            onChange={val => setFilterStatus(val)} 
            className="w-full sm:min-w-[160px]"
          >
            <Select.Option value="all">Tất cả đơn</Select.Option>
            <Select.Option value="waiting">Chờ giao xe</Select.Option>
            <Select.Option value="renting">Đang thuê</Select.Option>
          </Select>
          
          <Input.Search 
            placeholder="Tìm theo Tên hoặc SĐT..." 
            allowClear
            onChange={e => setSearchText(e.target.value)}
            className="w-full sm:max-w-[300px]" 
          />
        </div>
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        loading={loading} 
        scroll={{ x: 500 }}
        size="middle"
        pagination={false}
      />

      <Modal title="Giao xe cho khách" open={isAssignModalVisible} onOk={handleAssignOk} onCancel={() => setIsAssignModalVisible(false)}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Lọc nhanh theo loại xe:</div>
          <Radio.Group 
            value={assignCategoryFilter} 
            onChange={e => setAssignCategoryFilter(e.target.value)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
          >
            <Radio.Button value="all">Tất cả</Radio.Button>
            {[...new Set(categories.map((c: any) => c.type === 'Vinfast Feliz II' ? 'Vinfast Feliz S' : c.type))].map(type => (
              <Radio.Button key={type as string} value={type}>{type as string}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item name="vehicle_ids" label="Chọn xe" rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 xe' }]}>
            <Select 
              mode="multiple" 
              placeholder="Chọn xe (có thể chọn nhiều)"
              showSearch
              maxTagCount="responsive"
              listHeight={250}
              optionFilterProp="children"
              filterOption={(input, option) => {
                const text = String(option?.children ?? '').toLowerCase();
                return text.includes(input.toLowerCase());
              }}
            >
              {filteredVehicles.map((v: any) => {
                const cat: any = categories.find((c: any) => c.id === v.id_category);
                const categoryName = cat ? `${cat.brand} - ${cat.type}` : '';
                return (
                  <Select.Option key={v.id} value={v.id}>
                    {v.license_plate} {categoryName ? `- ${categoryName}` : ''}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Thanh toán đơn hàng" open={isCheckoutModalVisible} onOk={handleCheckoutSubmit} onCancel={() => setIsCheckoutModalVisible(false)} okText="Xác nhận thanh toán">
        <Form form={checkoutForm} layout="vertical">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
             <div style={{ 
                width: 260, 
                height: 300, 
                overflow: 'hidden', 
                borderRadius: 16, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
             }}>
               <img src={qrImage} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', objectPosition: 'center 48%' }} />
             </div>
             <div style={{ marginTop: 16, textAlign: 'center', fontSize: 14 }}>
               Quét mã để chuyển tiền đến<br/>
               <strong style={{ fontSize: 16 }}>BUI MINH HIEU</strong><br/>
               3586 8683 86 - TECHCOMBANK
             </div>
          </div>
          <Form.Item name="amount" label="Số tiền thanh toán (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}>
            <InputNumber 
               style={{ width: '100%' }} 
               formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
               parser={(value) => (value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0) as any}
               min={0}
               size="large"
               placeholder="Nhập số tiền khách phải trả..."
            />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={2} placeholder="Nhập ghi chú thanh toán (nếu có)..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
