"use client"

import { FC, useEffect } from "react"
import { Button, Form, Input, InputNumber, Select } from "antd"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { FieldType } from "@/types/categorytypes"
import { createCategory } from "@/services/categoryService"

type CategoryFormProp = {}

const CategoryForm: FC<CategoryFormProp> = () => {
  const [form] = Form.useForm()
  const {
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm<FieldType>({
    defaultValues: {
      categoryname: 'React native',
      categoryslug: '',
      categoryparent: 0,
      categorysequence: 1,
    }
  })

  const watchCategoryName: string = watch("categoryname") || ''

  useEffect(() => {
    const categorySlugText = watchCategoryName.toLowerCase().replace(' ', '_')
    setValue('categoryslug', categorySlugText)
    form.setFieldsValue({ categoryslug: categorySlugText });
  }, [watchCategoryName])

  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    const res = await createCategory(data)
    console.log('onSubmit', res)
  }

  return (
    <>
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
              // initialValue={field.value}
              wrapperCol={{ span: 10 }}
              rules={[{ required: true, message: 'Please enter category name!' }]}
            >
              <Input />
            </Form.Item>
          )}
        />
        <Controller
          name="categorysequence"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Form.Item
              {...field}
              label="Category sequence"
              initialValue={field.value}
              wrapperCol={{ span: 10 }}
              rules={[
                {
                  required: true,
                  message: 'Please enter category sequence!'
                },
                {
                  validator: (_, value) => {
                    if (value <= 100 && value >= 1) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Category sequence must be between 1 and 100');
                  }
                }
              ]}
            >
              <InputNumber />
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
              initialValue={field.value}
            >
              <Select {...field} value={'0'}>
                <Select.Option value="0">None</Select.Option>
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
              <Input readOnly className="cursor-no-drop" />
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CategoryForm