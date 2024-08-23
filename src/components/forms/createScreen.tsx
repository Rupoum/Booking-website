import { FormProvider, useForm } from 'react-hook-form'
import { ReactNode } from 'react'
import { z } from 'zod'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
// import { ProjectionType, SoundSystemType } from '@prisma/client'
enum ProjectionType {
  Imax = "Imax",
  FourK = "4k",
  Atoms = "Atoms",
  Imax4k = "Imax4k",
  Normal = "Normal",
}

enum SoundSystemType {
  Dolby = "Dolby",
  HighAmplifier = "HighAmplifier",
  Normal = "Normal",
}
export const schemaCreateScreen = z.object({
  projectionType: z.nativeEnum(ProjectionType),
  soundSystemType: z.nativeEnum(SoundSystemType),
  rows: z.number(),
  columns: z.number(),
  price: z.number(),
})

export type FormTypeCreateScreen = z.infer<typeof schemaCreateScreen>

export const useFormCreateScreen = () =>
  useForm<FormTypeCreateScreen>({
    resolver: zodResolver(schemaCreateScreen),
  })

export const FormProviderCreateScreen = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateScreen()

  return <FormProvider {...methods}>{children}</FormProvider>
}
