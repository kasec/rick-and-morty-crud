export interface IResponse<StateType> {
    info: {
        [key:string]: any
    },
    results: StateType
}