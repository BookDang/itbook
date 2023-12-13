"use client"

import { FC, useEffect, useState } from "react"
import { Button, Form, Input, InputNumber, Select } from "antd"
import { notification } from 'antd';
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { NotificationType } from "@/types/antdtypes"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useSearchParams } from 'next/navigation'
import { CategoryChildren, FieldType } from "@/types/categorytypes"
import CategoryService from "@/services/categoryService"
import { openNotification } from "@/helpers/notification.helper"
import { STATUS } from "@/constants/statusContants"
import { Category as CategoryDB } from "@/types/categorytypes"
import { toggleLoading } from "@/store/features/loading/actions"
import { RootState } from "@/store/store"

type CategoryFormProp = {}
const defaultValues = {
  categoryname: '',
  categoryslug: '',
  categoryparent: 1,
  categorysequence: 1,
}
const CategoryForm: FC<CategoryFormProp> = () => {
  const searchParams = useSearchParams()
  const [api, contextHolder] = notification.useNotification()
  const [form] = Form.useForm()
  const [categories, setCategories] = useState<CategoryDB[] | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const categoryId: string | null = searchParams.get('categoryId')

  useEffect(() => {
    dispatch(toggleLoading(true))
    Promise.all(
      [
        CategoryService.getCategories(),
        CategoryService.getCategory(Number(categoryId))
      ]
    ).then((res) => {
      setCategories(res[0])
      if (res[1]) {
        const editFormValues = {
          categoryname: res[1].name,
          categoryslug: res[1].slug,
          categoryparent: Number(res[1].parentId),
          categorysequence: Number(res[1].sequence),
        }
        reset({ ...editFormValues })
        form.setFieldsValue({ ...editFormValues })
      }
    }).finally(() => {
      dispatch(toggleLoading(false))
    })
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

  const onSubmit: SubmitHandler<FieldType> = async (data: FieldType) => {
    if (categoryId) {
      updateCategory(data)
    } else {
      createCategory(data)
    }
    
  }

  const updateCategory = async (data: FieldType) => {
    const res = await CategoryService.updateCategory(data, Number(categoryId))
    if (res.status === 200) {
      openNotification(api, res.statusText, STATUS.SUCCESS as NotificationType)
      reset()
      dispatch(toggleLoading(true))
      router.push('/dashboard/categories')
    }
    else {
      openNotification(api, res.statusText, STATUS.ERROR as NotificationType)
    }
  }

  const createCategory = async (data: FieldType) => {
    const res = await CategoryService.createCategory(data)
    if (res.status === 201) {
      openNotification(api, res.statusText, STATUS.SUCCESS as NotificationType)
      reset()
      dispatch(toggleLoading(true))
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
                  categories?.filter(item => item.id !== Number(categoryId))?.map((item) => {
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