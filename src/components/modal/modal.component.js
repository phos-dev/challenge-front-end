import React from 'react';
import { ReactComponent as CloseIcon }  from '../../assets/close_icon.svg';
import { capitalize, formatDate, formatAddress } from '../../functions.utils';
import './modal.styles.scss';

const CustomModal = ({ data, onClose }) => {
  const { 
    name, 
    picture, 
    id, 
    gender,
    nat,
    dob : { age, date },
    phone,
    email,
    location
  } = data;

  return (
    <div className="customModal">
      <img alt="selectedUserPicture" src={picture.large}/>
      <CloseIcon className="closeIcon" onClick={onClose}/>
      <span>{`${name.title} ${name.first} ${name.last}`}</span>
      <div className="personalInfo">
        <span className="title">Informações Pessoais</span>
        {
          id.value
          ?
          <span>{`${id.name}: ${id.value}`}</span>
          :
          <span>{`O usuário não pussui identificação.`}</span>
        }
        <span>{`Nacionalidade: ${nat}`}</span> 
        <span>{`Gênero: ${capitalize(gender)}`}</span> 
        <span>{`Data de nascimento: ${formatDate(date)}`}</span> 
        <span>{`Endereço: ${formatAddress(location)}`}</span> 
        <span className="title">Contato</span>
        <span>{`Email: ${email}`}</span>
        <span>{`Telefone: ${phone}`}</span>
      </div>
    </div>
  )
}
/*
Imagem - check
Nome completo - check

Informação Pessoal:
{
  "street": {"number":7488,"name":"Nowlin Rd"},
  "city":"Bunbury",
  "state":"Tasmania",
  "country":"Australia",
  "postcode":6241

  ID (Número de identificação)
  Gênero
  Data de nascimento
  Nacionalidade
  Endereço
Contato:
  Email
  Telefone
*/
export default CustomModal;