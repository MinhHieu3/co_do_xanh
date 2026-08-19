import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Switch, Select, Radio, Tag } from 'antd';
import { Edit, Trash2, Plus } from 'lucide-react';
import { fetchApi } from './api';

const Vehicles: React.FC = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
    loadCategories();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/vehicles');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    try {
      const res = await fetchApi('/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (e) {}
  };

  const handleDelete = async (id: number) => {
    try {
      await fetchApi(`/vehicles/${id}`, { method: 'DELETE' });
      message.success('Xóa thành công');
      loadData();
    } catch (e) {
      message.error('Xóa thất bại');
    }
  };

  const showModal = (record?: any) => {
    setIsModalVisible(true);
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        ...record,
        status: Boolean(record.status)
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/vehicles/${editingId}` : '/vehicles';
      
      const res = await fetchApi(url, {
        method,
        body: JSON.stringify({ ...values, status: values.status ? 1 : 0 }),
      });
      const json = await res.json();
      if (json.success) {
        message.success('Lưu thành công');
        setIsModalVisible(false);
        loadData();
      } else {
        message.error('Lỗi khi lưu');
      }
    } catch (e) {
      // form validation failed
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Biển số', dataIndex: 'license_plate', key: 'license_plate' },
    { 
      title: 'Danh mục', 
      dataIndex: 'id_category', 
      key: 'id_category',
      render: (val: number) => {
        const cat: any = categories.find((c: any) => c.id === val);
        return cat ? `${cat.brand} - ${cat.type}` : val;
      }
    },
    { title: 'Giá ngày', dataIndex: 'daily_rate', key: 'daily_rate' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: number) => (
        status ? <Tag color="green">Đang thuê</Tag> : <Tag color="blue">Trống</Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<Edit size={16} />} onClick={() => showModal(record)} />
          <Button type="primary" danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((item: any) => {
    if (filterStatus === 'renting' && !item.status) return false;
    if (filterStatus === 'free' && item.status) return false;

    if (filterCategory !== 'all' && item.id_category !== filterCategory) return false;

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      const matchPlate = item.license_plate && item.license_plate.toLowerCase().includes(lowerSearch);
      if (!matchPlate) return false;
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Quản lý Xe</h2>
          <Button type="primary" icon={<Plus size={16} />} onClick={() => showModal()}>
            Thêm mới
          </Button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Space wrap>
            <Radio.Group 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)} 
              buttonStyle="solid"
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="free">Trống</Radio.Button>
              <Radio.Button value="renting">Đang thuê</Radio.Button>
            </Radio.Group>
            
            <Select 
              value={filterCategory} 
              onChange={val => setFilterCategory(val)}
              style={{ minWidth: 200 }}
            >
              <Select.Option value="all">Tất cả danh mục</Select.Option>
              {categories.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>{c.brand} - {c.type}</Select.Option>
              ))}
            </Select>
          </Space>
          
          <Input.Search 
            placeholder="Tìm theo biển số..." 
            allowClear
            onChange={e => setSearchText(e.target.value)}
            style={{ maxWidth: 300, minWidth: 200, flex: 1 }} 
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

      <Modal title={editingId ? 'Sửa xe' : 'Thêm xe'} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="license_plate" label="Biển số" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="id_category" label="Danh mục xe" rules={[{ required: true }]}>
            <Select>
              {categories.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>{c.brand} - {c.type}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="daily_rate" label="Giá thuê theo ngày">
            <Input />
          </Form.Item>
          <Form.Item name="monthly_rate" label="Giá thuê theo tháng">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái (Bật = Đang thuê)" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicles;
