# 무한 스크롤을 통한 pagination 구현

## Scroll event vs InterSection Observer

- 무한 스크롤을 위해 scroll event 또는 intersection observer를 선택할 수 있었다. intersection observer가 성능적으로 더 우월하기에 intersection observer를 이용하려 했는데 문제가 존재했다.
- intersection observer를 이용하기 위해선 observe할 target이 존재해야 했지만 우리가 만든 App은 하위 컴포넌트들이 만들어내는 domString을 모아 한번에 render 시키기 때문에, 첫 rendering시 target을 지정할 방법이 존재하지 않았다.
- 이를 해결하기 위해 data를 받아 rendering을 하기 전에 initial rendering을 하는 방법이 존재했지만 추가적인 작업이 필요했기에 scroll event를 이용하기로 했다.

## 무한스크롤 구현

- scroll event의 `clientHeight, scrollTop, scrollHeight`를 이용해 스크롤의 위치가 바닥에 닿을 때 마다 추가적인 post를 불러오도록 했다.
- 이때 불러올 post의 갯수 조정을 위해 Main Component에 postSize라는 property를 만들어 관리를 해주었다.
- scrollevent가 발생할때마다 postSize를 변경하고, setState() 호출을 통해 서버로부터 새로운 post들을 받아 render하게끔 해주었다.

  ```js
    scrollEvent(e) {
      const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

      if (clientHeight + scrollTop >= scrollHeight - 1) {
        this.pageSize += 6;
        this.setState();
      }
    }

  ```
