import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { Edit, Trash2, Plus } from 'lucide-react';
import { fetchApi } from './api';

const Categories: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/categories');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetchApi(`/categories/${id}`, { method: 'DELETE' });
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
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/categories/${editingId}` : '/categories';
      
      const res = await fetchApi(url, {
        method,
        body: JSON.stringify(values),
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
    { title: 'Hãng xe', dataIndex: 'brand', key: 'brand' },
    { title: 'Loại xe', dataIndex: 'type', key: 'type' },
    { title: 'Ngày tạo', dataIndex: 'date', key: 'date' },
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Quản lý Danh mục</h2>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />

      <Modal title={editingId ? 'Sửa danh mục' : 'Thêm danh mục'} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="brand" label="Hãng xe" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại xe" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày tạo" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
