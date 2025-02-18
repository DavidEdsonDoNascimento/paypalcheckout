import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components';
export const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<Router />
			</ThemeProvider>
		</BrowserRouter>
	);
};
