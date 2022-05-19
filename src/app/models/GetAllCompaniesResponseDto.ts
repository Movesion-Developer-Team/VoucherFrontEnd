


export interface GetAllCompaniesResponseDto{
        message: string,
        companies: CompanyBodyDto[]
}


export interface CompanyBodyDto {
        id: number;
        name: string;
        address: string;
        numberOfEmployees: number;
      
    }




   