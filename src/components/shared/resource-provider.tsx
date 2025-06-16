import type React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

import { type TResources } from '~/shared/types/resources.type'

type ResourceContextType<T> = {
  resourceName: TResources
  selectedRecord: T | null
  setSelectedRecord: (record: T | null) => void
  selectedKeys: string[]
  setSelectedKeys: (keys: string[]) => void
  isDeleteManyModalOpen: boolean
  setIsDeleteManyModalOpen: (isOpen: boolean) => void
  isDeleteSingleModalOpen: boolean
  setIsDeleteSingleModalOpen: (isOpen: boolean) => void
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (isOpen: boolean) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (isOpen: boolean) => void
  isApproveManyModalOpen: boolean
  setIsApproveManyModalOpen: (isOpen: boolean) => void
  isBanManyModalOpen: boolean
  setIsBanManyModalOpen: (isOpen: boolean) => void
  isShowExportFilterModal: boolean
  setIsShowExportFilterModal: (isOpen: boolean) => void
  isCreateUserSuccessModalOpen: boolean
  setIsCreateUserSuccessModalOpen: (isOpen: boolean) => void
  createUserSuccesModalRes: T | null
  setCreateUserSuccessModalRes: (res: T | null) => void
  isCreateProjectSuccessModalOpen: boolean
  setIsCreateProjectSuccessModalOpen: (isOpen: boolean) => void
  createProjectSuccesModalRes: T | null
  setCreateProjectSuccessModalRes: (res: T | null) => void

  isImportExcelModalOpen: boolean
  setIsImportExcelModalOpen: (isOpen: boolean) => void
}

const resourceContextDefaultValue: ResourceContextType<unknown> = {
  resourceName: 'management-resources',
  selectedRecord: null,
  setSelectedRecord: () => {},
  selectedKeys: [],
  setSelectedKeys: () => {},
  isDeleteManyModalOpen: false,
  setIsDeleteManyModalOpen: () => {},
  isDeleteSingleModalOpen: false,
  setIsDeleteSingleModalOpen: () => {},
  isCreateModalOpen: false,
  setIsCreateModalOpen: () => {},
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  isApproveManyModalOpen: false,
  setIsApproveManyModalOpen: () => {},
  isBanManyModalOpen: false,
  setIsBanManyModalOpen: () => {},
  isShowExportFilterModal: false,
  setIsShowExportFilterModal: () => {},

  isCreateUserSuccessModalOpen: false,
  setIsCreateUserSuccessModalOpen: () => {},
  createUserSuccesModalRes: null,
  setCreateUserSuccessModalRes: () => {},

  isImportExcelModalOpen: false,
  setIsImportExcelModalOpen: () => {},

  isCreateProjectSuccessModalOpen: false,
  setIsCreateProjectSuccessModalOpen: () => {},
  createProjectSuccesModalRes: null,
  setCreateProjectSuccessModalRes: () => {}
}

const ResourceContext = createContext<ResourceContextType<unknown>>(resourceContextDefaultValue)

interface ResourceProviderProps<T> {
  resourceName: TResources
  children: React.ReactNode & { props: T }
}

export const ResourceProvider = <T,>({ resourceName, children }: ResourceProviderProps<T>) => {
  const [selectedRecord, setSelectedRecord] = useState<T | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isDeleteManyModalOpen, setIsDeleteManyModalOpen] = useState<boolean>(false)
  const [isDeleteSingleModalOpen, setIsDeleteSingleModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isApproveManyModalOpen, setIsApproveManyModalOpen] = useState<boolean>(false)
  const [isBanManyModalOpen, setIsBanManyModalOpen] = useState<boolean>(false)
  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState<boolean>(false)
  const [isShowExportFilterModal, setIsShowExportFilterModal] = useState<boolean>(false)
  const [isCreateUserSuccessModalOpen, setIsCreateUserSuccessModalOpen] = useState<boolean>(false)
  const [createUserSuccesModalRes, setCreateUserSuccessModalRes] = useState<T | null>(null)
  const [isCreateProjectSuccessModalOpen, setIsCreateProjectSuccessModalOpen] = useState<boolean>(false)
  const [createProjectSuccesModalRes, setCreateProjectSuccessModalRes] = useState<T | null>(null)

  const contextValue = useMemo(() => {
    return {
      selectedRecord,
      setSelectedRecord,
      selectedKeys,
      setSelectedKeys,
      resourceName,
      isCreateModalOpen,
      setIsCreateModalOpen,
      isDeleteManyModalOpen,
      setIsDeleteManyModalOpen,
      isDeleteSingleModalOpen,
      setIsDeleteSingleModalOpen,
      isEditModalOpen,
      setIsEditModalOpen,
      isApproveManyModalOpen,
      setIsApproveManyModalOpen,
      isBanManyModalOpen,
      setIsBanManyModalOpen,
      isShowExportFilterModal,
      setIsShowExportFilterModal,
      isCreateUserSuccessModalOpen,
      setIsCreateUserSuccessModalOpen,
      createUserSuccesModalRes,
      setCreateUserSuccessModalRes,
      isImportExcelModalOpen,
      setIsImportExcelModalOpen,
      isCreateProjectSuccessModalOpen,
      setIsCreateProjectSuccessModalOpen,
      createProjectSuccesModalRes,
      setCreateProjectSuccessModalRes
    }
  }, [
    selectedRecord,
    selectedKeys,
    resourceName,
    isCreateModalOpen,
    isDeleteManyModalOpen,
    isDeleteSingleModalOpen,
    isEditModalOpen,
    isApproveManyModalOpen,
    setIsApproveManyModalOpen,
    isBanManyModalOpen,
    setIsBanManyModalOpen,
    isShowExportFilterModal,
    isCreateUserSuccessModalOpen,
    setIsCreateUserSuccessModalOpen,
    createUserSuccesModalRes,
    setCreateUserSuccessModalRes,
    isImportExcelModalOpen,
    setIsImportExcelModalOpen,
    isCreateProjectSuccessModalOpen,
    setIsCreateProjectSuccessModalOpen,
    createProjectSuccesModalRes,
    setCreateProjectSuccessModalRes
  ])

  return (
    <ResourceContext.Provider value={contextValue as ResourceContextType<unknown>}>{children}</ResourceContext.Provider>
  )
}

export const useResourceContext = <T,>() => useContext(ResourceContext) as ResourceContextType<T>
