"use client"

import { FC, useEffect } from "react"
import { Button, Checkbox, Form, Input, Select } from "antd"


import { useForm, SubmitHandler, Controller } from "react-hook-form"


type CategoryProp = {}


type FieldType = {
  categoryname: string
  categoryslug: string
  categoryparent?: {}
};

const Category: FC<CategoryProp> = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldType>()

  const [form] = Form.useForm()

  const watchCategoryName = watch("categoryname")

  useEffect(() => {
    setValue('categoryslug', watchCategoryName)
    form.setFieldsValue({ categoryslug: watchCategoryName });
  }, [watchCategoryName])

  const onSubmit: SubmitHandler<FieldType> = (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="border border-solid border-gray-500 rounded p-2 add-new-category">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Controller
            name="categoryname"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Form.Item
                {...field}
                label="Category name"
                wrapperCol={{ span: 10 }}
                rules={[{ required: true, message: 'Please enter category name!' }]}
              >
                <Input />
              </Form.Item>
            )}
          />
          <Controller
            name="categoryparent"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Form.Item
                label="Parent category"
                wrapperCol={{ span: 6 }}
              >
                <Select {...field}>
                  <Select.Option value="1">Javascript</Select.Option>
                  <Select.Option value="2">PHP</Select.Option>
                </Select>
              </Form.Item>
            )}
          />
          <Controller
            name="categoryslug"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <Form.Item
                {...field}
                label="Category slug"
                wrapperCol={{ span: 10 }}
              >
                <Input disabled />
              </Form.Item>
            )}
          />
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Category