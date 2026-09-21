import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Switch, Select, Radio } from 'antd';
import { Plus } from 'lucide-react';
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
      if (json.success) setData(json.data.sort((a: any, b: any) => b.id - a.id));
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

  const handleToggleStatus = async (record: any, checked: boolean) => {
    try {
      const res = await fetchApi(`/vehicles/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...record, status: checked ? 1 : 0 }),
      });
      const json = await res.json();
      if (json.success) {
        message.success('Cập nhật trạng thái thành công');
        loadData();
      } else {
        message.error('Lỗi khi cập nhật trạng thái');
      }
    } catch (e) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { 
      title: 'Biển số', 
      dataIndex: 'license_plate', 
      key: 'license_plate',
      render: (text: string, record: any) => (
        <a onClick={() => showModal(record)} style={{ fontWeight: 600, color: '#009e4e', cursor: 'pointer' }}>
          {text}
        </a>
      )
    },
    { 
      title: 'Danh mục', 
      dataIndex: 'id_category', 
      key: 'id_category',
      render: (val: number) => {
        const cat: any = categories.find((c: any) => c.id === val);
        return cat ? `${cat.brand} - ${cat.type}` : val;
      }
    },
    // { title: 'Giá ngày', dataIndex: 'daily_rate', key: 'daily_rate' },
    // { 
    //   title: 'Trạng thái', 
    //   dataIndex: 'status', 
    //   key: 'status',
    //   render: (status: number) => (
    //     status ? <Tag color="green">Đang thuê</Tag> : <Tag color="blue">Chưa thuê</Tag>
    //   )
    // },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
      <Space size="middle">
          <Button 
            type={record.status ? "default" : "primary"} 
            danger={Boolean(record.status)}
            onClick={() => handleToggleStatus(record, !record.status)}
            style={{ width: 110 }}
          >
            {record.status ? "Đang thuê" : "Chưa thuê"}
          </Button>
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
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="m-0 text-xl font-bold">Quản lý Xe</h2>
          <Button type="primary" icon={<Plus size={16} />} onClick={() => showModal()}>
            Thêm mới
          </Button>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <Select 
              value={filterStatus} 
              onChange={val => setFilterStatus(val)}
              className="w-full sm:min-w-[160px]"
            >
              <Select.Option value="all">Tất cả trạng thái</Select.Option>
              <Select.Option value="free">Chưa thuê</Select.Option>
              <Select.Option value="renting">Đang thuê</Select.Option>
            </Select>
            
            <Select 
              value={filterCategory} 
              onChange={val => setFilterCategory(val)}
              className="w-full sm:min-w-[200px]"
            >
              <Select.Option value="all">Tất cả danh mục</Select.Option>
              {categories.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>{c.brand} - {c.type}</Select.Option>
              ))}
            </Select>
          </div>
          
          <Input.Search 
            placeholder="Tìm theo biển số..." 
            allowClear
            onChange={e => setSearchText(e.target.value)}
            className="w-full xl:max-w-[300px]" 
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
