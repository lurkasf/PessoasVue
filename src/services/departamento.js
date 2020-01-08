import { http } from './config'

export default{

    listar:() => {
        return http.get('departamentos')
    },

    salvar:(departamento) =>{
        return http.post('departamento',departamento)
    },

    atualizar:(departamento) =>{
        return http.put('departamento', departamento)
    },

    apagar:(departamento) =>{
        return http.delete('departamento', { data:departamento })
    }
}