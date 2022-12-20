function SignInAPI(server, jwt, getUser) {
  server.post('/api/signin', (req, res) => {
    const { id, pwd } = req.body;

    if (!pwd) return res.status(401).send({ err: '비밀번호를 입력하지 않았습니다.' });
    if (!id) return res.status(401).send({ err: 'id를 입력하지 않았습니다.' });

    const user = getUser({ id, pwd });

    if (!user) return res.status(401).send({ err: '등록되지 않은 사용자입니다.' });

    const accessToken = jwt.sign({ id, name: user.name }, process.env.JWT_SECRET_KEY, {
      // 한 시간뒤에 만료 시켜줘
      expiresIn: '50000',
    });

    // xss 예방 차원 서버에서만 설정가능
    // 스니핑(패킷 훔치기)은 예방 못함
    res.cookie('accessToken', accessToken, {
      // 밀리세컨드에 의해 만료시간 설정하기
      maxAge: 1000 * 60 * 60 * 24, // 1d
      // flag cookie
      httpOnly: true,
    });

    res.send({ id });
  });

  server.get('/api/signout', (req, res) => {
    res.clearCookie('accessToken');
    res.send('logout');
  });
}

module.exports = {
  SignInAPI,
};
