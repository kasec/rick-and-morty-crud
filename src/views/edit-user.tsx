import React, { useEffect, useState } from "react"
import { useCharacters } from "../store/characters-slice/useCharacters";
import { useHistory, useParams } from "react-router-dom";
import { ConfirmModal } from "../components/confirm-modal";
import { ICharacterEntity } from "../types/ICharacterEntity";
import { IRawCharacter } from "../types/IRawCharacter";

interface IUserParams { id: string }

enum UserEntityEnum {
  ID = 'id',
  NAME = 'name',
  GENDER = 'gender',
  SPECIES = 'species',
  ORIGIN = 'origin',
  LOCATION = 'location',
  STATUS = 'status'
}

const mapToEdit = (character: IRawCharacter) => {
  return {
    [UserEntityEnum.ID]: character.id,
    [UserEntityEnum.NAME]: character.name,
    [UserEntityEnum.GENDER]: character.gender,
    [UserEntityEnum.SPECIES]: character.species,
    [UserEntityEnum.ORIGIN]: character?.origin?.name,
    [UserEntityEnum.LOCATION]: character?.location?.name,
    [UserEntityEnum.STATUS]: character.status,
  }
}

const mapToSave = (character: Partial<ICharacterEntity>) => {
  return {
    id: character.id,
    name: character.name,
    gender: character.gender,
    species: character.species,
    origin: { name: character.origin },
    location: { name: character.location },
    status: character.status,
  }
}

export const EditUserView = function() {
    const { id } = useParams<IUserParams>();
    const history = useHistory()
    const initialForm: Partial<ICharacterEntity> = {
      id: 0,
      name: '',
      gender: '',
      species: '',
      origin: '',
      location: '',
      status: ''
    }
    const [isOpen, setIsOpen] = useState(false)

    const [formData, setFormData] = useState<Partial<ICharacterEntity>>(initialForm)
    const { updateCharacter, findByID, state }= useCharacters()
    
    useEffect(() => {
      if(!! state.length === false) return

      const character = findByID(+id)
      
      if(!! character === false) throw "Id does not match with any character"

      setFormData(mapToEdit(character as IRawCharacter))

    }, [state])


    const onSubmitAction = () => {
      const newCharacter = mapToSave(formData)
      console.log({ formData });
      
      updateCharacter(newCharacter as IRawCharacter)
      setIsOpen(false)
      history.push("/");    }

    const changeValue = (field: UserEntityEnum) => (ev: any) => {
      setFormData(formData => ({
        ...formData,
        [field]: ev.target.value
      }))
    }

    return <>
      <ConfirmModal onClose={() => setIsOpen(false)} isOpen={isOpen} onSubmit={onSubmitAction}/>
      <section className="mt-5 relative">
        <div className="w-full max-w-screen-sm bg-gray-300 p-2 mx-auto my-auto border rounded border-gray-700">
          <nav className="px-5 flex flex-col sm:flex-row justify-between mb-5 items-center">
            <p className="text-xl mr-2">Edit Character</p>
          </nav>
          <form className="px-5">
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Name</legend>
              <input value={formData[UserEntityEnum.NAME]} onChange={changeValue(UserEntityEnum.NAME)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Gender</legend>
              <input value={formData[UserEntityEnum.GENDER]} onChange={changeValue(UserEntityEnum.GENDER)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Status</legend>
              <input value={formData[UserEntityEnum.STATUS]} onChange={changeValue(UserEntityEnum.STATUS)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Origin</legend>
              <input value={formData[UserEntityEnum.ORIGIN]} onChange={changeValue(UserEntityEnum.ORIGIN)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Location</legend>
              <input value={formData[UserEntityEnum.LOCATION]} onChange={changeValue(UserEntityEnum.LOCATION)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
            <fieldset className="flex justify-between mb-5 border border-gray-600 rounded">
              <legend>Species</legend>
              <input value={formData[UserEntityEnum.SPECIES]} onChange={changeValue(UserEntityEnum.SPECIES)} className="mr-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"/>
            </fieldset>
          
          </form>
            <button onClick={() => setIsOpen(true)} className=" my-5 w-full bg-green-500 rounded px-3 py-2 text-white">Save Changes</button>
        </div>
      </section>
  </>
}