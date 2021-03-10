import {
    deleteCharacter,
    updateCharacter,
    setInitialCharacters,
    characters as initialCharacters,
    page as initialPage,
    info as initialInfo,
    setInitialPage,
    setInitialInfo
  } from './state';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { fetchJSONData } from '../../utils/fetch-json-data';
import { timeDelay } from '../../utils/time-delay';
import { IRawCharacter } from '../../types/IRawCharacter';
import { IResponse } from '../../types/IResponse';

interface IInfo {
    count: number,
    pages: number,
    next?: string,
    prev?: string
}

export const useCharacters = () => {
    const characters: IRawCharacter[] = useSelector(initialCharacters);
    const page: number = useSelector(initialPage);
    const info: IInfo = useSelector(initialInfo);
    const dispatch = useDispatch();
    
    const [isLoading, setLoading] = useState(false)
    
    const setInitialPageDispatch = (page: number) => {
        if(!! page === false) return

        dispatch(setInitialPage(page))
    } 
    const setInitialInfoDispatch = (info: IInfo) => {
        dispatch(setInitialInfo(info))
    } 
    useEffect(() => {
        console.log({ info });
        
        if(!! info?.prev === false) return setInitialPageDispatch(1)

        const { searchParams } = new URL(info?.prev as string)

        const prevPage = searchParams.get('page')

        const currentPage = +(prevPage || 0) + 1

        setInitialPageDispatch(currentPage)
    }, [info])

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
        setInitialInfoDispatch(response?.info as IInfo)
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

    const findCharacterByID = (id: number) => {
        const character = characters.find(character => character.id === id)
        
        if(!! character === true) return Promise.resolve(character)
        
        return fetchJSONData('https://rickandmortyapi.com/api/character/' + id).catch(catchingError)
    }

    return {
        page,
        isLoading,
        findCharacterByID,
        state: characters,
        updateCharacter: updateCharacterDispatch,
        deleteCharacter: deleteCharacterDispatch,
        /**
         * @description this function will fetch the next page of rick and morty api.
         */
        nextPage: () => { setLoading(true); timeDelay(400).then(() => nextPage(info as IInfo, settingData, catchingError)) },
        /**
         * @description this function will fetch the prev page of rick and morty api.
         */
        prevPage: () => { setLoading(true); timeDelay(400).then(() => prevPage(info as IInfo, settingData, catchingError)) },
    }
}

type ISettingData = (response: IResponse<IRawCharacter[]>) =>  void
type ICatchingError = (err?: Error) => void

const nextPage = function(info: IInfo, settingData: ISettingData, catchingError: ICatchingError) {
    const { next } = info
    
    if(!! next === false) return catchingError(new Error('Next url does not exist, is not error at all'))

    fetchJSONData(next as string).then(settingData).catch(catchingError)
}

const prevPage = function(info: IInfo, settingData: ISettingData, catchingError: ICatchingError) {
    const { prev } = info
    
    if(!! prev === false) return catchingError(new Error('Prev url does not exist, is not error at all'))

    fetchJSONData(prev as string).then(settingData).catch(catchingError)
}