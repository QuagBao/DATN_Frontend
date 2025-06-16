import { type FieldValues, type Path, type UseFormSetError } from 'react-hook-form'
import axios, { type AxiosError, HttpStatusCode } from 'axios'

import { UNAUTHORIZED_CAUSE } from '~/shared/constants'
import { type EntityErrorSchema, type TApiError, type UnauthorizedCauseSchema } from '~/shared/validators'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export const isUnprocessableEntityError = <T>(error: unknown): error is AxiosError<T> => {
  return (
    (error as AxiosError<T>).isAxiosError &&
    (error as AxiosError<T>).response?.status === HttpStatusCode.UnprocessableEntity
  )
}

export function isUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isExpiredAccessTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isUnauthorizedError<TApiError<typeof UnauthorizedCauseSchema>>(error) &&
    error.response?.data.data?.cause === UNAUTHORIZED_CAUSE.ACCESS_TOKEN.EXPIRED
  )
}

export function isInValidAccessTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isUnauthorizedError<TApiError<typeof UnauthorizedCauseSchema>>(error) &&
    error.response?.data.data?.cause === UNAUTHORIZED_CAUSE.ACCESS_TOKEN.INVALID
  )
}

export function isInValidRefreshTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isUnauthorizedError<TApiError<typeof UnauthorizedCauseSchema>>(error) &&
    error.response?.data.data?.cause === UNAUTHORIZED_CAUSE.REFRESH_TOKEN.INVALID
  )
}

export function isExpiredRefreshTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isUnauthorizedError<TApiError<typeof UnauthorizedCauseSchema>>(error) &&
    error.response?.data.data?.cause === UNAUTHORIZED_CAUSE.REFRESH_TOKEN.EXPIRED
  )
}

export const handleApiEntityError = <TFieldValues extends FieldValues>({
  error,
  setError
}: {
  error: unknown
  setError?: UseFormSetError<TFieldValues>
}) => {
  if (isUnprocessableEntityError<TApiError<typeof EntityErrorSchema>>(error) && setError) {
    const entityErrorData = error.response?.data.data
    if (entityErrorData?.errors) {
      entityErrorData.errors.forEach((item) => {
        setError(item.field as Path<TFieldValues>, {
          type: 'unprocessableEntity',
          message: item.message
        })
      })
    }
  }
}
