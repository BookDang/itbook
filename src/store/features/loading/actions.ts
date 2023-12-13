import { createAction } from "@reduxjs/toolkit"

export const toggleLoading = createAction<boolean>('toggleLoading')