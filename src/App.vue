<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">{{titulo}}</a>
      </div>
      <button @click="MostrarDep()" class="waves-effect btn-small green darken-1">Departamentos</button> 
      <br>
      <button @click="MostrarProd()" class="waves-effect btn-small green darken-1">Produtos</button>
      <br>
      <button @click="MostrarPess()" class="waves-effect btn-small green darken-1">Pessoas</button>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          Erro em: <b>{{ erro.field }}</b> - <b style="color:#e00000">{{erro.defaultMessage}}</b>
        </li>
      </ul>

      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="pessoa.nome">
          <label>CPF</label>
          <input type="number" placeholder="CPF" v-model="pessoa.cpf">
          <label>Salario</label>
          <input type="number" placeholder="Salario" v-model="pessoa.salario">
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>SALARIO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="pessoa of pessoas" :key="pessoa.id">

            <td>{{pessoa.nome}}</td>
            <td>{{pessoa.cpf}}</td>
            <td>{{pessoa.salario}}</td>
            <td>
              <button @click="editar(pessoa)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(pessoa)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
  import Pessoa from './services/pessoas'
  import Departamento from './services/departamento'
  import Produto from './services/produto'

  export default{

    data(){
      return{
        
        titulo:'Pessoas',

        pessoa:{
          id:'',
          nome:'',
          cpf:'',
          salario:'',
        },
        //departamento
        departamento:{
          id:'',
          depnome:'',
        },
        //produto
        produto:{
          id:'',
          prodnome:'',
          precocompra:'',
          precovenda:'',
          categoria:'',
        },
        pessoas:[],
        errors:[] 
      }
    },

    mounted(){
      this.listar()
    },
    methods:{

      listar(){
        Pessoa.listar().then(resposta =>{
          this.pessoas = resposta.data
        })
      },
      salvar(){

        if(!this.pessoa.id){
          Pessoa.salvar(this.pessoa).then(resposta =>{
            this.pessoa = {}
            alert('Salvo!')
            this.listar()
            this.errors = []
            console.log(resposta)
          }).catch(e =>{
            this.errors = e.response.data.errors
          })
        }else{
          Pessoa.atualizar(this.pessoa).then(resposta =>{
            this.pessoa = {}
            alert('Atualizado!')
            this.listar()
            this.errors = []
            console.log(resposta)
          }).catch(e =>{
            console.log(e)
            //this.errors = e.response.data.errors
          })
        } 
      },
      editar(pessoa){
        this.pessoa = pessoa
      },

      remover(pessoa){

        if(confirm('Deseja apagar esta pessoa?')){
          Pessoa.apagar(pessoa).then(resposta => {
          
          this.listar()
          this.errors = []
          console.log(resposta)

          }).catch(e =>{
          console.log(e)
            //this.errors = e.response.data.errors
          })
        }
        
      },

      MostrarDep(){
        Departamento.listar().then(resposta =>{
          this.departamento = resposta.data
          this.titulo = 'Departamentos'
        })
      },
      MostrarProd(){
        Produto.listar().then(resposta =>{
          this.produto = resposta.data
          this.titulo = 'Produtos'
        })
      },
      MostrarPess(){
        Pessoa.listar().then(resposta =>{
          this.produto = resposta.data
          this.titulo = 'Pessoas'
        })
      }
    }
  }
</script>