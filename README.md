<div align="center">
	개발자 <strong>otcroz(유수연)</strong>의 레포지토리입니다. <br />
	프로젝트 소개와 함께 제가 담당한 기능과 트러블슈팅을 담았습니다.
</div>

___


![image](https://github.com/user-attachments/assets/dab8d155-1a9f-4a7a-968f-713cd8f8cb95)

## 여행자분들을 위한 책 여행 길잡이, 북극성


`#도서 추천 서비스` `#도서 플랫폼` <br /><br />
사용자가 읽은 책을 기반으로 비슷한 분야의 책과 책 속의 문장을 권하여 책을 접할 기회와 풍부한 독서 경험을 제공하는 웹서비스입니다.<br />
북극성은 모험을 하는 탐험가에게 길잡이가 되어주는 별과도 같습니다. <br />
'북극성' 서비스는 책의 여행자들에게 길잡이가 되어주기 위한 의도로 기획되어 개발한 서비스입니다.
-  토이 프로젝트 <br />
-  개발 기간: 2023.07 ~ 2024.08 <br />
-  개발 인원: 2명 <br />
- 담당 스택: `ReactJS` `NodeJS`

<br />

## ✨담당 기능
| ![_2024_07_10_10_13_39_313-ezgif com-video-to-gif-converter](https://github.com/polaris-book-page/.github/assets/79989242/17c426bc-6e62-4d19-a4d1-9159b4d699fb)  | ![_2024_07_10_10_34_25_980-ezgif com-video-to-gif-converter](https://github.com/polaris-book-page/.github/assets/79989242/db890263-5b80-4654-ac58-8ea30e7f80f6)  | ![_2024_07_10_10_35_21_103-ezgif com-video-to-gif-converter](https://github.com/polaris-book-page/.github/assets/79989242/5f00e792-b0e8-41f3-a876-7da3f6994e40) | 
| :-----: | :-----: | :-----: |
| 서비스 소개 페이지 | 달력 페이지 | 리뷰 작성 & 수정 페이지 |
| 북극성 서비스에 대한 소개, <br> 문장이 흐르는 애니메이션 구현 |달력에 사용자가 읽은 책 표지가 보이며, <br> 표지를 클릭하면 사용자가 작성한 리뷰 상세 페이지로 이동| 사용자가 책을 다 읽은 후 리뷰 작성  |

| ![_2024_07_10_10_23_28_479-ezgif com-video-to-gif-converter](https://github.com/polaris-book-page/.github/assets/79989242/f9f96769-a8d7-48e7-bfec-4271ea0e3dd0) | ![_2024_09_08_01_19_50_522-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/0d846d14-3e31-4c63-a0f4-37a4565bcdbf)  | ![_2024_09_08_01_37_50_349-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/03081cab-8baf-4ea4-9765-8345f9538751) | 
| :-----: | :-----: | :-----: |
| 마이페이지 & 프로필 수정 페이지 | 책 정보 페이지 & 리뷰 목록 페이지  | 리뷰 목록 & 리뷰 상세 페이지 |
|사용자 정보와 <br> 최근에 추가한 북킷리스트 6개 확인|책 정보와 책에 대한 사용자 리뷰 열람| 사용자가 작성한 리뷰 확인 <br> 밤하늘 애니메이션 구현  |

<br />

## 🚨Trouble Shotting

### 1. 북극성 서비스 소개 페이지 구상, 페이지 구현 중 애니메이션 오류
1) 사용자가 우리 서비스를 사용하기 전, 북극성 서비스 컨셉과 주요 기능을 각인시킬 수 있는 방안 고민
 - 💡`gsap`와 `keyframe`을 사용하여 인터렉티브한 서비스 소개 페이지 구현, 사용자가 맨 처음에 확인할 수 있도록 설정
2)  mouse wheel event가 발생했을 때 페이지가 내려가는 애니메이션, 오른쪽에서 컴포넌트가 등장하는 애니메이션 코드를 작성했으나, <br /> 애니메이션이 간헐적으로 실행되지 않는 문제 
 - 💡 query data 조건문 호출 위치를 수정하여 문제 해결
 - 🔎 관련 이슈: https://github.com/polaris-book-page/front-end/issues/72
### 2. 리뷰 수정 페이지에서 사용자가 작성한 리뷰를 불러올 때, 별점이 업데이트되지 않는 오류
 - 💡 별점 컴포넌트를 구성하는 `<Input>` 태그의 속성인 `checked`와 `onChange` 값을 조정, 렌더링시 별점이 업데이트되지 않는 문제 해결
    - `checked`를 true로 초기화하여 렌더링 시에 라디오 버튼이 체크되도록 표시
    - `onChange`를 사용하여 `Input`의 값이 바뀔 때마다 별점을 업데이트
 - 🔎 관련 이슈: https://github.com/polaris-book-page/front-end/issues/73
### 3. 책 목록을 사용자에게 보여주기 위한 방법과 오류 해결
1) 페이지네이션, 무한 스크롤 중 사용자에게 목록을 보여줄 방법 고민
 - 💡사용자에게 최소한의 클릭을 요구, 책을 살펴보고 별점을 등록하는 동작의 흐름을 끊지 않기 위해 <br /> 무한 스크롤을 적용하는 것이 적합하다고 봄
2)  react-intersection-observer로 무한스크롤을 구현, 스크롤이 빠르게 일어나거나 화면에 빠르게 진입 또는 이탈하는 경우 <br /> API를 여러 번 요청하는 문제 발생
 - 💡 useInfiniteQuery를 적용하여 데이터 fetch와 서버 상태 관리를 통합,  API 반복 요청 문제 해결
 - 📚 공부: [useInfiniteQuery를 사용하여 무한 스크롤 만들기](https://otcrotcr.notion.site/useInfiniteQuery-619f365bcea64d7c87641ab223643fa1?pvs=4)


<br />

___

<div align="center">
	readme를 읽고 더 궁금하시다면, <br/>
	북극성 서비스를 직접 체험해보세요. <br/>
	🌌 https://polaris-book.vercel.app/ 🌌
</div>

