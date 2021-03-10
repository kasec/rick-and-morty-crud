import { Icon } from "@iconify/react"
import closeIcon from "@iconify/icons-mdi/close";

import React from "react"
import { IRawCharacter } from "../types/IRawCharacter";

interface IModalFormProps {
    onClose: () => void,
    state: IRawCharacter
}

export const InfoModal = ({ onClose, state }: IModalFormProps) => {
    return <section className="z-50 absolute inset-0 bg-gray-800 bg-opacity-80 flex flex-col">
    <div className="w-full max-w-screen-sm bg-gray-200 p-2 mx-auto my-auto border rounded border-gray-700">
      <div className="flex justify-end mb-5">
        <button onClick={onClose} className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 shadow">
          <Icon icon={closeIcon} color="white"/>
        </button>
      </div>
      <nav className="px-5 flex flex-col sm:flex-row justify-between mb-5 items-center">
        <p className="text-xl mr-2">Character Information</p>
      </nav>
      <dl className="px-5 mb-3">
        <dt className="font-medium">Name</dt>
        <dd className=" font-light">{ state?.name }</dd>
        <dt className="font-medium">Species</dt>
        <dd className=" font-light">{ state?.species }</dd>
        <dt className="font-medium">Gender</dt>
        <dd className=" font-light">{ state?.gender }</dd>
        <dt className="font-medium">Origin</dt>
        <dd className=" font-light">{ state?.origin?.name }</dd>
        <dt className="font-medium">Location</dt>
        <dd className=" font-light">{ state?.location?.name }</dd>
        <dt className="font-medium">Status</dt>
        <dd className=" font-light">{ state?.status }</dd>
      </dl>
    </div>
  </section>
  }
  