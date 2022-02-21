import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import CanvasBoard from "./components/CanvasBoard";


const App = () => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Container maxW="container.lg" centerContent>
                    <Heading as="h1" size="xl">SNAKE GAME</Heading>
                    <CanvasBoard height = { 600 } width = { 1000 } />
                </Container>
            </ChakraProvider>
        </Provider>
    );
};

export default App;