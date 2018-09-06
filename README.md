## 텀블벅 알람
- 선착순 마감된 프로젝트에 빈 자리(취소자)가 생기면 알려주는 기능
  - 텀블벅 펀딩해야 하는데 이미 다 마감 웬말이냐 ㅜㅜ
  - 아직 3주 정도 남았으니까 취소자를 노려보자! 

# 지금 잘 모르는 것
- 실시간 모니터링?
  - 크롤링 실시간으로 해야하는지?
    - 계속 요청 보내면 서버에 부담되지 않을까;;
    - 근데 실시간 아니면 효용 떨어지는게 빈 자리 생겼을 때 바로 신청해야 한단 말이지 ㅋㅋㅋ
      - 1시간 전에 빈 자리 있었어, 근데 지금은 모르겠네? 같은 기능이면 만드는 의미 없음
  - 이전 내역 굳이 db에 저장할 필요는 없을 것 같다..? 
  - HTML element class => 빌드 도구 사용한 듯  
- serverless? 
  - 서버 유지비 비싸요 ㅜㅜ 
  - 필요할 때만 실행되고, 그걸로 과금
    - 근데 이건 알람 보내줄 때 얘기고, 모니터링은 해당 없는 듯

# 진행 내용
- [PubNub](https://www.pubnub.com/blog/build-a-cryptocurrency-price-tracker-in-5-minutes/)라는걸 찾아봤다. 실시간으로 Cryptocurrency 가격 변경 확인할 수 있는 기능 만드는 것 같았음
  - 근데 내용 보니까 업데이트는 10초마다 해주고, 업데이트 될 때 데이터는 결국 API 땡겨오는거
    - 뭔가 서버리스로 function 호출하는 것보다 편한게 있을 줄 알고 기대했는데 역시 쨔자잔 되는 건 없는 것 같다 (눈물)
    - 그래도 데이터를 가져오려면 API를 만들어야 하나 라는 생각을 해볼 수 있게 되었음

- 클라이언트? 
  - 만든 기능 호출할 애가 있어야 하는데, 나는 웹 사이트 만들게 아니니까 봇으로 노티 받는게 사용성이 제일 편할 것 같다. 
    - 카톡 챗봇
      - 튜토리얼 : https://cheese10yun.github.io/kakao-bot-node/
        - 옐로 아이디 사용
        - 만드는데 심사 필요, 제낀다. 
    - Telegram은 내가 잘 안 쓰고, 역시 슬랙을 써야겠다 (튜토리얼 많고, 파는거 쉬움)
- HTML Element
  - `<div class=class="RewardCard__RewardCardInner-ibjars-1 cEqFlc"">` 이게 후원 상태 카드
    - `<div class="RewardCard__RewardHeader-ibjars-2 iwEBnW"">` 여기에 몇 명 선택 / 선착순 마감 내용 있음
      
      - `<span class="RewardCard__PledgeAmount-ibjars-3 etxsCe">` 30명이 선택
      - `<sapn class="RewardCard__RewardQuantityLimit-ibjars-4 fGxdGR">`
        - `<span class="RewardCard__SoldoutLabel-ibjars-6 ktzKui">` 여기에 선착순 마감 
          - 선착순 마감 아닐 때는 -개 남음
            - `<span class="RewardCard__LimitedRewardLabel-ibjars-5 jJjTiD">`
  - span의 class `SoldoutLabel`이 `LimitedRewardLabel`로 바뀔 때 알람을 보내주면 될 것 같다
    - 근데 내가 원하는 옵션의 리워드만 해당 알림이 필요한거니까, 몇 번째 RewardCard의 span class가 바뀌었는지도 알 수 있어야 함 
      - 정규식, 배열(옵션 해당하는 키워드 저장)+filter 사용..? 

- 모니터링 어떻게 하지?
  - 데이터를 가져오는 애(크롤링), 모니터링 하는 애, 노티 뿌려주는 애(슬랙 봇) 이렇게 3파트를 만들면 될 것 같다. 
  - 봇은 heroku로 배포
  - 모니터링은 DB에 데이터 저장할 필요 없으니까
    - (=이전 내역과 비교할 필요 없음, 현재 상태가 조건에 해당하는지만 파악하면 됨)
    - 시작/종료 interval로 만들어도 되지 않을까?
      - 테스트 : app/test/test.html

- 슬랙 봇 튜토리얼 따라하기
  - https://youtu.be/nyyXTIL3Hkw
    - 유튜브 튜토리얼 보고 만들었다. 생각보다 어렵지 않다
    - 튜토리얼 이외에 아래 내용 적용
      - dotenv(환경변수 설정), nodemon(서버 자동 재시작), heroku(배포)
    
