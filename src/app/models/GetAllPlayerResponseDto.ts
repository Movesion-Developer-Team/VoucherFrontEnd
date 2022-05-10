export interface GetAllPlayerResponseDto{
    message: string,
    players: PlayerBodyDto[]
}


export interface PlayerBodyDto {
    id: number;
    shortName: string
    fullName: string
    categoryId:number
    playStoreLink: string
    appStoreLink: string
    linkDescription: string
    color: string
}