export const categoryOptions = {
	"카테고리": 0,
	"All": 0,
    "가정/요리/뷰티": 1230,
    "건강/취미/레저": 55890,
    "경제경영": 170,
    "고등학교참고서": 76001,
    "고전": 2105,
    "과학": 987,
    "달력/기타": 4395,
    "대학교재/전문서적": 8257,
    "만화": 2551,
    "사회과학": 798,
    "소설/시/희곡": 1,
    "수험서/자격증": 1383,
    "어린이": 1108,
    "에세이": 55889,
    "여행": 1196,
    "역사": 74,
    "예술/대중문화": 517,
    "외국어": 1322,
    "유아": 13789,
    "인문학": 656,
    "자기계발": 336,
    "잡지": 2913,
    "장르소설": 112011,
    "전집/중고전집": 17195,
    "종교/역학": 1237,
    "좋은부모": 2030,
    "중학교참고서": 76000,
    "청소년": 1137,
    "초등학교참고서": 50246,
    "컴퓨터/모바일": 351
};

// # 딕셔너리의 키를 배열로 변환
export const categoryKeys = Object.keys(categoryOptions);

export const bookOptions = ['책유형', 'All', '종이책', '전자책']
export const bookOptionsSelect = ['All', 'All', 'Book', 'eBook']
export const orderOptions = ['정확도순', '최신순', '인기순', '상품명순', '평점순', '리뷰많은순']
export const orderOptionsSelect = ['Accuracy', 'PublishTime', 'SalesPoint', 'Title', 'CustomerRating', 'MyReviewCount']