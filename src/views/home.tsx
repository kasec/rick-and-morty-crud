import React, { useState } from "react"
import { Icon } from '@iconify/react';
import editIcon from "@iconify/icons-mdi/edit-outline";
import deleteIcon from "@iconify/icons-mdi/delete-outline";
import unfoldIcon from "@iconify/icons-mdi/unfold-more-horizontal";
import arrowLeft from "@iconify/icons-mdi/arrow-left";
import arrowRight from "@iconify/icons-mdi/arrow-right";
import { useCharacters } from "../store/characters-slice/useCharacters";
import { DeleteModal } from "../components/delete-modal";
import { Link } from "react-router-dom";
import { InfoModal } from "../components/info-modal";
import { IRawCharacter } from "../types/IRawCharacter";

export const HomeView = function() {
    const { isLoading, state, deleteCharacter, prevPage, nextPage }= useCharacters()
    
    const [deleteToggle, setDeleteToggle] = useState(false)
    const [infoToggle, setInfoToggle] = useState(false)
    
    const [rowSelected, setRowSelected] = useState<IRawCharacter| undefined>(undefined)
    
    let submitAction = () => {
        deleteCharacter((rowSelected as IRawCharacter)?.id)
    }

    const deleteAction = (character: IRawCharacter) => {
        setDeleteToggle(true)
        setRowSelected(character)
    }

    const showInfoAction = (character: IRawCharacter) => {
        setInfoToggle(true)
        setRowSelected(character)
    }

    return <>
    <DeleteModal isOpen={deleteToggle} onSubmit={submitAction} onClose={() => setDeleteToggle(false)}/>
    { infoToggle && <InfoModal onClose={() => setInfoToggle(false)} state={rowSelected as IRawCharacter}/> }
      <div className="flex flex-col h-4/5 w-screen max-w-screen-md mx-auto">
        <h1 className="font-light my-5 ml-2 text-2xl">Characters</h1>
        <div className="flex-grow overflow-auto">
            <table className="relative w-full border">
                <thead>
                    <tr>
                        <th className="sticky top-0 px-6 py-3 text-gray-900 bg-gray-300">Name</th>
                        <th className="sticky top-0 px-6 py-3 text-gray-900 bg-gray-300">Species</th>
                        <th className="hidden sm:table-cell sticky top-0 px-6 py-3 text-gray-900 bg-gray-300">Status</th>
                        <th className="hidden sm:table-cell sticky top-0 px-6 py-3 text-gray-900 bg-gray-300">Gender</th>
                        <th className="sticky top-0 px-6 py-3 text-gray-900 bg-gray-300">
                            <button onClick={prevPage} className="mx-1 shadow p-1 rounded hover:bg-gray-200"> <Icon icon={arrowLeft}/> </button>
                            <button onClick={nextPage} className="mx-1 shadow p-1 rounded hover:bg-gray-200"> <Icon icon={arrowRight}/> </button>
                            count: { state.length }
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y bg-gray-100">
                    {
                        isLoading ?
                        <p>loading ...</p> :  
                        state.map((character: IRawCharacter, index: number) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-center">{ character.name }</td>
                            <td className="px-6 py-4 text-center">{ character.species }</td>
                            <td className="hidden sm:table-cell px-6 py-4 text-center">{ character.status }</td>
                            <td className="hidden sm:table-cell px-6 py-4 text-center">{ character.gender }</td>
                            <td className="px-6 py-4 text-center">
                                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200">
                                    <Link to={ "/user/" + character.id}>
                                        <Icon icon={editIcon}/>
                                    </Link>
                                </button>
                                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200" onClick={() => deleteAction(character)} >
                                    <Icon icon={deleteIcon}/>
                                </button>
                                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200" onClick={() => showInfoAction(character)}>
                                    <Icon icon={unfoldIcon}/>
                                </button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    </>
}
