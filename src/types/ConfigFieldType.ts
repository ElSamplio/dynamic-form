export type ConfigFieldType = {
    id: number,
    type: string,
    name: string,
    options?: SelectOption[]
}

export type SelectOption = {
    name: string,
    value: number,
}