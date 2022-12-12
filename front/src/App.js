import Main from './pages/main';

class App {
  render() {
    const mainPage = new Main().render();

    return `
    ${mainPage}
    `;
  }
}

export default App;
