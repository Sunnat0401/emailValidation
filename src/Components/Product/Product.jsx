import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Upload } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Navbar from '../Navbar/Navbar';
import './Product.css';

const { confirm } = Modal;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const [fileList, setFileList] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  };

  const handleAddProduct = () => {
    const url = editingProductId
      ? `https://fakestoreapi.com/products/${editingProductId}`
      : 'https://fakestoreapi.com/products';

    const method = editingProductId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newProduct.title,
        price: parseFloat(newProduct.price), 
        description: newProduct.description,
        image: newProduct.image,
        category: newProduct.category
      })
    })
      .then(res => res.json())
      .then(data => {
        if (editingProductId) {
          setProducts(prev =>
            prev.map(item => (item.id === editingProductId ? data : item))
          );
        } else {
          setProducts(prev => [...prev, data]);
        }
        setNewProduct({
          title: '',
          price: '',
          description: '',
          image: '',
          category: ''
        });
        setFileList([]);
        setEditingProductId(null);
        setIsModalVisible(false);
      })
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };

  const handleEdit = (product) => {
    setNewProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    });
    setEditingProductId(product.id);
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: product.image
      }
    ]);
    setIsModalVisible(true);
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this product?',
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, the product cannot be recovered.',
      okText: 'OK',
      okType: 'danger',
      cancelText: 'Cancel',
      cancelButtonProps: {
        style: { backgroundColor: 'green', color: 'white' }
      },
      onOk() {
        deleteProduct(id);
      },
      onCancel() {
        console.log('Delete canceled');
      },
    });
  };

  const deleteProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setProducts(prev => prev.filter(item => item.id !== id));
      })
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };

  return (
    <div className='product'>
      <Navbar />
      <div className='container'>
        <Button style={{ marginTop: "10px" }} type='primary' onClick={() => setIsModalVisible(true)}>Add product</Button>
        <div className="product-cards">
          {products && products.map((item, index) => (
            <div className='product-card' key={index}>
              <img className='product-image' src={item.image} alt={item.title} />
              <div className='product-information'>
                <h2 className='product-title'>{truncateText(item.title, 10)}</h2>
                <p className='product-price'>${item.price}</p>
              </div>
              <p className='product-decr'>{truncateText(item.description, 100)}</p>
              <Button className='edit-btn' onClick={() => handleEdit(item)}>Edit</Button>
              <Button className='delete-btn' onClick={() => showDeleteConfirm(item.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={editingProductId ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setNewProduct({
            title: '',
            price: '',
            description: '',
            image: '',
            category: ''
          });
          setFileList([]);
          setEditingProductId(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleAddProduct}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the product title!' }]}
          >
            <Input name="title" value={newProduct.title} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <Input name="price" type="number" value={newProduct.price} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input.TextArea name="description" value={newProduct.description} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{
              required: true,
              message: 'Please upload the product image!'
            }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              beforeUpload={() => false} 
            >
              {fileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input the product category!' }]}
          >
            <Input name="category" value={newProduct.category} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProductId ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
