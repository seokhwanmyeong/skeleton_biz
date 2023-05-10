//  상권타입별 색상
const bsDisColor: any = {
  A: "#FADB14",
  B: "#DE9F9F",
  C: "#74D8D2",
  D: "#B3FFB1",
  E: "#EFAEE1",
};

//  상권타입별 색상
const flowColor: { [x: number]: string } = {
  1: "#FF3B30",
  2: "#FF9500",
  3: "#FFCC00",
  4: "#007AFF",
  5: "#5856D6",
};

//  대장종류
const regstrGbCd = [
  { text: "전체", value: "" },
  { text: "일반", value: "1" },
  { text: "집합", value: "2" },
];

//  지붕구조
const roofCd = [
  { text: "전체", value: "" },
  { text: "(철근)콘크리트", value: "10" },
  { text: "기와", value: "20" },
  { text: "슬레이트", value: "30" },
  { text: "기타지붕", value: "90" },
];

//  용도
const mainPurpsCd = [
  { value: "", text: "전체" },
  { value: "01000", text: "단독주택" },
  { value: "02000", text: "공동주택" },
  { value: "03000", text: "제1종근린생활시설" },
  { value: "04000", text: "제2종근린생활시설" },
  { value: "05000", text: "문화및집회시설" },
  { value: "06000", text: "종교시설" },
  { value: "07000", text: "판매시설" },
  { value: "08000", text: "운수시설" },
  { value: "09000", text: "의료시설" },
  { value: "10000", text: "교육연구시설" },
  { value: "11000", text: "노유자시설" },
  { value: "12000", text: "수련시설" },
  { value: "13000", text: "운동시설" },
  { value: "14000", text: "업무시설" },
  { value: "15000", text: "숙박시설" },
  { value: "16000", text: "위락시설" },
  { value: "17000", text: "공장" },
  { value: "18000", text: "창고시설" },
  { value: "19000", text: "위험물저장및처리시설" },
  { value: "20000", text: "자동차관련시설" },
  { value: "21000", text: "동.식물관련시설" },
  { value: "23000", text: "교정및군사시설" },
  { value: "24000", text: "방송통신시설" },
  { value: "25000", text: "발전시설" },
  { value: "26000", text: "묘지관련시설" },
  { value: "27000", text: "관광휴게시설" },
  { value: "28000", text: "가설건축물" },
  { value: "29000", text: "장례시설" },
  { value: "30000", text: "자원순환관련시설" },
  { value: "31000", text: "야영장시설" },
];

//  구조
const strctCd = [
  { value: "전체", text: "" },
  { value: "11", text: "벽돌구조" },
  { value: "12", text: "블록구조" },
  { value: "13", text: "석구조" },
  { value: "17", text: "보강콘크리트조" },
  { value: "19", text: "기타조적구조" },
  { value: "21", text: "철근콘크리트구조" },
  { value: "22", text: "프리케스트콘크리트구조" },
  { value: "23", text: "철파이프조" },
  { value: "24", text: "돌담 및 토담조" },
  { value: "26", text: "라멘조" },
  { value: "27", text: "석회 및 흙혼합 벽돌조" },
  { value: "29", text: "기타콘크리트구조" },
  { value: "31", text: "일반철골구조" },
  { value: "32", text: "경량철골구조" },
  { value: "33", text: "강파이프구조" },
  { value: "34", text: "공업화박판강구조(PEB)" },
  { value: "35", text: "단일형강구조" },
  { value: "36", text: "트러스구조" },
  { value: "37", text: "스틸하우스조" },
  { value: "39", text: "기타강구조" },
  { value: "41", text: "철골콘크리트구조" },
  { value: "42", text: "철골철근콘크리트구조" },
  { value: "43", text: "철골철근콘크리트합성구조" },
  { value: "49", text: "기타철골철근콘크리트구조" },
  { value: "51", text: "일반목구조" },
  { value: "52", text: "통나무구조" },
  { value: "53", text: "트러스목구조" },
  { value: "61", text: "시멘트블럭조" },
  { value: "63", text: "조립식판넬조" },
  { value: "72", text: "흙벽돌조" },
  { value: "74", text: "컨테이너조" },
  { value: "81", text: "막구조" },
  { value: "99", text: "기타구조" },
];

export { bsDisColor, flowColor, regstrGbCd, roofCd, mainPurpsCd, strctCd };
