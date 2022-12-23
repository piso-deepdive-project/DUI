# MainNav

- MainNav 컴포넌트는 여러 페이지 컴포넌트의 하위 컴포넌트로, 상단에 그려지는 header 및 navaigation의 역할을 하는 컴포넌트이다.

- MainNav 컴포넌트는 항상 보여지는 NavList 컴포넌트와 토글되는 사이드 메뉴에 대한 NavMenu 컴포넌트로 구성된다.

- 로그인한 유저와 비로그인 유저마다 다른 기능을 해야하므로 유저가 로그인 했는지를 하위 컴포넌트에 props로 전달한다.

- 사이드 메뉴를 토글하기 위한 openMenu와 closeMenu handler를 만들어 하위 컴포넌트로 전달한다..

![mainNav2](../assets/components/mainNav.png)
