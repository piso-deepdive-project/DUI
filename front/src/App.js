import {
  Main, //
  SignIn,
  SignUp,
  Edit,
  Post,
} from './pages';

class App {
  render() {
    const mainPage = new Main().render();
    const signin = new SignIn().render();
    const signup = new SignUp().render();
    const edit = new Edit().render();
    const post = new Post().render();

    return `
      ${mainPage}
    `;
  }
}

export default App;
