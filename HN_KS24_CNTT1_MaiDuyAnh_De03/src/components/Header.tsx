import React from 'react'
import { BookOutlined } from '@ant-design/icons'

export default function Header() {
  return (
    <div className="bg-black text-white p-4  justify-center items-center mb-4">
      <h1 className='text-3xl '><BookOutlined />Quản lý  sách</h1>
      <br />
      <span>Quản lý, chỉnh sửa và cập nhật danh sách trong hệ thống</span>
    </div>
  )
}

