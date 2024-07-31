// App.jsx

import profilePic from '../assets/me-pixelicious (2).png';
import { Header, View, Footer } from '../components/shared/index';

const App = () => {
  return (
    <div className="App">
      <Header profilePic={profilePic}></Header>
      <View></View>
      <Footer></Footer>
    </div>
  );
};

export default App;
