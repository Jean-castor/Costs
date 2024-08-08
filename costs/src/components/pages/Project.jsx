import {parse, v4 as uuidv4} from 'uuid'


import styles from './Project.module.css';


import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// importação dos componentes

import Message from '../../layout/Message';
import Loading from '../../layout/Loading';
import Container from '../../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard'

 
const Project = () => {
    const {id} = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setshowProjectForm ] = useState(false);
    const [showServiceForm, setshowServiceForm ] = useState(false);
    const [message, setMessage] = useState();
    //tipo da mensagem a baixo;
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers:{
               'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
          .then((data) => {
            setProject(data);

            setServices(data.services);

          })
          .catch((err) => console.log(err))
        }, 3000)
    }, [id]);

    function editPost(project) {
            setMessage('')
      
               // budget validation
              // caso o valor do projeto seja menor que o custo 
           if(project.budget < project.cost){
              setMessage('O orçamento não pode ser menor que o custo do projeto!');
              setType('error');

              return false  //este return para a mensagem de erro.
            }
        
          fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', /*Altera de forma parcial algum recurso, neste caso está alterando recursos do banco de dados */
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(project), /*projeto sendo enviado como texto */
          })
            .then(resp => resp.json())
            .then((data) =>{       //O projeto que já está no banco
               setProject(data);   // recebe as atualizações 
               setshowProjectForm(false);
               setMessage('Projeto atualizado!');
               setType('success');
            })
            .catch(err => console.log(err))
    }

    function createService(project) {
      setMessage('')

      // last service
      const lastService = project.services[project.services.length - 1]

      lastService.id = uuidv4();

      const lastServiceCost = lastService.cost

      const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

      // maximum value validation;

      if(newCost > parseFloat(project.budget)){
          setMessage('Orçamento ultrapassado, verifique o valor do serviço');
          setType('error');
          project.services.pop();
          return false;
      };

      // add service cost to project total cost;

      project.cost = newCost;

      //update project
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify( project )
      }).then(( resp ) => resp.json())
      .then(( data ) => {
        // show services
        setshowServiceForm( false );
      })
      .catch(err => console.log( err ))

    }

    function removeService( id, cost ) {

      const servicesUpdated = project.services.filter(
        ( service ) => service.id !== id
      )

      const projectUpdated = project

      projectUpdated.services = servicesUpdated
      projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

      fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify( projectUpdated )
      }).then(( resp ) => resp.json())
        .then(( data ) => {
         setProject( projectUpdated )
         setServices( servicesUpdated );
         setMessage( 'Serviço removido!' );
         setType( 'success' );
      })
      .catch(err => console.log( err ))
    }


    function toggleProjectForm(){
        setshowProjectForm(! showProjectForm);
    }

    
    function toggleServiceForm(){
      setshowServiceForm(! showServiceForm );
  }

    return (
     <> 
       {project.name ? (
          <div className={styles.project_details}>
            <Container customClass="column">

                 {/* condicional de menssagem a baixo */}
              {message && <Message type={type} msg={message}/>}
              <div className={styles.details_container}>

                <div className={styles.title_project}>
                    <h1>Projeto: {project.name}</h1>
                </div>
                <button className={styles.btn} onClick={toggleProjectForm}>
                    {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                </button>
                {!showProjectForm ? (
                    <div className={styles.project_info} >
                        <p> <span>Categoria:</span> {project.category.name}     </p>
                        <p> <span>Total de orçamento:</span> R${project.budget} </p>
                        <p> <span>Total utilizado:</span> R${project.cost}      </p>
                    </div>
                 ) : (
                    <div className={styles.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText={"Concluir edição"} projectData={project}/>
                    </div>
                )}
              </div>
              <div className={styles.srvice_form_container}>
                 <h2>Adicione um serviço</h2>
                 <button className={styles.btn} onClick={toggleServiceForm}>
                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                 </button>
                 <div className={styles.project_info}>
                    {showServiceForm &&  
                      <ServiceForm 
                        handleSubmit = { createService }
                        btnText = "Adicionar serviço"
                        projectData = {project}
                      /> 
                    }
                 </div>
              </div>
              <h2>Serviços</h2>
              <Container customClass="start">
                {services.length > 0 && 
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))
                }

                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
              </Container>
            </Container>
          </div>
        ) : (
          <Loading/>
        )} 
     </>
    )
};

export default Project
