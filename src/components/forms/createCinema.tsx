import { FormProvider, useForm } from 'react-hook-form'
import React from 'react'
import { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaCreateScreen } from './createScreen'

export const schemaCreateAddress = z.object({

  Address: z.string(),
})

export const schemaCreateCinema = z.object({
  name: z.string().min(1, { message: 'Cinema name is required' }),
  managerId: z.string(),
  Address: z.string(),
  screens: z.array(schemaCreateScreen),
})

export type FormTypeCreateCinema = z.infer<typeof schemaCreateCinema>

export const useFormCreateCinema = () =>
  useForm<FormTypeCreateCinema>({
    resolver: zodResolver(schemaCreateCinema),
    defaultValues: {
      Address: '',
      name: '',
      screens: [],
    },
  })

export const FormProviderCreateCinema = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateCinema()

  return <FormProvider {...methods}>{children}</FormProvider>
}
