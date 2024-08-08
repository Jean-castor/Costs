

//RESPONSÁVEL PELAS INFORMAÇÕES DO PROJETO;
//NOME;
//ORÇAMENTO;
//CATEGORIA;
//BOTÃO PARA CRIAR O PROJETO;
// btnText passa do componente aqui;

import {useEffect, useState} from 'react'

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit,btnText, projectData}){

        // recebe as infos do formulário, caso não esteja recebendo, retorna um obj vazio;
    const [categories, setCategories] = useState([]); 
    const [project, setProject] = useState(projectData || {});

    useEffect(() =>{
        // EM CASO DE ERRO, VERIFICAR O ENDEREÇO DE URL 
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers:{ 'Content-Type': 'application/json'},
    })
    .then((resp) => resp.json()) // pega os dados no local host e transforma em json;
    .then((data) => { 
        setCategories(data); // os dados pegos em json vão para o hook em setCategories.
    })
      .catch(err => console.log(err));
    },[]) // valor inicial de opções vazias;


    // EXECUÇÃO DO MÉTODO DA PROP == HANDLESUBMIT;
    //E PASSA O PROJETO CADASTRADO COMO ARGUMENTO;
    const submit = (e) => {
        e.preventDefault();
        //console.log(project)
        handleSubmit(project);
    };


     // MUDA O NOME DO PROJETO DE ACORDO COM OQUE É RECEBIDO NO INPUT;
     //CRIAÇÃO DO NOVO PROJETO COM RESPECTIVOS INPUTS;
    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    };

    // criação de objeto da categoria COM O ID DELA E O NOME
    // IDEAL PARA TRABALHAR COM MONGODB

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value, 
            name: e.target.options[e.target.selectedIndex].text
        }})
    };
    return (
        <form onSubmit={submit} className={styles.form}>
            < Input
                type="text"
                text="Nome do projeto:"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            < Input
                type="number"
                text="Orçamento do projeto:"
                name="budget"
                placeholder="Insira o orçamento do total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}  // valor recebido preenchido/ vazio
            />
            <Select name="category_id" text="Selecione a categoria"
             options={categories}  handleOnChange={handleCategory}
             value={project.category ? project.category.id : ''}
             />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;