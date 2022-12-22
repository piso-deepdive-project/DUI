import { NotFound } from '../pages';

let _routes;
/**
 * route 객체({path: string, component: Function})들로 이루어진 routes 배열을 전달받아
 * route 객체에서 window.location.pathname와 매핑하는 route 객체를 추출하기 위한 정규표현식인 matcher를 추가한다.
 */
const generateMatchers = routes => {
  _routes = routes.map(route => {
    /**
     * 정규표현식인 matcher는 window.location.pathname과 매핑하는 route.path를 갖는 route 객체를 검색하기 위해 사용된다.
     * @example
     * '/' => /^\/$/
     * '/books' => /^\/books$/
     * '/books/:id' => /^\/books\/(?<id>[^\/]+)$/
     * '/books/:id1/:id2' => /^\/books\/(?<id1>[^\/]+)\/(?<id2>[^\/]+)$/
     * '/foo/:id1/bar/:id2' => /^\/foo\/(?<id1>[^\/]+)\/bar\/(?<id2>[^\/]+)$/
     */
    const matcher = new RegExp(
      `^${route.path.replace(
        /:(\w+)/g,
        (_, paramName) =>
          /**
           * 정규식 캡쳐 그룹에 paramName을 이름으로 지정한다.
           * @see named-group https://javascript.info/regexp-groups#named-groups
           */
          `(?<${paramName}>[^\\/]+)`
      )}$`
    );

    return { ...route, matcher };
  });
};

// prettier-ignore
const findComponent = () => _routes.find(({ matcher }) => matcher.test(window.location.pathname))?.component ?? NotFound;

export { generateMatchers, findComponent };
