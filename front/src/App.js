import axios from 'axios';
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
  { path: '/post/:id', component: Post },
];
createRoutes(routes);

class App extends Component {
  render() {
    let page;
    const RenderComponet = findComponent();
    if (RenderComponet === Main) {
      page = new Main({ ...this.state }).render();
    }

    if (RenderComponet === Post) {
      page = new Post({ ...this.state, deletePost: this.deletePost.bind(this) }).render();
    }

    if (RenderComponet === Edit) {
      page = new Edit().render();
    }

    if (RenderComponet === SignIn) {
      page = new SignIn().render();
    }

    if (RenderComponet === SignUp) {
      page = new SignUp().render();
    }

    return `
      ${page}
    `;
  }

  async fetchPosts() {
    const { data: posts } = await axios.get('/posts');

    this.setState({ posts });
  }

  deletePost(e) {
    const id = +e.target.closest('article').id;
    const posts = this.state.posts.filter(post => post.id !== id);
    axios.delete(`/post/${id}`);
    this.setState({ posts });
  }

  addEventListener() {
    return [{ type: 'DOMContentLoaded', selector: 'window', handler: this.fetchPosts.bind(this) }];
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
