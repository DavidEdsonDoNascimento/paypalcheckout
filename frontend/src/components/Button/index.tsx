import { ButtonContainer } from './styles';

type ButtonProps = {
  children: any;
}
export const Button = (props: ButtonProps) => {
  return (
    <ButtonContainer>
    {props.children}
    </ButtonContainer>
  )
}