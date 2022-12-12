import {
  Main, //
  Signin,
  Signup,
  Edit,
  Post,
} from './pages';

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
