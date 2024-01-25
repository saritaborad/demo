import RouteMain from "./RouteMain";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
 return (
  <div className="App">
   <AuthContextProvider>
    <RouteMain />
   </AuthContextProvider>
  </div>
 );
}

export default App;
