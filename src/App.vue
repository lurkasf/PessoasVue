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
    <!-- Div com todo o bagulho das pessoas -->
    <div v-if="showpessoas">

      <div class="container">

        <ul>
          <li v-for="(erro, index) of errors" :key="index">
            Erro em: <b>{{ erro.field }}</b> - <b style="color:#e00000">{{erro.defaultMessage}}</b>
          </li>
        </ul>

        <form @submit.prevent="salvarPessoa">

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
                <button @click="editarPessoa(pessoa)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
                <button @click="removerPessoa(pessoa)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
              </td>

            </tr>

          </tbody>
        
        </table>

      </div>
    </div>
    <!-- Div com todo o bagulho dos produtos -->
    <div v-if="showprodutos">

      <div class="container">

        <ul>
          <li v-for="(erro, index) of errors" :key="index">
            Erro em: <b>{{ erro.field }}</b> - <b style="color:#e00000">{{erro.defaultMessage}}</b>
          </li>
        </ul>

        <form @submit.prevent="salvarProduto">

            <label>Nome</label>
            <input type="text" placeholder="Nome" v-model="produto.nome">
            <label>Categoria</label>
            <input type="text" placeholder="Nome" v-model="produto.categoria">
            <label>Quantidade</label>
            <input type="number" placeholder="CPF" v-model="produto.quantidade">
            <label>Preço Compra</label>
            <input type="number" placeholder="Salario" v-model="produto.precocompra">
            <label>Preço Venda</label>
            <input type="number" placeholder="Salario" v-model="produto.precovenda">


            <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

        </form>

        <table>

          <thead>

            <tr>
              <th>NOME</th>
              <th>CATEGORIA</th>
              <th>QUANTIDADE</th>
              <th>PREÇO COMPRA</th>
              <th>PREÇO VENDA</th>
            </tr>

          </thead>

          <tbody>

            <tr v-for="produto of produtos" :key="produto.id">

              <td>{{produto.nome}}</td>
              <td>{{produto.categoria}}</td>
              <td>{{produto.precocompra}}</td>
              <td>{{produto.precovenda}}</td>
              <td>
                <button @click="editarProduto(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
                <button @click="removerProduto(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
              </td>

            </tr>

          </tbody>
        
        </table>

      </div>
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
        produtos:[],
        errors:[],
        showpessoas: true,
        showprodutos: true,
        showdepartamentos: true,
      }
    },

    mounted(){
      this.BuscarPessoas()
      this.BuscarProdutos()
    },
    methods:{

      /////// metodos para pessoas
      BuscarPessoas(){
        Pessoa.listar().then(resposta =>{
          this.pessoas = resposta.data
        })
      },
      salvarPessoa(){

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
      editarPessoa(pessoa){
        this.pessoa = pessoa
      },

      removerPessoa(pessoa){

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

      /////// metodos para produtos
      BuscarProdutos(){
        Produto.listar().then(resposta =>{
          this.produto = resposta.data
        })
      },
      salvarProduto(){

        if(!this.produto.id){
          Produto.salvar(this.produto).then(resposta =>{
            this.produto = {}
            alert('Salvo!')
            this.BuscarProdutos()
            this.errors = []
            console.log(resposta)
          }).catch(e =>{
            this.errors = e.response.data.errors
          })
        }else{
          Produto.atualizar(this.produto).then(resposta =>{
            this.produto = {}
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
      editarProduto(produto){
        this.produto = produto
      },

      removerProduto(produto){

        if(confirm('Deseja apagar esta pessoa?')){
          Produto.apagar(produto).then(resposta => {
          
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
          this.showprodutos=false
          this.showpessoas=false
          this.showdepartamentos=true
        })
      },
      MostrarProd(){
        Produto.listar().then(resposta =>{
          this.produto = resposta.data
          this.titulo = 'Produtos'
          this.showpessoas=false
          this.showdepartamentos=false
          this.showprodutos=true
        })
      },
      MostrarPess(){
        Pessoa.listar().then(resposta =>{
          this.produto = resposta.data
          this.titulo = 'Pessoas'
          this.showprodutos=false
          this.showdepartamentos=false
          this.showpessoas=true
        })
      },
    


    }
  }
</script>