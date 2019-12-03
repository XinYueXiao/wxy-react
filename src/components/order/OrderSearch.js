import React, { Children } from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const OrderSearch = props => {
    const { getFieldDecorator } = props.form
    const taskRule = {
        rules: [
            {
                required: true,
                message: 'Please input your name',
            },
        ]
    }
    const formData = {
        layout: 'lnline',
        children: [
            {
                label: '任务名称',
                key: 'username',
                children: {
                    type: 'Input',
                }
            }
        ]
    }
    return (
        <Form layout='inline'>
            <FormItem label='任务名称'>
                {getFieldDecorator('username')(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
            <FormItem label='任务ID'>
                {getFieldDecorator('username', { ...taskRule })(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
        </Form>
    );
}
const OrderSearchForm = Form.create({ name: 'order_search' })(OrderSearch);
export default OrderSearchForm