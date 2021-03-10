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
import { TableComponent } from "../components/table-component";
import { UserEntityEnum } from "./edit-user";

export const HomeView = function() {
    const { isLoading, state, deleteCharacter, prevPage, nextPage, page }= useCharacters()
    
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

    const fields = [
        {
            label: 'Name',
            field: UserEntityEnum.NAME
        },
        {
            label: 'Species',
            field: UserEntityEnum.SPECIES
        },
        {
            label: 'Status',
            breakPoint: true,
            field: UserEntityEnum.STATUS
        },
        {
            field: UserEntityEnum.GENDER,
            label: 'Gender',
            breakPoint: true
        },
        {
            field: 'actions',
            customValue: (character: IRawCharacter) => <>
                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200">
                    <Link to={ "/user/" + character.id}>
                        <Icon icon={editIcon}/>
                    </Link>
                </button>
                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200 focus:bg-gray-200" onClick={() => deleteAction(character)} >
                    <Icon icon={deleteIcon}/>
                </button>
                <button className="mx-1 shadow p-1 rounded hover:bg-gray-200 focus:bg-gray-200" onClick={() => showInfoAction(character)}>
                    <Icon icon={unfoldIcon}/>
                </button>
            </>,
            label: <>
                <button onClick={prevPage} className="mx-1 shadow p-1 rounded hover:bg-gray-200"> <Icon icon={arrowLeft}/> </button>
                <button onClick={nextPage} className="mx-1 shadow p-1 rounded hover:bg-gray-200"> <Icon icon={arrowRight}/> </button>
                <p className="flex flex-col font-light text-sm">
                    <span>count: { state.length } </span>
                    <span>page: { page } </span>
                </p>
            </>
        },
    ]
    return <>
        <DeleteModal isOpen={deleteToggle} onSubmit={submitAction} onClose={() => setDeleteToggle(false)}/>
        { infoToggle && <InfoModal onClose={() => setInfoToggle(false)} state={rowSelected as IRawCharacter}/> }
        <div className="flex flex-col h-full w-screen max-w-screen-md mx-auto">
            <h1 className="font-light my-5 ml-2 text-2xl">Characters</h1>
        { 
            isLoading ?
                <p>loading...</p> : 
                <TableComponent fields={fields} rows={state}/>
        } 
        </div>
    </>
}
