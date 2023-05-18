import './employees.css';
import React, { Component } from "react";
import axios from "axios";
import { Button, Table, Space, Popconfirm, message, Modal, Form, Input, InputNumber } from "antd";
import { TeamOutlined, LogoutOutlined } from '@ant-design/icons';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal on/off
      openModal: false,
      openModalEdit: false,

      // employee data for table
      data: [],
      columns: [
        {
          dataIndex: "id",
          key: "id",
          title: "ID",
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.id - b.id,
        },
        {
          dataIndex: "first_name",
          key: "first_name",
          title: "First Name",
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.id - b.id,
          render: (text) => <Button type="link">{text}</Button>,
        },
        {
          dataIndex: "last_name",
          key: "last_name",
          title: "Last Name",
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.id - b.id,
          render: (text) => <Button type="link">{text}</Button>,
        },
        {
          dataIndex: "salary",
          key: "salary",
          title: "Salary",
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.id - b.id,
        },
        {
          key: "action",
          title: "Action",
          render: (_, record) => (
            <Space size="middle">
              <Button type="link" onClick={()=>{this.handleEdit(record)}}>Edit</Button>
              <Popconfirm
                title="Delete employee"
                description="Are you sure to delete this employee?"
                onConfirm={() => {this.handleDeleteConfirm(record.id)}}
                onCancel={() => {this.handleDeleteCancel()}}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="link">Delete</Button>
              </Popconfirm>
            </Space>
          ),
        }
      ],

      // form fields
      form: {
        firstName: "",
        lastName: "",
        salary: 0
      },
      idBeingEdited: 0
    };

    // event handlers
    this.fetchData = this.fetchData.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddConfirm = this.handleAddConfirm.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditConfirm = this.handleEditConfirm.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
  }

  fetchData() {
    axios.get("/employees").then(res => {
      this.setState({
        data: res.data.employees
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleAdd() {
    this.setState({openModal: true});
  }

  handleAddConfirm() {
    // validate inputs
    if (this.state.form.firstName.length !== 0 &&
        this.state.form.lastName.length !== 0 &&
        !isNaN(+this.state.form.salary)) {
          // call api to add employee
          axios.post("/employees", this.state.form).then(res => {
            message.success("Employee added successfully");
          }).then(()=>{
            this.fetchData();
          }).then(()=>{
            this.forceUpdate();
            this.setState({
              openModal: false,
              form: {
                firstName: "",
                lastName: "",
                salary: 0
              }});
          });
    }
  }

  handleAddCancel() {
    this.setState({
      openModal: false,
      form: {
        firstName: "",
        lastName: "",
        salary: 0
    }});
  }

  handleDeleteConfirm(id) {
    axios.delete("/employees/" + id).then(res => {
      message.success("Employee deleted successfully");
    }).then(()=>{
      this.fetchData();
    }).then(()=>{
      this.forceUpdate();
    })
  }

  handleDeleteCancel() {}

  handleEdit(record) {
    this.setState({
      form: {
        firstName: record.first_name,
        lastName: record.last_name,
        salary: record.salary
      },
      idBeingEdited: record.id
    }, ()=>{
      this.forceUpdate();
      this.setState({
        openModalEdit: true
      })
    });
  }

  handleEditConfirm() {
    // validate inputs
    console.log(this.state.form.firstName.length !== 0);
    console.log(this.state.form.lastName.length !== 0);
    console.log(!isNaN(+this.state.form.salary));

    if (this.state.form.firstName.length !== 0 &&
      this.state.form.lastName.length !== 0 &&
      !isNaN(+this.state.form.salary)) {
        // call api to update employee
        axios.put("/employees/" + this.state.idBeingEdited, this.state.form).then(res => {
          message.success("Employee updated successfully");
        }).then(()=>{
          this.fetchData();
        }).then(()=>{
          this.forceUpdate();
          this.setState({
            openModalEdit: false,
            form: {
              firstName: "",
              lastName: "",
              salary: 0
            }});
        });
    }    
  }

  handleEditCancel() {
    this.setState({
      openModalEdit: false,
      form: {
        firstName: "",
        lastName: "",
        salary: 0
    }});
  }

  render() {
    return (
      <div className="employees">
        <header className="employees-header">
          <div className="employees-title">
          <div className="employees-logo"> <TeamOutlined /></div>
          <p>
            Employees: {this.state.data.length}
          </p>
          </div>
          <div className='table-add'>
            <Button type="primary" size="large" onClick={this.handleAdd}>
              + Add 
            </Button>

            <Modal
              centered 
              destroyOnClose={true}
              title="Add Employee"
              open={this.state.openModal}
              onCancel={this.handleAddCancel}
              onOk={this.handleAddConfirm}
              >
                <Form 
                  preserve={false}
                  layout="vertical" 
                  name="addEmployee" 
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    salary: 0,
                  }}
                  onFieldsChange={(_, allFields)=>{
                    this.setState({form: {
                      firstName: allFields[0].value,
                      lastName: allFields[1].value,
                      salary: allFields[2].value
                    }});
                  }}>
                  <Form.Item name="firstName" label="First Name" rules={[{
                    required: true,
                    message: "Please input the first name of the employee"
                  },
                  ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="lastName" label="Last Name" rules={[{
                    required: true,
                    message: "Please input the last name of the employee"
                  },
                  ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="salary" label="Salary" rules={[{
                    required: true,
                    message: "Please input the salary of the employee"
                  },
                  ]}>
                    <InputNumber />
                  </Form.Item>
                </Form>
            </Modal>

            <Modal
              centered 
              destroyOnClose={true}
              title="Edit Employee"
              open={this.state.openModalEdit}
              onCancel={()=>{this.handleEditCancel()}}
              onOk={()=>{this.handleEditConfirm()}}
              >
                <Form 
                  preserve={false}
                  layout="vertical" 
                  name="editEmployee"
                  initialValues={{
                    id: this.state.idBeingEdited,
                    firstName: this.state.form.firstName,
                    lastName: this.state.form.lastName,
                    salary: this.state.form.salary,
                  }}
                  onFieldsChange={(_, allFields)=>{
                    this.setState({form: {
                      firstName: allFields[1].value,
                      lastName: allFields[2].value,
                      salary: allFields[3].value
                    }});
                  }}>
                  <Form.Item name="id" label="ID">
                    <Input disabled placeholder={this.state.idBeingEdited}/>
                  </Form.Item>
                  <Form.Item name="firstName" label="First Name" rules={[{
                    required: true,
                    message: "Please input the first name of the employee"
                  },
                  ]}>
                    <Input placeholder={this.state.form.firstName}/>
                  </Form.Item>
                  <Form.Item name="lastName" label="Last Name" rules={[{
                    required: true,
                    message: "Please input the last name of the employee"
                  },
                  ]}>
                    <Input placeholder={this.state.form.lastName}/>
                  </Form.Item>
                  <Form.Item name="salary" label="Salary" rules={[{
                    required: true,
                    message: "Please input the salary of the employee"
                  },
                  ]}>
                    <InputNumber placeholder={this.state.form.salary}/>
                  </Form.Item>
                </Form>
            </Modal>
          </div>
          <div>
            <Table 
              columns={this.state.columns} 
              dataSource={this.state.data} 
              pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}/>
          </div>
          <div className="bottom">
            <Button type="primary" size="large" icon={<LogoutOutlined />} 
              onClick={this.props.handleLogout}>
              Log out
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default Employees;