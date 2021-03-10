import React, { JSXElementConstructor, ReactNode } from "react";
import { IRawCharacter } from "../../types/IRawCharacter";

export interface IFields {
    label: string | ReactNode,
    breakPoint?: boolean,
    field: string,
    customValue?: (character: IRawCharacter) => string | ReactNode
}

export const TableHead = ({ fields }: { fields: IFields[] }) => {
    return (
    <thead>
        <tr>
            {
                fields.map((field: Record<string, any>, index: number) => (
                    <th key={index} className={"sticky top-0 px-6 py-3 text-gray-900 bg-gray-300" + (field.breakPoint ? ' hidden sm:table-cell' : '') }>{ field.label }</th>
                ))
            }
        </tr>
    </thead>

    )
}
