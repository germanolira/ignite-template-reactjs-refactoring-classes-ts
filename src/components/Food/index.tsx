import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface IFood { // Tipando o código com interface, pegando todos os dados da API
  id:number;
  name:string;
  description:string;
  price:string;
  available:boolean;
  image:string;
}

interface FoodProps {// Aqui tipamos FoodProps com interface para passar como parametros
  food: IFood; // Dentro da função Food, que recebe a tipagem de FoodProps
  handleEditFood: (food:IFood) => void
  handleDelete: (id:number) => void
}

export default function Food({food, handleEditFood, handleDelete}: FoodProps) {
  const { available } = food;
  const [isAvailable, setIsAvailable] = useState(available) // Aqui setamos o estamos ao inves de
  // this.state, com TSX usamos useState para isso, criando duas variaveis

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable, // O operador logico (!) NÃO (Logical NOT)
    }); // Ele é um valor de negação, que inverte o valor original passado

    setIsAvailable(!isAvailable); // Define para NÃO
  }

  const setEditingFood = () => {
    handleEditFood(food); // Ainda tenho que saber o que faz
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}