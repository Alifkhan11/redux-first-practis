import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['todo'],
    endpoints: (builders) => ({
        getTodos: builders.query({
            query: (priority) => {

                const params = new URLSearchParams()
                if (priority) {
                    params.append('priority', priority)
                }

                return {
                    url: `/tasks`,
                    // url:`/tasks?priority=${priority}`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['todo']
        }),
        addTodos: builders.mutation({
            query: (data) => ({
                url: '/task',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['todo']
        }),
        updathTodos: builders.mutation({
            query: (options) => {
                console.log(options);
                return {
                    url: `/task/${options.id}`,
                    method: 'PUt',
                    body: options.data
                }
            },
            invalidatesTags: ['todo']
        }),
        deletedTodos: builders.mutation({
            query: (id) => {
                return {
                    url: `/task/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['todo']
        }),
    })
})

export const { useGetTodosQuery, useAddTodosMutation, useUpdathTodosMutation, useDeletedTodosMutation } = baseApi