export const COLLABORATOR_STATUS: Record<
  string,
  {
    label: string
    color: string
  }
> = {
  pending: { label: 'pending', color: 'primary' },
  active: { label: 'active', color: 'success' }
} as const
