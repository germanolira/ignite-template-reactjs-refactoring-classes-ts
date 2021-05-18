import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';
import Logo from '../../assets/logo.svg';

interface handleOpenModal { // Basicamente tipo o openModal vindo de onClick
  openModal: () => void; // Ao ínves de retornar any, deve retornar void no lugar
}

export default function Header({openModal}: handleOpenModal) {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}