"use client"

import { FC, useEffect, useState } from "react"
import { Button, Form, Input, InputNumber, Select } from "antd"
import { notification } from 'antd';
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { NotificationType } from "@/types/antdtypes"
import { useRouter } from "next/navigation"
import { FieldType } from "@/types/categorytypes"
import CategoryService from "@/services/categoryService"
import { openNotification } from "@/helpers/notification.helper"
import { STATUS } from "@/constants/statusContants"
import { Category as CategoryDB } from "@/types/categorytypes"

type CategoryFormProp = {}
const defaultValues = {
  categoryname: '',
  categoryslug: '',
  categoryparent: 1,
  categorysequence: 1,
}
const CategoryForm: FC<CategoryFormProp> = () => {
  const [api, contextHolder] = notification.useNotification()
  const [form] = Form.useForm()
  const [categories, setCategories] = useState<CategoryDB[] | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => {
        setCategories(res)
      })
      .finally(() => { })
  }, [])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { isDirty, isValid, isSubmitting }
  } = useForm<FieldType>({
    defaultValues,
  })

  const watchCategoryName: string = watch("categoryname") || ''

  useEffect(() => {
    const categorySlugText = watchCategoryName.toLowerCase().replaceAll(' ', '_')
    setValue('categoryslug', categorySlugText)
    form.setFieldsValue({ categoryslug: categorySlugText })
  }, [watchCategoryName, form, setValue])

  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    const res = await CategoryService.createCategory(data)
    if (res.status === 201) {
      openNotification(api, res.statusText, STATUS.SUCCESS as NotificationType)
      reset()
      router.push('/dashboard/categories')
    } else if (res.status === 422) {
      openNotification(api, res.statusText, STATUS.WARNING as NotificationType)
    }
    else {
      openNotification(api, res.statusText, STATUS.ERROR as NotificationType)
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        name="category_form"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        className="mt-8"
      >
        <Controller
          name="categoryname"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Form.Item
              {...field}
              label="Category name"
              initialValue={field.value}
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
              {...field}
              label="Parent category"
              wrapperCol={{ span: 6 }}
              initialValue={field.value}
            >
              <Select {...field} value={1}>
                <Select.Option value={1} key={0}>Root</Select.Option>
                {
                  categories?.map((item) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  })
                }
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
              initialValue={field.value}
            >
              <Input readOnly className="cursor-no-drop" />
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CategoryForm