import { render } from './common';
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
  { path: '/post', component: Post },
];

const findComponent = pathname => routes.find(({ path }) => path === pathname).component;

class App {
  state = {
    posts: [
      {
        id: 0,
        title: 'TEST POST TITLE',
        author: { id: 'test123@gmail.com', pwd: 'utzazz12!!', author: 'Uta' },
        tags: [],
        date: new Date('2022-10-08'),
      },
    ],
  };

  render() {
    const RenderComponet = findComponent(window.location.pathname);
    const page = new RenderComponet().render();
    const post = new Post({ ...this.state }).render();

    return `
      ${post}
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

window.addEventListener('popstate', () => {
  console.log('[popstate]', window.location.pathname);
  render();
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});

export default App;
