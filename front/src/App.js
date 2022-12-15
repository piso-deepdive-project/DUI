import { Component, render } from './common';
import { createRoutes, findComponent } from './route';
import {
  Main, //
  SignIn,
  SignUp,
  Edit,
  Post,
} from './pages';

const routes = [
  { path: '/', component: Main },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/edit', component: Edit },
  { path: '/edit/:id', component: Edit },
  { path: '/post/:id', component: Post },
];
createRoutes(routes);

class App extends Component {
  currentComponet = null;

  ComponentInstance = null;

  /**
   * 동일한 page Component가 호출되는 경우 새로운 Instance를 생성해 state가 변경되지 않도록 currentComponet와 그 ComponentInstacne를 기억
   * 만약 다른 page Component가 호출되는 경우 currentComponent를 변경하고 새로운 ComponentInstance 생성
   */
  async render() {
    const RenderComponet = findComponent();
    if (this.currentComponet !== RenderComponet) {
      this.currentComponet = RenderComponet;
      this.ComponentInstance = new RenderComponet();
    }

    const page = await this.ComponentInstance.render();

    return `
      ${page}
    `;
  }
}

window.addEventListener('click', e => {
  if (!e.target.matches('a')) return;
  e.preventDefault();
  const path = e.target.getAttribute('href');
  // 현재 페이지와 이동할 페이지가 같으면 이동하지 않는다.
  if (window.location.pathname === path) return;

  // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
  window.history.pushState(null, null, path);
  render();
});

window.addEventListener('click', e => {
  if (!e.target.closest('.route')) return;

  e.preventDefault();
  const path = e.target.closest('.route').dataset.route;
  // 현재 페이지와 이동할 페이지가 같으면 이동하지 않는다.
  if (window.location.pathname === path) return;

  // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
  window.history.pushState(null, null, path);
  render();
});

window.addEventListener('popstate', () => {
  console.log('[popstate]', window.location.pathname);
  render();
});

export default App;
