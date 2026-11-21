# 세면대 설치 확인 시스템 — 동료 PC 작업 안내

이 저장소는 공개라서 비밀번호·키·시트 ID는 적지 않는다. 그런 값은 구글 시트·Apps Script 안에 있고, 구글 계정 권한으로만 본다.

## 구성
| 무엇 | 어디 |
|---|---|
| 고객 페이지 | `index.html` (원본은 `src/` → 아래 빌드) · https://bebeknow.github.io/check/ |
| 관리 페이지 | `admin.html` (직접 수정) · https://bebeknow.github.io/check/admin.html |
| 서버 | Google Apps Script (clasp). 이 저장소엔 없음. 별도 받기(아래 3) |
| 데이터 | 구글 시트 "베베노 세면대" (세면대 · 사이즈 DB · 확인요청 · 계정 · 브랜드 · 변경 기록 · 검색 기록 · 사진 보관) |

## 처음 세팅 (동료 PC)
1. **설치:** Git, Node.js, GitHub CLI(`gh`), Claude 앱, clasp (`npm i -g @google/clasp`)
2. **GitHub 로그인 후 저장소 받기** (초대 수락 필요)
   ```
   gh auth login
   git clone https://github.com/bebeknow/check.git
   ```
3. **서버 코드 받기** — 구글 계정이 Apps Script 프로젝트와 시트의 편집자로 추가돼 있어야 한다. 스크립트 ID와 배포 ID는 김지수에게 받는다.
   ```
   clasp login
   mkdir event-gas && cd event-gas
   clasp clone <스크립트 ID>
   ```
4. Claude에게 이 파일과 `CLAUDE.md`(있으면)를 읽게 하고 시작한다.

## 작업 규칙
- 수정 전에 항상 `git pull --ff-only origin main` (서버는 `clasp pull`).
- 고객 페이지는 `src/sink-head.html`·`src/sink-script.html`을 고친 뒤 `node src/sink-build.js . v날짜-번호` 로 `index.html`을 만든다. `index.html`을 직접 고치지 않는다.
- 관리 페이지는 `admin.html`을 직접 고친다. 새 탭을 만들면 `showTab` 목록에 그 탭 id를 꼭 넣는다.
- 서버 배포: `node --check` 로 문법 확인 → `clasp push -f` → `clasp deploy -i <배포 ID> -d "설명"`. **새 배포를 만들면 안 된다**(페이지의 주소가 깨진다). 배포 후 `/exec` 를 GET 해서 `alive` 를 확인.
- 푸시 후 Pages 반영까지 1~3분. 확인은 주소 뒤에 `?v=숫자`.
- 동시에 한 사람만 배포한다. 푸시·배포 전에 서로 알린다.
- 정규식 안의 `\r \n \t` 가 문자열 생성 과정에서 실제 줄바꿈으로 바뀌어 문법 오류가 난 적이 있다. 서버 파일은 만든 뒤 반드시 `node --check`.

## 지킬 것
- 시트 비밀번호(B2)·계정 시트 내용·전화번호 등 개인정보는 채팅·저장소·로그에 적지 않는다.
- 고객 화면에 전체 세면대 목록을 넣지 않는다(경쟁사 유출 방지). 검색은 품번 4글자 이상, 최대 3개.
- 고객 검색·방문·구매 클릭 기록은 관리자 화면에서만 본다.
- 관리자 [기록] 탭의 되돌리기는 v122 이후 변경분만 된다.
- 로그인 비밀번호는 사람이 직접 입력한다.
