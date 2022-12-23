# API

- /api/... 은 RESTful API를 데이터 요청
- /sth sth 페이지로 이동을 의미

## POSTS

### GET /api/posts

> 곧 삭제 예정, 수정할 필요가 있다. 이는 POST요청으로 그냥 하면된다.

- 메인 페이지에서 필요한 첫 글 목록을 요청합니다.

### POST /api/posts

- 글 목록을 요청합니다. payload로는 마지막 글 아이디와 글의 개수를 지정하여 요청합니다.

#### payload

```js
{
  id, // 마지막 POST ID
  pageSize, // 로드할 POST 개수
}
```

</br>

## POST/:id

### GET /api/post/:id

- 수정 또는 삭제 가능여부를 검사
- 파라미터로 전달받은 postId의 글와 수정 또는 삭제 가능여부를 전송한다.

### DELETE /api/post/:id

- 권한이 있다면
- 파라미터로 전달받은 postId의 글을 삭제한다.

</br>

## POST

### POST /api/post

- payload로 새로운 post의 정보를 받아 작성자의 정보를 추가하여 posts 저장소에 저장한다.

#### payload

```js
{
  title: '',// 글의 제목
  date: '',// 작성자 이름
  content: '',// 글 내용
  tags:[] ,// 태그
  comments:[] ,// 댓글
}
```

### PATCH /api/post/

- 권한이 있다면
- payload로 수정된 post의 정보를 받아 작성자의 정보를 수정하여 posts 저장소에 저장한다.

#### payload

```js
{
  id: 0 ,// 글의 id
  title: '',// 글의 제목
  date: '',// 작성자 이름
  content: '',// 글 내용
  tags:[] ,// 태그
  comments:[] ,// 댓글
}
```

</br>

## LIKE

### GET /api/like

- 권한이 있다면
- 토큰에 저장된 정보로 좋아요한 글의 목록을 요청한다.

### POST /api/like

- 권한이 있다면
- payload로 전달받은 postId의 글을 좋아요한 글의 목록에 추가한다.

</br>

## USER

### POST /api/signin

- id와 pwd를 payload로 요청을 보낸다.
- 가입한 이력이 있는 id와 pwd라면 토큰을 발행하여
- 쿠키에 저장한다.

#### payload

```js
{
  id:'' ,// id 이메일
  pwd:, '' // 비밀번호;
}
```

### POST /api/signup

- 가입에 필요한 정보를 payload로 요청을 보낸다.
- users 저장소에 저장한다.

#### payload

```js
{
  id,// 이메일
  name,// 이름
  pwd,// 비밀번호
  posts,// 작성한 글
  likes,// 좋아요
}
```

### GET /api/signout

- 쿠키에 발행된 토큰을 clear한다.

### POST /api/isuniqueid

- 쿠키에 발행된 토큰을 clear한다.

#### payload

- 아이디의 중복여부를 응답한다.

```js
{
  id;
}
```

</br>

## ETC

### GET /api/accessUser

- 토큰이 발행중인지 확인

### GET /api/comment

- 새로운 댓글 등록하기
