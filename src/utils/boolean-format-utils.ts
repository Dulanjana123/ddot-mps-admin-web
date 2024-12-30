export const formatBoolResponse = (value?: boolean | null): string => {
    if (!value) return '-'

    return value ? 'Yes' : 'No'
}