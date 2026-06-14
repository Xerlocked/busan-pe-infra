import type { CsSubject } from "./types";

export const csSubjects: CsSubject[] = [
  {
    id: "data-structures",
    name: "자료구조",
    icon: "📊",
    importance: 95,
    difficulty: 70,
    description:
      "배열, 연결 리스트, 트리, 그래프 등 데이터를 효율적으로 저장·탐색·조작하기 위한 구조를 학습합니다. 공기업 전산직 필기에서 가장 높은 빈도로 출제되며, 알고리즘 문제의 기초가 되는 핵심 과목입니다.",
    keyTopics: [
      "배열과 연결 리스트 (Array & Linked List)",
      "스택과 큐 (Stack & Queue)",
      "트리와 이진 탐색 트리 (Tree & BST)",
      "그래프 탐색 (BFS, DFS)",
      "해시 테이블 (Hash Table)",
      "힙과 우선순위 큐 (Heap & Priority Queue)",
    ],
    studyTips: [
      "STL 컨테이너(vector, map, set)를 직접 구현해 보면 내부 동작 원리를 깊이 이해할 수 있습니다.",
      "게임 개발에서 자주 사용하는 공간 분할 자료구조(QuadTree, Octree)를 함께 정리하면 면접에서 차별화됩니다.",
      "시간·공간 복잡도(Big-O)를 반드시 외우고, 각 자료구조별 연산 복잡도를 비교 정리하세요.",
      "기출문제에서 트리 순회(전위·중위·후위)와 그래프 탐색이 반복 출제되니 손으로 그려가며 연습하세요.",
    ],
    cppConnection:
      "C++ STL의 vector, list, map, unordered_map 등은 자료구조의 실제 구현체입니다. 게임 엔진에서 오브젝트 풀, 씬 그래프, 길찾기(A*) 등에 자료구조가 직접 활용되므로 실무 경험을 필기 답안에 녹여낼 수 있습니다.",
  },
  {
    id: "operating-systems",
    name: "운영체제",
    icon: "🖥️",
    importance: 90,
    difficulty: 80,
    description:
      "프로세스 관리, 메모리 관리, 파일 시스템 등 컴퓨터 자원을 효율적으로 관리하는 시스템 소프트웨어의 핵심 개념을 다룹니다. 난이도가 높지만 출제 비중이 크므로 반드시 정복해야 하는 과목입니다.",
    keyTopics: [
      "프로세스와 스레드 (Process & Thread)",
      "CPU 스케줄링 알고리즘 (FCFS, SJF, RR 등)",
      "교착상태 (Deadlock) 탐지·회피·예방",
      "가상 메모리와 페이지 교체 (LRU, FIFO, LFU)",
      "파일 시스템과 디스크 스케줄링",
      "동기화 기법 (Mutex, Semaphore, Monitor)",
    ],
    studyTips: [
      "멀티스레드 게임 루프를 구현해 본 경험을 프로세스/스레드 동기화 개념과 연결 지어 정리하세요.",
      "페이지 교체 알고리즘은 계산 문제가 자주 나오므로 손풀기 연습이 필수입니다.",
      "교착상태 4대 조건(상호배제·점유대기·비선점·순환대기)은 암기 필수, 은행원 알고리즘까지 이해하세요.",
      "리눅스 환경에서 top, ps, strace 등 명령어를 직접 써보면 개념이 체감됩니다.",
    ],
    cppConnection:
      "게임 엔진의 렌더링 스레드, 물리 시뮬레이션 스레드 분리와 동기화 경험은 OS의 프로세스/스레드 관리, 뮤텍스, 세마포어 개념과 직결됩니다. C++의 std::thread, std::mutex, std::condition_variable을 활용한 경험이 곧 OS 이론의 실전 적용입니다.",
  },
  {
    id: "database",
    name: "데이터베이스",
    icon: "🗄️",
    importance: 85,
    difficulty: 60,
    description:
      "관계형 데이터베이스의 설계, SQL 질의, 정규화, 트랜잭션 등을 학습합니다. 공기업 업무 시스템의 핵심인 만큼 실무와 밀접하게 연관되어 출제 빈도가 높은 과목입니다.",
    keyTopics: [
      "ER 모델과 관계형 모델 설계",
      "SQL (SELECT, JOIN, 서브쿼리, GROUP BY)",
      "정규화 (1NF ~ BCNF)",
      "트랜잭션과 ACID 속성",
      "인덱스와 질의 최적화",
      "동시성 제어와 회복 기법",
    ],
    studyTips: [
      "SQL 문제는 실제 DBMS에서 쿼리를 작성해 보며 익히는 것이 가장 효과적입니다.",
      "정규화 과정을 단계별로 예제와 함께 정리하고, 반정규화 사례도 알아두세요.",
      "SQLD 자격증 기출문제가 공기업 DB 필기와 겹치는 부분이 많으니 병행 학습을 추천합니다.",
      "트랜잭션 격리 수준(READ UNCOMMITTED~SERIALIZABLE)별 이상 현상을 표로 정리하세요.",
    ],
    cppConnection:
      "게임 서버에서 플레이어 데이터 저장, 랭킹 시스템, 인벤토리 관리 등에 DB가 필수적으로 사용됩니다. C++에서 MySQL Connector나 SQLite를 연동해 본 경험이 있다면 트랜잭션, 동시성 제어 개념을 실무 사례로 설명할 수 있습니다.",
  },
  {
    id: "network",
    name: "네트워크",
    icon: "🌐",
    importance: 80,
    difficulty: 65,
    description:
      "OSI 7계층, TCP/IP 프로토콜, 라우팅, 네트워크 보안 등 통신 기초를 학습합니다. 공기업 정보보호 직무와 연관이 깊고, 실무에서 시스템 간 연동 이해에 필수적인 과목입니다.",
    keyTopics: [
      "OSI 7계층과 TCP/IP 4계층 모델",
      "TCP vs UDP, 3-way / 4-way Handshake",
      "IP 주소 체계와 서브네팅",
      "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "HTTP/HTTPS와 DNS 동작 원리",
      "네트워크 보안 (방화벽, VPN, IDS/IPS)",
    ],
    studyTips: [
      "게임 서버 네트워크 프로그래밍(소켓, 패킷)을 해봤다면 TCP/UDP 개념을 체감으로 이해하기 쉽습니다.",
      "서브네팅 계산은 필기 시험 단골 문제이므로 빠르게 계산하는 연습을 반복하세요.",
      "Wireshark로 실제 패킷을 캡처해 보면 각 계층별 헤더 구조가 눈에 들어옵니다.",
      "HTTP 상태 코드(200, 301, 404, 500 등)와 REST API 개념은 면접에서도 자주 나옵니다.",
    ],
    cppConnection:
      "C++로 소켓 프로그래밍(Winsock, BSD Socket)이나 게임 서버 개발을 해봤다면 TCP/UDP의 차이, 패킷 직렬화, 논블로킹 I/O 등을 실전 경험으로 설명할 수 있습니다. 게임에서의 지연(Latency) 최적화 경험도 네트워크 이론과 직결됩니다.",
  },
  {
    id: "software-engineering",
    name: "소프트웨어공학",
    icon: "⚙️",
    importance: 75,
    difficulty: 50,
    description:
      "소프트웨어 개발 방법론, 설계 패턴, 테스팅, 프로젝트 관리 등을 다룹니다. 난이도는 상대적으로 낮지만 범위가 넓어 효율적인 암기 전략이 필요한 과목입니다.",
    keyTopics: [
      "소프트웨어 개발 생명주기 (폭포수, 애자일, 스크럼)",
      "UML 다이어그램 (클래스, 시퀀스, 유스케이스)",
      "디자인 패턴 (GoF: Singleton, Observer, Factory 등)",
      "테스트 기법 (블랙박스, 화이트박스, 단위·통합·시스템)",
      "형상 관리와 버전 관리 (Git)",
      "요구사항 분석과 프로젝트 일정 관리 (CPM, PERT)",
    ],
    studyTips: [
      "디자인 패턴은 게임 개발에서 실제로 사용한 패턴(Singleton, Observer, State)을 중심으로 정리하면 기억에 남습니다.",
      "UML 다이어그램은 직접 그려보며 표기법을 익히세요. 시퀀스 다이어그램이 특히 자주 출제됩니다.",
      "애자일 vs 폭포수 비교, V-모델의 각 단계별 테스트 매핑은 단골 문제입니다.",
      "COCOMO 모델, 기능 점수(FP) 등 비용 산정 공식은 계산 문제로 나오니 공식을 정리해 두세요.",
    ],
    cppConnection:
      "게임 엔진 아키텍처에서 사용하는 컴포넌트 패턴, 이벤트 시스템(Observer), 오브젝트 팩토리 등은 GoF 디자인 패턴의 실제 적용 사례입니다. Git을 활용한 팀 프로젝트 경험과 애자일 스프린트 경험이 있다면 소공 이론을 실무와 연결하여 답변할 수 있습니다.",
  },
];
