import { http } from './config'

export default{

    listar:() => {
        return http.get('produtos')
    },

    salvar:(produto) =>{
        return http.post('produto',produto)
    },

    atualizar:(produtos) =>{
        return http.put('produto', produtos)
    },

    apagar:(produto) =>{
        return http.delete('produto', { data:produto })
    }
}