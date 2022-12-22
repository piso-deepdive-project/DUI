# Posts 컴포넌트

- Main 페이지의 하위 컴포넌트로 props로 fetchPosts, currentpostType, setPostType을 전달 받는다.
- fetchPosts는 서버에게 posts 요청하고 받은 데이터를 반환한다.(posts는 유저가 작성한 모든 게시글을 담은 배열이다)
- currentpostType은 현재 postCard의 style이 리스트인지 그리드인지 알려준다.
- setPostType은 state를 변경하는 이벤트 핸들러이다.

- posts.map을 사용하여 하위 컴포넌트인 PostCard를 새로 생성한다.
- posttype의 아이콘을 클릭시 해당 타입으로 postCard의 스타일을 변경한다.
