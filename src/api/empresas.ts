/* eslint-disable @typescript-eslint/no-unused-vars */

const api_url= process.env.NEXT_PUBLIC_API_URL;

export const loadListAllLeads = async()=>{
    const url = api_url+'/empresas'

    const options={
        method:'GET'
    }
    try {
        
        const response = await fetch(url, options)
        const data = await response.json()
       
        if(data.success) return data.info
        return [];

    } catch (error) {
        console.warn('ocorreu um erro ao carregar lista de leads', error)
        throw new Error('ocorreu um erro ao carregar lista de leads')
    }
}

export const getListContactsOfLeads = async(desc:string, cidade:string)=>{
    const url = api_url+`/empresas/${desc}/${cidade}`

    const options={
        method:'GET'
    }
    try {
        
        const response = await fetch(url, options)
        const data = await response.json()
       
        if(data.success) return data.info
        return [];

    } catch (error) {
        console.warn('ocorreu um erro ao carregar lista de leads', error)
        throw new Error('ocorreu um erro ao carregar lista de leads')
    }
}