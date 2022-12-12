import Main from './pages/Main';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Edit from './pages/Edit';
import Post from './pages/Post';

class App {
  render() {
    const mainPage = new Main().render();
    const signin = new Signin().render();
    const signup = new Signup().render();
    const edit = new Edit().render();
    const post = new Post().render();

    return `
    ${post}
    `;
  }
}

export default App;
