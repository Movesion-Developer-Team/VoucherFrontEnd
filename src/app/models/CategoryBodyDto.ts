
export interface CategoryMainResponseDto
{
    message: string;
    statusCode: number;
    category: CategoryBodyDto | undefined;
}

export interface CategoryBodyDto {
    id: number;
    name: string;
    description: string;
}
