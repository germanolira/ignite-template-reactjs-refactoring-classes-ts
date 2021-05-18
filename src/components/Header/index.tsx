import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';
import Logo from '../../assets/logo.svg';

interface handleOpenModal { // Basicamente tipo o openModal vindo de onClick
  openModal: any; // Ainda não olhei o que onClick passa, tentei passar como booleano
} // Mas não funcionou, então tipei como any porque não tem perigo de ele enviar outra coisa
// A não ser o que ele foi programado para ser

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