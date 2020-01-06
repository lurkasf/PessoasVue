import { http } from './config'

export default{

    listar:() => {
        return http.get('pessoas')
    },

    salvar:(pessoa) =>{
        return http.post('pessoa',pessoa)
    },

    atualizar:(pessoa) =>{
        return http.put('pessoa', pessoa)
    },

    apagar:(pessoa) =>{
        return http.delete('pessoa', { data:pessoa })
    }
}