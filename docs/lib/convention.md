# Client 코드 컨벤션

```js
// 우선 사용하는 라이브러리를 최상단에 가져오기 ex) axios
import axios from 'axios';

// 공통적으로 사용되는 클래스 또는 함수 가져오기 ex) Component, timeFormant, userSchema
import { Component } from '../common';

// 컴포넌트에서 사용되는 하위 컴포넌트 가져오기..
import { Child_component1, Child_component2 } from '../components';

// 클래스에서는 가능하다면 해당 컴포넌트 파일에서 전역(컴포넌트) 사용은 회피한다.
class component extends Component {
  // 클래스필드에서 사용되는 상태가 아니라 각 컴포넌트가 렌더링될 때마다 초기화 해줘야할 값
  init_value = 8;

  // DOMString 반환
  async render() {
    // 권한 여부를 확인하려면
    const { data: accessUser } = await axios.get('/api/accessUser');

    const child_component1 = new Child_Component1({ accessUser }).render();

    const child_component2 = new Child_Component2().render();

    return `
      ${child_component1}
      ${child_component2}
    `;
  }

  // 서버로부터 데이터가 필요하다면?
  async fetchPosts() {
    const { data } = await axios.post('/api/posts', payload);
    return data;
  }

  // 상태를 변경 시키는 함수라면?
  setSth(e) {
    this.setState(newState);
  }

  scrollEvent(e) {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

    if (clientHeight + scrollTop >= scrollHeight - 1) {
      this.pageSize += 6;
      this.setState();
    }
  }

  // 컴포넌트에 필요한 이벤트가 있다면
  addEventListener() {
    return [{ type, selector, handler }];
  }
}

export default component;
```
