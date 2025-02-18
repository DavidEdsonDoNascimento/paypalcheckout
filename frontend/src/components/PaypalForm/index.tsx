import { Button } from '../Button';

export const PaypalForm = () => {
	return (
		<>
			<div>
				<h3>Dados de entrega</h3>
				<input type='text' placeholder='Nome' />
				<input type='text' placeholder='Sobrenome' />
				<input type='text' placeholder='Casa | Apto | complemento (opcional)' />
				<input type='text' placeholder='Cidade' />
				<input type='text' placeholder='Estado' />
				<input type='text' placeholder='Código postal' />
				<input type='text' placeholder='Pais' />
				<input type='text' placeholder='Cód. Pais' />
				<input type='text' placeholder='Telefone' />
			</div>

			<div>
				<h3>Dados de Pagamento</h3>
				<input type='text' placeholder='Nome no cartão' />
				<input type='text' placeholder='Número do cartão' />
				<input type='text' placeholder='Expiração (Mês/Ano)' />
				<input type='text' placeholder='CVV' />
			</div>

			<Button>Confirmar compra</Button>
		</>
	);
};
