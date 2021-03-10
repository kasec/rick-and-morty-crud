import { Icon } from "@iconify/react"
import closeIcon from "@iconify/icons-mdi/close";

import React, { useEffect, useState } from "react"

interface IModalFormProps {
  onClose?: () => void,
  onSubmit: () => void,
  isOpen: boolean
}

export const ConfirmModal = ({ onClose, onSubmit, isOpen }: IModalFormProps) => {
    const [ _isOpen, setIsOpen ] = useState(true)
    
    useEffect(() => { setIsOpen(isOpen) }, [isOpen])

    const _onClose = () => {
      onClose?.()
      setIsOpen(false)
    }

    const _onSubmit = () => {
      onSubmit()
      _onClose()
    }
    
    return _isOpen ?
      <section className="z-50 h-screen absolute inset-0 bg-gray-800 bg-opacity-80 flex flex-col items-center">
      <div className="w-full max-w-screen-sm bg-gray-300 p-2 mx-auto my-auto border rounded border-gray-700">
        <div className="flex justify-end mb-5">
          <button onClick={_onClose} className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 shadow">
            <Icon icon={closeIcon} color="white"/>
          </button>
        </div>
        <nav className="px-5 flex flex-col sm:flex-row justify-between mb-5 items-center">
          <p className="text-xl mr-2">Press ok if you want to update this row.</p>
          <div>
            <button className="hover:bg-yellow-700 px-3 py-2 bg-yellow-600 rounded text-white font-medium shadow mx-1" onClick={_onClose}>cancel</button>
            <button className="px-3 py-2 bg-green-700 hover:bg-green-800 rounded font-medium shadow mx-1 text-white" onClick={_onSubmit}>ok</button>
          </div>
        </nav>
      </div>
    </section> : <></>
  }
  