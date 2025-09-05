import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import Table from 'antd/es/table/Table'
import Space from 'antd/es/space'
import type { TableProps } from 'antd/es/table/InternalTable'
import {  Button, Modal } from 'antd';
export default function BookList() {

    const [selectedKey, setSelectedKey] = useState<string>('');
      
      interface DataType {
    key: string
    id: number
    title: string
    action: string
  }
    const ResetForm = () => {
    setFormData({ id: '', title: '' });
    }
 const handleDelete = (key: string) => {
    setData(prev => prev.filter(item => item.key !== key))
    setIsModalOpenDel(false);
  }
  const handleAdd = (newBook: DataType) => {
    setData(prev => [...prev, newBook]);
    ResetForm();
    setIsModalOpenAdd(false);
  }
const [isModalOpenDel, setIsModalOpenDel] = useState(false);
const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
const showModalDel = (a: string) => {
    setIsModalOpenDel(true);
    setSelectedKey(a);
  };
const showModalAdd = () => {
   
    setIsModalOpenAdd(true);

  }




  const handleCancelDel = () => {
    setIsModalOpenDel(false);

  };
  const handleCancelAdd = () => {
    
    setIsModalOpenAdd(false);
   

  }
   const [data, setData] = useState<DataType[]>([
    {
      key: '1',
      id: 1,
      title: 'Clean Code',
      action: 'edit',
    },
    {
      key: '2',
      id: 2,
      title: 'Design Patterns',
      action: 'edit',
   
  
    },
    {
      key: '3',
      id: 3,
      title: 'Refactoring',
      action: 'edit',
    },
  ])
   const columns: TableProps<DataType>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
   
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{text}</span>,
    },
    
    {
      title: 'Hành động',
      key: 'Hành động',
      render: (_, record) => (
        <Space size="middle">
            <div className='border-2 rounded-full border-slate-100'><EditOutlined className='m-2' onClick={() => { setFormData({ id: record.id.toString(), title: record.title }); showModalAdd(); }} /></div>
          <div className='text-red-500 border-2 rounded-full'><DeleteOutlined onClick={() => showModalDel(record.key)} className='m-2' /></div>

        </Space>
      ),
    },
  ]
    const [formData, setFormData] = useState<{ id: string; title: string }>({ id: '', title: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleEdit = (editedBook: DataType) => {
    setData(prev => prev.map(item => item.key === editedBook.key ? editedBook : item));
    ResetForm();
    setIsModalOpenAdd(false);
  }

  return (
    <div>
      <div className='m-4 p-4 bg-white rounded-lg '>
        <input type="text"  className='border border-gray-300 p-2 rounded-lg w-1/2 mr-2' />
        <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={showModalAdd}><PlusOutlined />thêm sách</button>

      </div>
      <div className='m-4 p-4 bg-white rounded-lg'>
        <Table<DataType> columns={columns} dataSource={data} pagination={false} />
      </div>
    <Modal

        title="Xóa sách"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenDel}
        footer={null}
        onCancel={handleCancelDel}
      >
       
        <p>Bạn chắc chắn muốn xóa</p>
        <div className='flex justify-end'>
<Button onClick={handleCancelDel}>cancel</Button>   
        <Button type="primary" onClick={() => handleDelete(selectedKey)}>OK</Button>
        </div>
        
      </Modal>
      {/* Modal thêm sách */}
      <Modal

        title={formData.id ? "Chỉnh sửa sách" : "Thêm sách"}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenAdd}
        footer={null}
        onCancel={handleCancelAdd}
      >
        <>

          <input type="text" placeholder='id' name='id' onChange={handleChange}/>
          <input type="text" placeholder='tiêu đề' name='title' onChange={handleChange}/>
        </>
        <div className='flex justify-end'>
            <Button onClick={handleCancelAdd}>cancel</Button>   
        <Button type="primary" onClick={() => {  handleAdd({ key: Date.now().toString(), id: Number(formData.id), title: formData.title, action: 'edit' })}}>OK</Button>
        </div>
      </Modal>
      
    </div>
  )
}
