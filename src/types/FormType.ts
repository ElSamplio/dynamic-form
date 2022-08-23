import { ConfigFieldType } from "./ConfigFieldType"
import { DataType } from "./DataType"

export type FormType = {
    fieldConfig: ConfigFieldType,
    fieldValue: DataType,
}