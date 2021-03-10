import {
    deleteCharacter,
    updateCharacter,
    setInitialCharacters,
    characters as initialCharacters,
  } from './state';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { fetchJSONData } from '../../utils/fetch-json-data';
import { timeDelay } from '../../utils/time-delay';
import { IRawCharacter } from '../../types/IRawCharacter';
import { IResponse } from '../../types/IResponse';

export const useCharacters = () => {
    const characters: IRawCharacter[] = useSelector(initialCharacters);
    const dispatch = useDispatch();
    
    const [info, setInfo] = useState({})
    const [isLoading, setLoading] = useState({})
    
    const setInitialCharactersDispatch = (dto: Array<IRawCharacter>) => {
        if(!! Array.isArray(dto) === false) throw '[results] prop must be a array'

        dispatch(setInitialCharacters(dto))
    }

    /**
     * @description this method will be delete a row specified with id if it exists. 
     * @param id 
     */
    const deleteCharacterDispatch = (id: number) => {
        dispatch(deleteCharacter(id))
    }
    const updateCharacterDispatch = (character: IRawCharacter) => {
        dispatch(updateCharacter(character))
    }
    const settingData = (response: IResponse<IRawCharacter[]>) => {
        setInitialCharactersDispatch(response?.results)
        setInfo(response?.info || {})
        setLoading(false)
    }
    
    const catchingError = (err?: Error) => {
        setLoading(false)
        console.error("Catching error method =>", err);
    }

    useEffect(() => {
        // below statement avoid refetch when run the hook in another view component and use the chached characters.
        if(!! characters.length === true) return setLoading(false)

        fetchJSONData('https://rickandmortyapi.com/api/character').then(settingData).catch(catchingError)
    }, [])

    const findByID = (id: number) => {
        return characters.find((item: IRawCharacter) => item.id === id)
    }

    return {
        state: characters,
        updateCharacter: updateCharacterDispatch,
        deleteCharacter: deleteCharacterDispatch,
        /**
         * @description this function will fetch the next page of rick and morty api.
         */
        nextPage: () => { setLoading(true); timeDelay(400).then(() => nextPage(info, settingData, catchingError)) },
        /**
         * @description this function will fetch the prev page of rick and morty api.
         */
        prevPage: () => { setLoading(true); timeDelay(400).then(() => prevPage(info, settingData, catchingError)) },
        isLoading,
        findByID
    }
}

type ISettingData = (response: IResponse<IRawCharacter[]>) =>  void
type ICatchingError = (err?: Error) => void

const nextPage = function(info: Record<string, any>, settingData: ISettingData, catchingError: ICatchingError) {
    const { next } = info
    
    if(!! next === false) return catchingError()

    fetchJSONData(next).then(settingData).catch(catchingError)
}

const prevPage = function(info: Record<string, any>, settingData: ISettingData, catchingError: ICatchingError) {
    const { prev } = info
    
    if(!! prev === false) return catchingError()

    fetchJSONData(prev).then(settingData).catch(catchingError)
}