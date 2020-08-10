import React from 'react'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'
import './styles.css'

interface PageHeaderProps{
  title: string;
  description?: string; // ? = opicional
}
/** 
 * Componente PageHeader
 * Esse componente é FunctionComponent do React
 * E ele tem as propriedades PageHeaderProps
 * No caso um titulo que é uma string
 * Isso para poder aproveitar o header igual nas paginas e trocar somente o title
 */
const PageHeader: React.FunctionComponent <PageHeaderProps> = (props)=>{
  return (
    <header className="page-header">
    <div className="top-bar-container">
      <Link to="/">
        <img src={backIcon} alt="Voltar" />
      </Link>
      <img src={logoImg} alt="Proffy" />
    </div>
    <div className="header-content">
      <strong>{props.title}</strong>
      {props.description && <p>{props.description}</p>}
      {props.children}
    </div>
      
  </header>
  );
}

export default PageHeader

// EM js a segunda propriedade quando há ocorrencia de um && so sera
//executada se a primeira for true
//props.description && <p>{props.description}</p>