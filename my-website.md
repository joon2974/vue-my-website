# My web site with vue-nuxt


### 1. Project 구성
    1. npx의 create-nuxt-app 명령어를 사용하여 Nuxt 프로젝트 생성
        -> npx create-nuxt-app [Project-Name]
        -> 참고 URL: https://kdydesign.github.io/2019/04/10/nuxtjs-tutorial/
    2. UI framework인 vuetify를 vue add vuetify를 통해 추가해 주었음.
    3. 프로젝트는 게시판, Todo App, 채팅 앱의 3가지 기능을 제공
    4. npm run dev 명령어를 통해 실행 가능
        -> localhost:3000로 접속 가능
<hr/>

### 2. Project file 구조
    1. api 폴더
        - 게시판을 구현할 때, 게시판 내용을 받아오고 CRUD 기능을 수행하기 위해 
        api 서버가 필요하므로 express를 이용해 api서버 구축
        - nuxt.config.js를 수정하여 middleware로 api서버를 등록
            -> 참고 URL: https://fkkmemi.github.io/nuxt/nuxt-003-routing/
            
    2. MySQL-config.js
        - 게시판 구현에 사용할 DB 정보를 저장하고 있는 config파일
        - GCP의 SQL 인스턴스를 사용했으며 새로운 환경에서 접속할 때에는 ip주소를
        추가해주어야 한다. -> 향후 개선 필요
        - 접속 방법: mysql --host=[sql ip주소] --user=root --password
        - mysql --host=34.84.31.32 --user=root --password
        
    3. components 폴더
        - layouts나 pages에서 사용할 컴포넌트들을 정의하여 저장해 놓은 폴더
        
    4. layout 폴더
        - 이름 그대로 layout들을 저장하고 있는 폴더
        - 현재 project에서는 default.vue 한 개만을 사용하며 pages의 각 vue
        컴포넌트는 <nuxt /> 내부에 들어가게 된다.
        - 모든 화면에 동일하게 표시되는 title이나 메뉴를 나타내는 navigation bar
        등을 구현해 놓았으며 추후, 다른 layout이 필요할 경우 default.vue를 참고하여
        작성하기 바람.
        
    5. middleware 폴더
        - 로그인 인증 등에 사용할 수 있는 미들웨어를 구현하여 저장하는 폴더
        - 현재 auth.js가 저장되어 있으나 사용되지는 않으며, jwt등을 인증하려면
        github의 team_project 프로젝트를 참조하면 될 듯하다.
        
    6. pages 폴더
        - default.vue의 <nuxt /> 부분에 들어가는 부분으로써 각 페이지를 저장.
        - 실제로 사용하는 부분은 index(게시판), ChatLogin, Chat 3개이다.
        - 추후 로그인을 추가하거나 Todo App을 구현할 시 이곳에 추가하면 된다.
        
    7. plugins 폴더
        - socket.client.js가 저장되어 socket을 사용하기 위한 configuration을
        해주고 있다.
        - 참고 URL: https://stfalcon.com/en/blog/post/chat-app-creation-vue
        .js-nuxt.js-node.js-socket.io-vue-socket.io-vuetify.js-technolog
        - 굳이 plugin 사용하지 않고 다르게 할 수 도 있을듯...?
        
    8. server 폴더
        - 소켓 통신을 위한 서버를 구현해 놓은 코드가 위치해있음.
        - express, socket.io를 사용
        
    9. static 폴더
        - express 서버에서 정적 이미지나 자료를 제공할 때 해당 자료들을 저장하는 폴더
        
    10. store 폴더
        - Vuex에 해당하는 state, mutation등을 저장해 놓은 폴더
        
    11. utils 폴더
        - 소켓 통신에 사용하는 users, message.js 파일이 저장되어 있음
        - 재 사용성을 높임. 익숙해지려면 시간이 필요할 듯 함.
<hr/>

### 3. 작업사항(2020.01.28)
    1. default.vue의 v-content에 @click 옵션을 주어 바탕을 클릭 했을 시, 메뉴바가
    collapse 되게 처리함.
    
    2. user의 ID chip을 클릭하면 해당 room의 user 이름을 보이게 처리함.
    
    3. 채팅 UI 디자인 수정, Room 이름이 상단 왼쪽에 보이게 수정함.
    
    - 향후 개발 방향
        - 게시판 CRUD 구현
        - Todo App Vuex사용하여 직접 구현
        - 로그인 기능 추가..?
        -> jwt, navigation guard
<hr/>

### 4. 작업사항(2020.02.01)
    1. Todo App을 만들기 위해 TodoPage를 추가
    
    2. store에 todo용 Vuex 추가
    
    3. TodoInput, TodoComponent Component 추가
    
    - 문제점
        1. TodoInput에서 axios를 통해 서버로 변경 내용을 post하는 부분이 에러 발생
        -> post는 되지만 전달 object가 서버에 전달이 안됨!!
        
        2. TodoComponent가 화면에 나타나지 않음
<hr/>

### 5. 작업사항(2020.02.02)
    1. api 서버에서 axios의 post body값을 받지 못하는 문제 해결
        -> bodyparser를 사용하지 않았음...ㅠㅠ
        
        -> 최신 express는 body-parser모듈이 내장되어 있어
        -app.use('/boardData', require('./boardData'));
        -app.use('/todo', require('./todo')); 사용
        
    2. TodoComponent가 화면에 나타나지 않았던 것은 Vuex의 mapState문제였음
        -> Nuxt에서는 Store 폴더에서 모든 Vuex를 관리하는데, 최근 버전에서는 
        Store의 클래식 모드(export default로 시작하는)를 지원하지 않고
        모듈 모드만을 지원한다고 한다.
        
        -> 따라서 Store폴더의 todo.js를 모듈형 Vuex로 변환하였다.
        
        -> 이후 TodoPage에서 mapstate대신 computed 내에서 this.$store.todo.todoList
        와 같이 불러서 State를 사용하였다.
        
        -> mapMutation의 사용법도 조금은 다르니 참고할것!!!
        
        -> this.$store.commit('todo/undoTodo', this.todoInfo); 와 같이
        mutation 명을 호출할 때 앞에 store 이름을 붙임

 
