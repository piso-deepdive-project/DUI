# SPA & Routing

- SPA에서 Routing을 구현하는 방법에는 여러가지가 존재한다.

  - Link

    > 링크 방식은 link tag로 동작하는 기본적인 웹페이지의 동작 방식으로 페이지마다 고유의 URL이 존재하므로 history 관리 및 SEO 대응에 아무런 문제가 없지만 요청마다 중복된 리소스를 응답받아야 하며 전체 페이지를 다시 렌더링하는 과정에서 새로고침이 발생하여 사용성이 좋지 않은 단점이 존재한다.

  - AJAX

    > Ajax 방식은 불필요한 리소스의 중복 요청을 방지하고, 페이지 전체를 리렌더링할 필요없이 갱신이 필요한 일부만 갱신하면 되므로 빠른 퍼포먼스와 부드러운 화면 표시 효과를 기대할 수 있어 새로고침이 없는 보다 향상된 사용자 경험을 구현할 수 있다는 장점이 있다. 하지만 history 관리가 불가능하고 SEO 이슈가 발생하는 단점이 존재한다.

  - Hash

    > Hash 방식은 URI의 fragment identifier(#service)의 고유 기능인 앵커(anchor)를 사용한다. 내비게이션이 클릭되면 hash가 추가된 URI가 주소창에 표시된다. 단, URL이 동일한 상태에서 hash만 변경되면 브라우저는 서버에 어떠한 요청도 하지 않는다. 즉, URL의 hash는 변경되어도 서버에 새로운 요청을 보내지 않으며 따라서 페이지가 갱신되지 않는다. hash 방식은 서버에 새로운 요청을 보내지 않으며 따라서 페이지가 갱신되지 않지만 페이지마다 고유의 논리적 URL이 존재하므로 history 관리에 아무런 문제가 없다. 하지만 url에 불필요한 #이 들어가고 여전히 SEO 이슈가 발생하는 단점이 존재한다.

  - PJAX

    > PJAX란 pushState + ajax의 줄임말로 HTML5의 History API인 pushState와 popstate 이벤트를 사용한 방식이다. pushState 메서드는 주소창의 URL을 변경하고 URL을 history entry로 추가하지만 서버로 HTTP 요청을 하지는 않으므로 페이지가 갱신되지 않는다. 하지만 페이지마다 고유의 URL이 존재하므로 history 관리에 아무런 문제가 없다. 또한 hash를 사용하지 않으므로 SEO에도 문제가 없다.

- 이번 프로젝트에서는 구현 난이도가 다소 복잡하지만 장점이 많은 PJAX 방식을 선택해 Routing을 구현하기로 결정했다.

## Path - Component 매칭

- PJAX 방식에서는 실질적인 페이지 이동이 일어나는 것이 아니라 URL마다 페이지 컴포넌트를 그려주는 방식이므로 어떤 PATH에서 어떤 페이지를 그려야 하는지 정해주어야 했다.

- 이번 프로젝트에서는 6개의 페이지 컴포넌트가 필요하다 생각했고 다음과 같이 선언적으로 path와 그에따른 component를 매칭한 routes 배열을 만들었다.

  ```js
  const routes = [
    { path: '/', component: Main },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/edit', component: Edit },
    { path: '/edit/:id', component: Edit },
    { path: '/post/:id', component: Post },
    { path: '/*', component: NotFound },
  ];
  ```

## Matcher 생성 및 페이지 찾기

- path를 선언적으로 적어주었기 때문에 window.location.pathname을 path로 삼았을때 바로 어떤 컴포넌트를 그려야하는지 찾을수 없었다.

- 이를 해결하기 위해 각 path가 포함되었는지 확인할 수 있도록 각 path에 해당하는 matcher(정규식)를 만들고 pathname을 인수로 전달받아 어떤 컴포넌트를 그려야 하는지 알려주는 함수를 만들어주었다.

  ```js
  let _routes;

  const generateMatchers = routes => {
    _routes = routes.map(route => {
      const matcher = new RegExp(`^${route.path.replace(/:(\w+)/g, (_, paramName) => `(?<${paramName}>[^\\/]+)`)}$`);

      return { ...route, matcher };
    });
  };

  const findComponent = () =>
    _routes.find(({ matcher }) => matcher.test(window.location.pathname))?.component ?? NotFound;
  ```

- 이후 App이 render 될 때 `findComponent()`를 호출해 path에 맞는 컴포넌트를 그릴 수 있도록 해 주었다.

## 이벤트 달아주기

- 렌더링이 일어날 때 window.location.pathname을 읽어 그려야 할 페이지를 알기 때문에 페이지 이동을 위해 url을 변경해주어야 했다.

- 이를 위해 페이지 이동을 일어나게 하는 요소에 route라는 클래스와 data-route에 이동할 path를 주었고 클릭이 일어났을 때 pushState를 통해 url을 바꿀 수 있도록 해 주었다.

  ```js
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
  ```

- 또한 popstate 이벤트를 이용해 뒤로가기 기능도 구현해 주었다.

  ```js
  window.addEventListener('popstate', () => {
    render();
  });
  ```
