import React from 'react'
import { IRawCharacter } from '../../types/IRawCharacter'
import { IFields, TableHead } from './table-head'

export const TableComponent = function TableComponent({ fields, rows }: { rows: IRawCharacter[], fields: IFields[] }) {
    return (
        <div className="flex-grow overflow-auto">
            <table className="relative w-full border">
                <TableHead fields={fields}/>
                <tbody className="divide-y bg-gray-100">
                    {
                    rows.map((character: IRawCharacter, index: number) => (
                        <tr key={index}>
                            {
                                fields.map(({field, breakPoint, customValue}) => (
                                    <td key={field} className={"px-6 py-4 text-center" + (breakPoint ? ' hidden sm:table-cell' : '')}>{ customValue ?  customValue(character) : character[field] }</td>
                                ))
                                
                            }
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}