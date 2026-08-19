import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Select, Form, Popconfirm, Tag, Radio, Input } from 'antd';
import { Car, CreditCard, Edit, Search } from 'lucide-react';
import { fetchApi } from './api';

const Orders: React.FC = () => {
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [assigningOrderId, setAssigningOrderId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
    loadVehicles();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/orders');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  const loadVehicles = async (typeCategory?: string) => {
    try {
      let mappedCategory = typeCategory;
      // Database has 'Vinfast Feliz II' while frontend might use 'Vinfast Feliz S'
      if (mappedCategory === 'Vinfast Feliz S') {
        mappedCategory = 'Vinfast Feliz II';
      }

      const url = mappedCategory 
        ? `/vehicles/search?type_category=${encodeURIComponent(mappedCategory)}`
        : '/vehicles';

      const res = await fetchApi(url);
      const json = await res.json();
      if (json.success) {
        setVehicles(json.data.filter((v: any) => v.status === 0 || v.status === false));
      }
    } catch (e) {}
  };

  const showAssignModal = (record: any) => {
    setAssigningOrderId(record.id);
    setIsAssignModalVisible(true);
    form.resetFields();
    loadVehicles(record.type_category);
  };

  const handleAssignOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetchApi(`/orders/${assigningOrderId}/assign-vehicles`, {
        method: 'POST',
        body: JSON.stringify({ vehicle_ids: values.vehicle_ids }),
      });
      const json = await res.json();
      if (json.success) {
        // Cập nhật trạng thái đơn thành Đang thuê (status = true)
        await fetchApi(`/orders/${assigningOrderId}`, {
          method: 'PUT',
          body: JSON.stringify({ status: true }),
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

  const handleCheckout = async (id: number) => {
    try {
      const res = await fetchApi(`/orders/${id}/checkout`, {
        method: 'POST'
      });
      const json = await res.json();
      if (json.success) {
        message.success('Thanh toán và trả xe thành công');
        loadData();
      } else {
        message.error(json.message || 'Lỗi thanh toán');
      }
    } catch (e) {
      message.error('Lỗi kết nối');
    }
  };

  const columns = [
    { title: 'Mã', dataIndex: 'id', key: 'id' },
    { title: 'Khách hàng', dataIndex: 'name', key: 'name' },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { title: 'Ngày nhận', dataIndex: 'time_start', key: 'time_start' },
    { title: 'Loại xe', dataIndex: 'type_category', key: 'type_category' },
    { title: 'SL', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Biển số',
      key: 'assigned_plates',
      render: (_: any, record: any) => (
        <span style={{ fontWeight: 500, color: '#00c461' }}>
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
            <Button type="default" icon={<Car size={16} />} onClick={() => showAssignModal(record)}>
              Giao xe
            </Button>
          ) : (
            <Button type="default" icon={<Edit size={16} />} onClick={() => message.info('Chức năng sửa thông tin xe đang cập nhật')}>
              Chỉnh sửa
            </Button>
          )}
          <Popconfirm title="Xác nhận khách thanh toán và trả xe?" onConfirm={() => handleCheckout(record.id)}>
            <Button type="primary" icon={<CreditCard size={16} />}>
              Thanh toán
            </Button>
          </Popconfirm>
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

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Quản lý Đơn Đặt</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Radio.Group 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)} 
            buttonStyle="solid"
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <Radio.Button value="all">Tất cả</Radio.Button>
            <Radio.Button value="waiting">Chờ giao xe</Radio.Button>
            <Radio.Button value="renting">Đang thuê</Radio.Button>
          </Radio.Group>
          
          <Input.Search 
            placeholder="Tìm theo Tên hoặc SĐT..." 
            allowClear
            onChange={e => setSearchText(e.target.value)}
            style={{ maxWidth: 300, minWidth: 200, width: '100%' }} 
          />
        </div>
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        loading={loading} 
        scroll={{ x: 1000 }}
      />

      <Modal title="Giao xe cho khách" open={isAssignModalVisible} onOk={handleAssignOk} onCancel={() => setIsAssignModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="vehicle_ids" label="Chọn xe" rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 xe' }]}>
            <Select mode="multiple" placeholder="Chọn xe (có thể chọn nhiều)">
              {vehicles.map((v: any) => (
                <Select.Option key={v.id} value={v.id}>{v.license_plate}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
