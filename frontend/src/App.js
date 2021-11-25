import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";

function App() {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
