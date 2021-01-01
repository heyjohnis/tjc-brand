// (() => {
    
    
	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
	let enterNewScene = false; // 새로운 scene이 시작된 순간 true
	let acc = 0.2;
	let delayedYOffset = 0;
	let rafId;
	let rafState;
    let winWith = 0;
    
	const sceneInfo = [
		{
			// 0 : 인트로
			type: 'sticky',
			heightNum: 1, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),     
			},
			values: {

			}
		},
		{
			// 1 : 교회역사
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('.section-history'),
				menu: document.querySelector('.section-history .sub_menu'),
				menu_li : document.querySelectorAll('.section-history .sub_menu li'),
                tit1: document.querySelector('.section-history .tit1'),
                tit2: document.querySelector('.section-history .tit2'),
				tit3: document.querySelector('.section-history .tit3'),
				tit4: document.querySelector('.section-history .tit4'),
				tit5: document.querySelector('.section-history .tit5'),
				tit6: document.querySelector('.section-history .tit6'),
				tit7: document.querySelector('.section-history .tit7'),

				canvas: document.querySelector('#video-canvas-0'),
				context: document.querySelector('#video-canvas-0').getContext('2d'),
				videoImages: []
			},
			values: {
				videoImageCount: 30,
				imageSequence: [0, 30],
				canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],

                menu_opacity_in: [0, 1, { start: 0, end: 0.05 }],

				tit1_opacity_in: [0, 1, { start: 0.125, end: 0.175 }],
				tit1_opacity_out: [1, 0, { start: 0.22, end: 0.27 }],

				tit2_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],                
				tit2_opacity_out: [1, 0, { start: 0.345, end: 0.395 }],

				tit3_opacity_in: [0, 1, { start: 0.375, end: 0.425 }],
				tit3_opacity_out: [1, 0, { start: 0.48, end: 0.52 }],

				tit4_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				tit4_opacity_out: [1, 0, { start: 0.615, end: 0.645 }],
				
				tit5_opacity_in: [0, 1, { start: 0.625, end: 0.65 }],
				tit5_opacity_out: [1, 0, { start: 0.67, end: 0.72 }],

				tit6_opacity_in: [0, 1, { start: 0.75, end: 0.8 }],
				tit6_opacity_out: [1, 0, { start: 0.845, end: 0.895 }],

				tit7_opacity_in: [0, 1, { start: 0.875, end: 0.925 }],
				tit7_opacity_out: [1, 0, { start: 0.9, end: 1.0 }],

								

			}
        },
		{
			// 2 : 교회분포
			type: 'sticky',
			heightNum: 8,
			scrollHeight: 0,
			slides: 2,
			currentSlide: 0,
			currentPop: 0,
			objs: {
				container: document.querySelector('.section-church'),
                slidesWrap: document.querySelector('.section-church .slides .slides-scroll-wrap'),
				slide: document.querySelectorAll('.section-church .slide'),
				btnPrev: document.querySelector('.section-church .prev'),
				btnNext: document.querySelector('.section-church .btn-slide.next'),
				title: document.querySelector('.section-church h2'),
				
				fr_map1: document.querySelector('#slide-world .map-frame'),
				fr_map2: document.querySelector('#slide-korea .map-frame'),
				map1: document.querySelector('.section-church #map1'),
				map2: document.querySelector('.section-church #map2'),

				btnChNext: document.querySelector('.section-church .btn_ch_next'),
				btnChPrev: document.querySelector('.section-church .btn_ch_pre'),


			},
			values: {

			}
		},
		{
			// 3 : 우리의 믿음 
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				belief_board: document.querySelectorAll('#scroll-section-3 .belief_board .belief'),
				belief_menu: document.querySelectorAll('#scroll-section-3 .belief_menu .ico_belief'),
				modal_title: document.querySelector('#belief_modal .title'),
				modal_description: document.querySelector('#belief_modal .description'),
				youtube_list: document.querySelector('#belief_modal .youtube_list'),
				modal_image: document.querySelector('#belief_modal .image'),
				youtube: document.querySelector('#belief_modal .youtube'), 
				youtube_close: document.querySelector('#belief_modal .youtube .btn_close'), 
				youtube_ifr: document.querySelector('#belief_modal iframe#ifr_youtube'),
				
			},
			values: {
			}
		},
		{
			// 4 : FAQ
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				faq_subject: document.querySelector('#scroll-section-4 .subject'),
				faq_menu: document.querySelectorAll('#scroll-section-4 .faq_menu'),
				faq_list: document.querySelector('#scroll-section-4 .faq_list'),
				faq_content: document.querySelector('#scroll-section-4 .faq_content'),
				faq_title: document.querySelector('#scroll-section-4 .faq_content .title'),
				faq_discription: document.querySelector('#scroll-section-4 .faq_content .discription'),
				

			},
			values: {
			}
		},
		{
			// 5 : 간행물
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				book_list: document.querySelector('.book_list'),
				book_title: document.querySelector('#scroll-section-5 .book_title'),
				book_img: document.querySelector('#scroll-section-5 .book_img'),
				book_description: document.querySelector('#scroll-section-5 .book_img'),
			},
			values: {
			}
		},
		{
			// 6
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
			},
			values: {
			}
		}
	];
	
	// 해외교회 정보
	const MAPSOPT1 = [
		{name: '중국', left: 41, top:41, since:'1919', site:'http://www.tjc.org.cn', desc: '중국교회 소개'},
		{name: '대만', left: 42.8, top:46.6, since:'1926', site:'http://www.tjc.org.tw', desc: '대만교회 소개'},
		{name: '싱가폴', left: 38.9, top:60, since:'1927', site:'http://www.truejesuschurch.sg', desc: '싱가폴교회 소개'},
		{name: '사바', left: 38.9, top:60, since:'1928', site:'', desc: '사바교회 소개'},
		{name: '말레이지아', left: 38.7, top:61.5, since:'1928', site:'http://', desc: '말레이지아교회 소개'},
		{name: '홍콩', left: 41, top:48, since:'1929', site:'http://www.tjchkga.com/Chin/Default.asp', desc: '홍콩교회 소개'},
		{name: '하와이', left: 45.8, top:46, since:'1930', site:'http://', desc: '하와이교회 소개'},
		{name: '인도', left: 31.8, top:47.5, since:'1932', site:'http://', desc: '인도교회 소개'},
		{name: '인도네시아', left: 41, top:64.5, since:'1939', site:'http://', desc: '인도네시아교회 소개'},
		{name: '일본', left: 46.5, top:40.5, since:'1947', site:'http://www.tjc.or.jp', desc: '일본교회 소개'},
		{name: '한국', left: 43.3, top:40, since:'1948', site:'http://www.tjc.or.kr', desc: '한국교회 소개'},
		{name: '태국', left: 38, top:52, since:'1953', site:'https://www.facebook.com/TJC-Thailand-116920721662481/timeline/', desc: '태국교회 소개'},
		{name: '브루나이', left: 37, top:52.7, since:'1956', site:'http://', desc: '브루나이교회 소개'},
		{name: '미국', left: 71, top:40, since:'1969', site:'http://www.tjc.us', desc: '미국교회 소개'},
		{name: '캐나다', left: 65, top:30, since:'1975', site:'http://tjccanada.org', desc: '캐나다교회 소개'},
		{name: '영국', left: 11.6, top:31, since:'1976', site:'http://www.tjc.org.uk', desc: '영국교회 소개'},
		{name: '나이지리아', left: 13.5, top:56.4, since:'1979', site:'http://', desc: '나이지리아교회 소개'},
		{name: '호주', left: 50, top:80, since:'1982', site:'http://', desc: '호주교회 소개'},
		{name: '프랑스',left: 12, top:33, since:'1983', site:'http://', desc: '프랑스교회 소개'},
		{name: '필리핀', left: 43, top:52.2, since:'1983', site:'https://www.facebook.com/True-Jesus-church-Mansilingan-Bacolod-City-Philippines-175489899176559/timeline/', desc: '필리핀교회 소개'},
		{name: '라이베리아',left: 8.8, top:54.7, since:'1985', site:'http://', desc: '라이베리아교회 소개'},
		{name: '가나',left: 9.7, top:57.4, since:'1985', site:'http://', desc: '가나교회 소개'},
		{name: '독일', left: 14, top:31, since:'1985', site:'http://', desc: '독일교회 소개'},
		{name: '아르헨티나',left: 76.2, top:80.3, since:'1989', site:'http://', desc: '아르헨티나교회 소개'},
		{name: '뉴질랜드', left: 53, top:83, since:'1990', site:'http://tjc.org.nz', desc: '뉴질랜드교회 소개'},
		{name: '사모아', left: 56.4, top:67.7, since:'1990', site:'http://', desc: '사모아교회 소개'},
		{name: '스페인', left: 10.7, top:37.7, since:'1991', site:'http://', desc: '스페인교회 소개'},
		{name: '미얀마', left: 36.3, top:48.1, since:'1992', site:'http://', desc: '미얀마교회 소개'},
		{name: '네델란드', left: 12.9, top:31.4, since:'1992', site:'http://', desc: '네델란드교회 소개'},
		{name: '벨기에', left: 12.7, top:32, since:'1993', site:'http://', desc: '벨기에교회 소개'},
		{name: '피지', left: 53.8, top:70.9, since:'1994', site:'http://', desc: '피지교회 소개'},
		{name: '오스트리아', left: 14.8, top:33.3, since:'1995', site:'http://', desc: '오스트리아교회 소개'},
		{name: '러시아', left: 31.5, top:23.7, since:'1995', site:'http://', desc: '러시아교회 소개'},
		{name: '브라질', left: 79, top:68.6, since:'1996', site:'http://', desc: '브라질교회 소개'},
		{name: '베트남', left: 39.9, top:53, since:'1996', site:'http://', desc: '베트남교회 소개'},
		{name: '케냐', left: 21.3, top:60.6, since:'1996', site:'http://', desc: '케냐교회 소개'},
		{name: '볼리비아', left: 75.2, top:70.9, since:'1996', site:'http://', desc: '볼리비아교회 소개'},
		{name: '남아프리카', left: 17.3, top:77.7, since:'1997', site:'http://', desc: '남아프리카교회 소개'},
		{name: '도미니카', left: 73.6, top:49.4, since:'1997', site:'http://', desc: '도미니카교회 소개'},
		{name: '베냉', left: 12, top:55.7, since:'1998', site:'http://', desc: '베냉교회 소개'},
		{name: '칠레', left: 74.2, top:81.5, since:'1998', site:'http://', desc: '칠레교회 소개'},
		{name: '북아일랜드', left: 10.1, top:29.4, since:'1998', site:'http://', desc: '북아일랜드교회 소개'},
		{name: '우간다', left: 20, top:59.7, since:'2000', site:'http://', desc: '우간다교회 소개'},
		{name: '토고', left: 11.6, top:36.7, since:'2001', site:'http://', desc: '토고교회 소개'},
		{name: '남아일랜드', left: 9.8, top:30.4, since:'2003', site:'http://', desc: '남아일렌드랜교회 소개'},
		{name: '시에라리온', left: 8.2, top:56.7, since:'2004', site:'http://', desc: '시에라리온교회 소개'},
		{name: '탄자니아', left: 20.7, top:64.5, since:'2004', site:'http://', desc: '탄자니아교회 소개'},
		{name: '콩고', left: 17.7, top:61.5, since:'2004', site:'http://', desc: '콩고교회 소개'},
		{name: '통가', left: 55.1, top:72.6, since:'2004', site:'http://', desc: '통가교회 소개'},
		{name: '캄보디아', left: 38.9, top:53.4, since:'2005', site:'http://', desc: '캄보디아교회 소개'},
		{name: '파라과이', left: 78, top:74.6, since:'2006', site:'http://', desc: '파라과이교회 소개'},
		{name: '레소토', left: 18.8, top:78.3, since:'2007', site:'http://', desc: '레소토교회 소개'},
		{name: '잠비아', left: 18.8, top:89.3, since:'2007', site:'http://', desc: '잠비아교회 소개'},
		{name: '아랍 에미리트', left: 25.7, top:46.4, since:'2007', site:'http://', desc: '아랍 에미리트교회 소개'},
		{name: '르완다', left: 19.4, top:61.9, since:'2007', site:'http://', desc: '르완다교회 소개'},
		{name: '마카오', left: 40, top:47.3, since:'2008', site:'http://', desc: '마카오교회 소개'},
		{name: '이탈리아', left: 14.3, top:35.6, since:'2009', site:'http://', desc: '이탈리아교회 소개'},
		{name: '그리스', left: 16.9, top:38.6, since:'2010', site:'http://', desc: '그리스교회 소개'},
		{name: '키프로스', left: 19.8, top:41.1, since:'2010', site:'http://', desc: '키프로스교회 소개'},
		{name: '파푸아 뉴기니', left: 49.8, top:63.8, since:'2010', site:'http://', desc: '파푸아 뉴기니교회 소개'},
		{name: '에콰도르', left: 71, top:61.4, since:'2011', site:'http://', desc: '에콰도르교회 소개'},
		{name: '말라위', left: 20.7, top:75.8, since:'2014', site:'http://', desc: '말라위교회 소개'},
		{name: '파키스탄', left: 29, top:44.3, since:'2016', site:'http://', desc: '파키스탄교회 소개'}
	];

	// 국내교회 정보
	const MAPSOPT2 = [
		{name: '김천교회', left: 53, top:83, since:'1947', site:'경상북도 김천시 평화중앙3길 30', tel: '000-000-0000', 	image: "./images/church/gimchun.jpg"},
		{name: '삼계교회', left: 53, top:83, since:'1949', site:'전라북도 임실군 삼계면 삼계리 충효로 1315-3', desc: '삼계교회 소개'},
		{name: '쌍치기도소', left: 53, top:83, since:'1949', site:'전라북도 순창군 쌍치면 금성내동길 49-30', desc: '쌍치기도소 소개'},
		{name: '전주교회', left: 53, top:83, since:'1949', site:'전라북도 전주시 완산구 백제대로 20-37(평화동1가)', desc: '전주교회 소개'},
		{name: '서도교회', left: 53, top:83, since:'1949', site:'전라북도 남원시 사매면 노봉길 9', desc: '서도교회 소개'},
		{name: '동부교회', left: 34, top:23, since:'1949', site:'서울특별시 동대문구 회기로 23가길 12(회기동)', desc: '동부교회 소개'},
		{name: '남원교회', left: 50, top:80, since:'1952', site:'전라북도 남원시 노송로 1261 (노암동)', desc: '남원교회 소개'},
		{name: '부산교회', left: 53, top:83, since:'1954', site:'부산광역시 금정구 서금로 37-10, (서동)', desc: '부산교회 소개'},
		{name: '대구교회', left: 53, top:83, since:'1955', site:'대구광역시 동구 신암로14길 3-1 (신암동)', desc: '대구교회 소개'},
		{name: '대전교회', left: 65, top:30, since:'1956', site:'대전시 동구 천동 72-1 17/3', desc: '대전교회 소개'},
		{name: '대방교회', left: 31, top:25, since:'1957', site:'서울특별시 동작구 알마타길 29(대방동)', desc: '대방교회 소개'},
		{name: '서천교회', left: 31, top:25, since:'1958', site:'충청남도 서천군 서천읍 군청로 81', desc: '서천교회 소개'},
		{name: '안동교회', left: 53, top:83, since:'1960', site:'경상북도 안동시 득심골길 32-8 (상아동)', desc: '안동교회 소개'},
		{name: '수문교회', left: 53, top:83, since:'1963', site:'전라남도 장흥군 안양면 수문4길 6', desc: '수문교회 소개'},
		{name: '서부교회', left: 31, top:23, since:'1963', site:'서울특별시 은평구 통일로50길 2-2 (녹번동)', desc: '서부교회 소개'},
		{name: '광주교회', left: 14, top:31, since:'1965', site:'광주광역시 광산구 목련로394번길 10-12 (신가동)', desc: '광주교회 소개'},
		{name: '강진교회', left: 11.6, top:31, since:'1966', site:'', desc: '강진교회 소개'},
		{name: '화산교회', left: 11.6, top:31, since:'1967', site:'전라남도 해남군 화산면 가장길 31-4', desc: '화산교회 소개'},
		{name: '안산교회', left: 38.7, top:61.5, since:'1968', site:'경기 안산시 상록구 사동 1528-15번지, 2층', desc: '안산교회 소개'},
		{name: '청주교회', left: 11.6, top:31, since:'1969', site:'충청북도 청주시 상당구 영운천로119번길 25 (용정동)', desc: '청주교회 소개'},
		{name: '여우치교회', left: 38.7, top:61.5, since:'1971', site:'', desc: '여우치교회 소개'},
		{name: '목포교회', left: 53, top:83, since:'1975', site:'전라남도 목포시 복산길6번길 34 (옥암동)', desc: '목포교회 소개'},
		{name: '오산교회', left: 41, top:64.5, since:'1980', site:'경기도 오산시 은여울로7번길 13-3 (궐동)', desc: '오산교회 소개'},
		{name: '광양교회', left: 12, top:33, since:'1980', site:'전남 광양시 광양읍 덕례리 1673-2', desc: '광양교회 소개'},
		{name: '인천교회', left: 38, top:52, since:'1982', site:'인천광역시 남동구 백범로73번길 15 (만수동)', desc: '인천교회 소개'},
		{name: '거제교회', left: 50, top:50, since:'1983', site:'경상남도 거제시 연초면 다공2길 27', desc: '거제교회 소개'},
		{name: '원주교회', left: 53, top:83, since:'1986', site:'강원도 원주시 행가리1길 67 (무실동) ', desc: '원주교회 소개'},
		{name: '수원교회', left: 38.9, top:60, since:'1988', site:'경기도 수원시 권선구 매송고색로533번길 7(오목천동,태산아파트)상가3동 301-304호', desc: '수원교회 소개'},
		{name: '강남교회', left: 34, top:26, since:'1989', site:'서울특별시 강남구 일원로3길 30 (일원동)', desc: '강남교회 소개'},
		{name: '장항서부교회', left: 11.6, top:31, since:'1993', site:'충청남도 서천군 장항읍 장항로 91번길 17', desc: '장항서부교회 소개'},
		{name: '분당교회', left: 41, top:48, since:'1998', site:'경기도 성남시 분당구 벌말로 41 (야탑동) 성원프라자 5층 503호', desc: '분당교회 소개'},
		{name: '천안교회', left: 11.6, top:31, since:'1998', site:'충청남도 천안시 서북구 쌍용대로 43 (쌍용동)(유웅선 내과 4층)', desc: '천안교회 소개'},
		{name: '안양교회', left: 42, top:58, since:'2003', site:'경기도 안양시 만안구 석천로211번길 82 (석수동) 삼우BD 3층', desc: '안양교회 소개'},
		{name: '하남교회', left: 43, top:52.2, since:'2010', site:'경기도 하남시 덕산로 68 (덕풍동)(한솔빌딩6층)', desc: '하남교회 소개'},
		{name: '의정부교회', left: 71, top:40, since:'2016', site:'경기도 의정부시 가능로 97번길 26', desc: '의정부교회 소개'},
		{name: '보령기도소', left: 11.6, top:31, since:'1919', site:'충청남도 보령시 명천중앙길 20(명천동) 정은스카이빌 103동1003호', desc: '보령기도소 소개'},
		{name: '제주기도소', left: 53, top:83, since:'1919', site:'제주도 제주시 애월읍 하귀1리 143-5', desc: '제주기도소 소개'},
	];

	// 우리의 신앙 데이터
	let belief_data = {
		"01":
		{ 
			subject: "<span>제 1 항</span> 하나님에 대한 우리의 믿음", 
			description: "예수 그리스도께서는 말씀이 육신이 되어 죄인을 구속하시기 위하여 십자가 위에서 대신 죽으시고 삼 일만에 부활, 승천하신 것을 믿으며 그분은 인류의 유일하신 구주시며 천지의 주재시고 홀로 하나이신 참 하나님이심을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 1항 신관 1부 육신이 되어 이 땅에 오신 하나님",
					url: "https://www.youtube.com/embed/UGyCb00FwLk", 
					thumb: "./images/belief/thumb/belief01_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 1항 신관 2부 성육신의 세 가지 의미",
					url: "https://www.youtube.com/embed/3JgzYHtjhjI", 
					thumb: "./images/belief/thumb/belief01_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 1항 신관 3부 예수 그리스도의 십자가 제사",
					url: "https://www.youtube.com/embed/5X-ZdF5gE1A", 
					thumb: "./images/belief/thumb/belief01_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 1항 신관 4부 홀로 하나이신 하나님 예수",
					url: "https://www.youtube.com/embed/CP3w9A_BtDM", 
					thumb: "./images/belief/thumb/belief01_1.jpg"
				},
			],
		},

		"02":
		{ 
			subject: "<span>제 2 항</span> 성경에 대한 우리의 믿음", 
			description: "신,구약 성경은 하나님의 계시로 된 것임을 믿으며, 참 진리의 유일한 근거가 됨과 동시에 신도생활의 기준이 됨을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 2항 성경관 1부 구약을 신뢰할 수 있는 근거",
					url: "https://www.youtube.com/embed/UGyCb00FwLk", 
					thumb: "./images/belief/thumb/belief02_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 2항 성경관 2부 신약을 신뢰할 수 있는 근거",
					url: "https://www.youtube.com/embed/3JgzYHtjhjI", 
					thumb: "./images/belief/thumb/belief02_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 2항 성경관 3부 성경은 진리와 거짓을 분별하는 유일한 기준",
					url: "https://www.youtube.com/embed/5X-ZdF5gE1A", 
					thumb: "./images/belief/thumb/belief02_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 2항 성경관 4부 성경은 신도생활의 준칙",
					url: "https://www.youtube.com/embed/NSFQgtuTBqc", 
					thumb: "./images/belief/thumb/belief02_1.jpg"
				},
			],
		},

		"03":
		{ 
			subject: "<span>제 3 항</span> 교회에 대한 우리의 믿음", 
			description: "본 교회는 예수 그리스도께서 늦은 비 성령으로 세우신 교회로서 사도교회의 부흥된 참 교회임을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 제 3항 교회관 1부 사도교회초대교회의 시작과 변질",
					url: "https://www.youtube.com/embed/EXldFV02pAY", 
					thumb: "./images/belief/thumb/belief03_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 제 3항 교회론 2부 말세에 회복된 늦은비 성령의 참교회",
					url: "https://www.youtube.com/embed/yR6QVWuBt4M", 
					thumb: "./images/belief/thumb/belief03_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 제 3항 교회관 3부 참교회의 세 가지 구비 조건(1)",
					url: "https://www.youtube.com/embed/4kZLjMkA15s", 
					thumb: "./images/belief/thumb/belief03_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 제 3항 교회관 4부 참교회의 세 가지 구비 조건(2)",
					url: "https://www.youtube.com/embed/shJC22nyRTE", 
					thumb: "./images/belief/thumb/belief03_1.jpg"
				},
			],
		},

		"04":
		{ 
			subject: "<span>제 4 항</span> 세례에 대한 우리의 믿음", 
			description: "세례(침례)는 죄 사함을 받는 중생의 성례이며 반드시 물과 성령으로 거듭난 자가 주 예수 그리스도의 이름으로 흐르는 물에서 베풀며 받는 자는 머리를 숙이고 전신이 물에 잠기는 침례를 받아야 함을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 제 4항 1부 하늘로부터 기원한 기독교 세례",
					url: "https://www.youtube.com/embed/z1740IKZ1nU", 
					thumb: "./images/belief/thumb/belief04_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 4항 세례관 2부 죄사함과 거듭남의 세례",
					url: "https://www.youtube.com/embed/qewjdYdHmkA", 
					thumb: "./images/belief/thumb/belief04_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 4항 세례관 3부 구약 성경에 나타난 세례의 예표들",
					url: "https://www.youtube.com/embed/F99-NjdgcJs", 
					thumb: "./images/belief/thumb/belief04_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 4항 세례관 4부 성경적 세례는 이렇게 시행되어야 합니다",
					url: "https://www.youtube.com/embed/hg8bQFSvGsg", 
					thumb: "./images/belief/thumb/belief04_1.jpg"
				},
			],
		},
	"05":
		{ 
			subject: "<span>제 5 항</span> 성령에 대한 우리의 믿음", 
			description: "성령을 받는 것은 천국의 기업을 얻는 보증이며 방언(영언)을 말하는 것은 성령을 받은 증거가 됨을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 5항 성령관 1부 구약시대와 구별되는 신약시대의 성령",
					url: "https://www.youtube.com/embed/7vQAf-aNH3w", 
					thumb: "./images/belief/thumb/belief05_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 5항 성령관 2부 약속의 성령을 받은 중요한 의미",
					url: "https://www.youtube.com/embed/HbpTVdbtFUM", 
					thumb: "./images/belief/thumb/belief05_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 5항 성령관 3부 그것이 성령 받은 증거는 아닙니다(1)",
					url: "https://www.youtube.com/embed/kHPZ3hCrIvA", 
					thumb: "./images/belief/thumb/belief05_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 5항 성령관 4부 그것이 성령 받은 증거는 아닙니다(2)",
					url: "https://www.youtube.com/embed/uQSDw_BRk4Q", 
					thumb: "./images/belief/thumb/belief05_1.jpg"
				},
			],
		},
	"06":
		{ 
			subject: "<span>제 6 항</span> 세족례에 대한 우리의 믿음", 
			description: "세족례는 주님과 상관을 맺고 서로 사랑하고 성결, 겸손, 봉사, 용서의 교훈을 가르치는 성례이며 세례(침례)를 받은 모든 신자는 주 예수 그리스도의 이름으로 세족례를 일차 행하며 신자들 상호 간의 세족례는 필요시에 시행할 수 있음을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 6항 세족례 1부 세족례를 성례로 수납하는 근거들",
					url: "https://www.youtube.com/embed/CqUuZjGVQGM", 
					thumb: "./images/belief/thumb/belief06_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 6항 세족례 2부 세족례에 담긴 영적 교훈들1",
					url: "https://www.youtube.com/embed/Cm81a3j70Uc", 
					thumb: "./images/belief/thumb/belief06_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 6항 세족례 3부 세족례에 담긴 영적 교훈들2",
					url: "https://www.youtube.com/embed/aR2Y3JNng58", 
					thumb: "./images/belief/thumb/belief06_1.jpg"
				},
			],
		},
		"07":
		{ 
			subject: "<span>제 7 항</span> 성찬례에 대한 우리의 믿음", 
			description: "성찬례는 주의 죽으심을 기념하며 주의 살과 피에 동참하여 주와 연합하고 영생(永生)을 받으며 마지막 날에 부활하는 성례임을 믿는다. 이 성례는 필요할 때마다 거행하며 반드시 한 개의 누룩 없는 떡과 포도즙으로 거행한다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 7항 성찬례 1부 성찬례를 성례로 수납하는 근거",
					url: "https://www.youtube.com/embed/WSvVGW8UKsM", 
					thumb: "./images/belief/thumb/belief07_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 7항 성찬례 2부 성찬례의 의미와 유효성",
					url: "https://www.youtube.com/embed/raqYt7bxheo", 
					thumb: "./images/belief/thumb/belief07_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 7항 성찬례 3부 성찬례 시행의 성경적 절차와 방법",
					url: "https://www.youtube.com/embed/PUnioLYkKXU", 
					thumb: "./images/belief/thumb/belief07_1.jpg"
				},
			],
		},
		"08":
		{ 
			subject: "<span>제 8 항</span> 안식일에 대한 우리의 믿음", 
			description: "안식일(금요일 일몰부터 토요일 일몰까지)은 하나님께서 복 주신 거룩한 날임을 믿는다. 단, 이 날을 은혜 아래서 하나님의 창조와 구속의 은혜를 기념하고 내세의 영원한 안식을 소망하며 지킨다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 8항 성일론 1부 에덴동산에서 예수님 시대까지의 안식일",
					url: "https://www.youtube.com/embed/z6tyRRfdaTQ", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 8항 성일론 2부 안식일을 지키는 의미는 이런 것입니다.",
					url: "https://www.youtube.com/embed/aNwdvjxWZzw", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 8항 성일론 3부 일요일에서 안식일로 회복해야 합니다.",
					url: "https://www.youtube.com/embed/C_T3UzTTqro", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 8항 성일론 4부 은혜의 안식일 이렇게 지켜야 합니다.",
					url: "https://www.youtube.com/embed/OWohU-4yYzk", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
			],
		},
		"09":
		{ 
			subject: "<span>제 9 항</span> 구원에 대한 우리의 믿음", 
			description: "구원은 본래 하나님의 은혜를 인하여 믿음으로 얻는 것임을 믿는다. 그리고 성령을 힘입어 성결을 이루도록 추구하고 하나님을 경외하며 사람을 사랑하는 성경교훈의 실천에 힘쓴다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 9항 성일론 1부 에덴동산에서 예수님 시대까지의 안식일",
					url: "https://www.youtube.com/embed/z6tyRRfdaTQ", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 9항 성일론 2부 안식일을 지키는 의미는 이런 것입니다.",
					url: "https://www.youtube.com/embed/aNwdvjxWZzw", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 9항 성일론 3부 일요일에서 안식일로 회복해야 합니다.",
					url: "https://www.youtube.com/embed/C_T3UzTTqro", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 9항 성일론 4부 은혜의 안식일 이렇게 지켜야 합니다.",
					url: "https://www.youtube.com/embed/OWohU-4yYzk", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
			],
		},
		"10":
		{ 
			subject: "<span>제 10 항</span> 재림에 대한 우리의 믿음", 
			description: "주 예수 그리스도께서 반드시 세상 끝 날에 하늘로부터 강림하셔서 만민을 심판하시되 의인은 영생을 얻게 하시고 악인은 영벌을 받게 하신다는 것을 믿는다.",
			image_path: "./images/belief/thumb/belief_image01.jpg",
			youtube:
			[
				{
					title: "참예수교회 기본신앙 10항 성일론 1부 에덴동산에서 예수님 시대까지의 안식일",
					url: "https://www.youtube.com/embed/z6tyRRfdaTQ", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 10항 성일론 2부 안식일을 지키는 의미는 이런 것입니다.",
					url: "https://www.youtube.com/embed/aNwdvjxWZzw", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 10항 성일론 3부 일요일에서 안식일로 회복해야 합니다.",
					url: "https://www.youtube.com/embed/C_T3UzTTqro", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
				{
					title: "참예수교회 기본신앙 10항 성일론 4부 은혜의 안식일 이렇게 지켜야 합니다.",
					url: "https://www.youtube.com/embed/OWohU-4yYzk", 
					thumb: "./images/belief/thumb/belief08_1.jpg"
				},
			],
		}
	}


	// FAQ 데이터
	const faq_data = {
		"01":
		{ 
			subject : "교단과 창시자", 
			faq :
			[
				{
					title : "참예수교회는 어느 교단 소속입니까?", 
					description: "참예수교회는 일반 개신교의 어떤 교단 교파에도 소속하지 않은 독립교단입니다."
				},
				{
					title : "참예수교회의 창시자 혹은 교주는 누구입니까?", 
					description: "참예수교회는 성경의 예언대로 성령께서 세우신 교회로서 특별한 인물이 창시자나 교주로 추앙되지 않습니다."
				},
				{
					title : "참예수교회는 타교단과 어떤 차이점이 있습니까?", 
					description: "참예수교회는 사도시대와 같은 성령, 사도 시대와 같은 성례, 사도 시대와 같은 안식일 준수를 표방하는 기독교 정통 신앙의 교단입니다."
				},
				{
					title : "참예수교회는 타 기독교단의 신앙에 대해 어떤 생각을 가지고 있습니까?", 
					description: "본회는 우상숭배와 이교 문화로 변질된 천주교를 기독교에 속하지 않은 교단으로 간주하며 개신교는 예수 그리스도에 대한 탄생, 죽음, 부활, 승천, 그리고 재림에 대한 믿음의 내용이 본회와 신앙과 공통적이지만 구원론과 관련된 중요한 교리가 변질, 변경되었으므로 성경의 진리를 깨닫고 사도교회와 같은 본래의 신앙으로 개혁되어야 한다고 봅니다."
				}
			]
		},
		"02":
		{
			subject : "성경",
			faq :
			[
				{
					title : "참예수교회에서 사용하는 성경은 어떤 성경입니까?",
					description : "참예수교회는 구약 39권 신약 27권의 기독교 정경을 인정하며 한국총회에서는 개역한글판 역본을 공식 예배 성경으로, 개역개정판을 참고용으로 사용하고 있습니다. 일반 개신교에서 외경으로 분류하는 경권이 포함된 천주교에서 사용하는 경전은 인정하지 않습니다. 본회의 영어권에서는 킹제임스 역본을 공식 지정 성경으로, 중국어권에서는 화합역본을 공식 지정 성경으로 사용하고 있습니다."
				},
				{
					title : "참예수교회에서는 정경 이외의 다른 경전을 사용하고 있습니까?",
					description : "참예수교회는 66권의 성경 전서만 경전으로 인정하고 있으며 그 외의 외경은 일체 인정하지 않고 사용하지도 않습니다."
				}
			]
		},
		"03":
		{
			subject : "신관",
			faq :
			[
				{
					title : "참예수교회의 신관은 무엇입니까?",
					description : "참예수교회는 기본신앙 1항에서 표명하듯이 예수 그리스도를 육신으로 오신 조물주 하나님이시며 인류를 구원하실 유일하신 참 하나님으로 믿습니다."
				},
				{
					title : "참예수교회는 왜 삼위일체를 믿지 않습니까?",
					description : "삼위일체는 성경에 존재하지 않는 표현이요, 그 용어 자체가 모순된 논리를 담고 있으며, 이방 종교로부터 유입된 요소가 있다고 의심되기 때문에 받아들이지 않습니다. 무한하신 하나님을 유한한 인간이 이성적으로 다 규명할 수 없고, 영이신 하나님을 육체의 관념으로 정확히 이해할 수 없으며, 사도시대의 신앙인들이 소유한 하나님에 대한 이해와 삼위일체를 통한 신에 대한 이해에는 차이점이 발견되기 때문에 본회에서는 삼위일체론을 받아들이지 않습니다. 이에 대한 본회의 견해를 더 알기 원하시면 간행물 가운데 ‘성령론‘(사순도 저)을 참고해 주시기 바랍니다."
				},
				{
					title : "참예수교회는 양태론을 지지합니까?",
					description : "참예수교회는 양태론(사벨리우스 주의)을 지지하지 않습니다. 참예수교회는 사도시대의 신앙인들의 하나님에 대한 이해, 관념을 수용하고 지지합니다."
				},
			]
		},
		"04":
		{
			subject : "성령",
			faq :
			[
				{
					title : "참예수교회에서 성령을 받은 증거로 방언을 말하는 것으로 삼는 근거는 무엇입니까?",
					description : "성령을 받을 때 나타나는 현상에 대한 서술은 복음서나 서신서에서는 발견할 수 없고 오직 사도행전에서만 발견할 수 있습니다. 사도행전 2장, 10장, 19장에는 성령이 임하실때직접적으로 ‘방언＇을 말했다고 기록하고 있으며8장에는 ‘방언＇을 말했을 것으로 추정되는 정황이 기록되어 있습니다. 이에 대한 자세한 설명은 본회 기본신앙 5항 교육영상을 참고하시기 바랍니다."
				},
				{
					title : "참예수교회의 방언은 은사 중의 하나가 아닙니까?",
					description : "방언은 눈앞에 발견되는 현상은 하나이지만 이것의 효용은 세 가지 정도로 구별됩니다. 첫째, 성령받은 증거로서의 방언, 둘째, 하나님께 기도하는 도구로서의 방언, 셋째, 통역이 따를 경우 특별히 회중을 향한 설교와 예언의 목적으로 활용되는 방언입니다. 방언을 은사 중의 하나로 인식하는 것은 고린도전서 12장과 14장에 기록된 세번째경우에 해당합니다. 따라서 단순히 방언을 ‘은사 중 하나＇로만 이해하는 것은 편협한 이해입니다. 사도시대 성도들은 방언을 성령 받은 증거로 여겼습니다."
				},
				{
					title : "세계의 참예수교회 신도들은 모두 방언을 말합니까?",
					description : "세계 각 나라의 참예수교회 안에서 성령을 받은 신도들은 모두 동일한 형태의 방언을 말하고 있습니다. 동일한 형태의 방언이 나타나는 것은 참예수교회 안에 내린 성령이 각나라와 민족을 초월해서 동일한 성령임을 나타 냅니다. 이에 대해서는 기본신앙 5항의 교육 영상과 참예수교회 세계 분포란의 소개 동영상을 참고하시기 바랍니다."
				},
			]
		},
		"05":
		{
			subject : "사회와 가정",
			faq :
			[
				{
					title : "참예수교회는 국가와 사회에 대해 어떤 가치관을 가지고 있습니까?",
					description : "참예수교회는 성도가 한 국가의 국민으로서의 의무를 다할 것을 독려할 뿐만 아니라 나아가 사회의 일원으로서 모범된 삶을 살 것이며, 타인을 이롭게 하는 소금과 빛의 역할을 다하도록 가르칩니다."
				},
				{
					title : "참예수교회는 가정에 대해 어떤윤리관을 가지고 있습니까?",
					description : "참예수교회는 성도가 성경의 가르침대로 사랑과 순종의 부부 윤리, 배려와 순종의 부모 자녀간의 윤리에 충실해야 한다고 가르칩니다. 본회는 종교와 신앙 때문에 가정을 등지거나 파괴하는 일을 정당화하는 가르침은 성경의 정신에 정면으로 위배되는 사상으로 판단합니다."
				},
				{
					title : "참예수교회는 남자 신도의 병역 의 무에 대해 어떤견해를 가지고 있습니까?",
					description : "참예수교회는 성도가 국민의 한 사람으로서의 의무를 다할 것을 교훈하며병역의 의무를 거부하도록 가르치지 않습니다."
				},
			]
		},
		"06":
		{
			subject : "세례",
			faq :
			[
				{
					title : "참예수교회에서는 왜 세례를 줄때 전신이 물에 완전히잠기는 침례로 주고 있습니까?",
					description : "세례의 본래 헬라어 단어의 뜻은 ‘침수’(물에 잠기다)입니다. 사도교회의 신앙을 추구하는 본회에서는 마땅히 사도교회가 시행한 세례의 형태인 침례를 시행합니다. 이에 대한 자세한 설명은 기본신앙 4항의 교육 영상을 참고하시기 바랍니다."
				},
				{
					title : "세례를 줄때 성부, 성자, 성령의 이름이 아니라 예수의 이름으로 베푸는 이유는 무엇입니까?",
					description : "성부 성자 성령으로 세례를 베풀라는 명령은 마태복음 28:19에 기록하고 있으나 이는 사도행전에서 ‘예수‘ 이름으로 세례를 주는 사실과 상반됩니다. 일반 개신교에서 아버지, 아들, 성령의 이름 곧‘예수’라는 이름으로 세례를 주라는 뜻이었으나 그 뜻을 곡해했습니다. 이에 대한 대한 자세한 설명은 기본신앙 4항의 교육 영상을 참고하시기 바랍니다."
				},
				{
					title : "참예수교회의 세례를 꼭 받아야 한다는 주장은 믿음보다 행위를 강조하는 것 아닌가요?",
					description : "세례는 믿음의 표현이지 믿음과 상반되는 개념으로써 ‘행위’에 속하지 않습니다. 로마서의 ‘율법의 행위＇와 성례를 같은 부류로 착각하면 안됩니다. 세례는 그리스도의 은혜에 대한 믿음의 연장입니다. 이에 대한 자세한 설명은 기본신앙 4항의 교육 영상을 참고하시기 바랍니다."
				},
			]
		},
		"07":
		{
			subject : "안식일",
			faq :
			[
				{
					title : "참예수교회는 왜 일요일이 아니라 안식일을 성일로 지킵니까?",
					description : "기독교의 성일은 본래 토요일인 ‘안식일＇이었습니다. 그러나 기독교가 로마의 국교로 지정되는 과정에서 황제는 기독교의 성일을 태양신 숭배일인 ‘일요일＇로 바꾸어 버렸습니다. 이에 대한 자세한 설명은 본회 기본신앙 6항의 교육영상을 참고하시기 바랍니다."
				},
				{
					title : "참예수교회가 준수하는 안식일이 토요일이라는 증거는 무엇입니까?",
					description : "출애굽 이후 안식일을 지키고 있는 유대인들은 현재까지 동일한 날, 토요일을 안식일로 지킵니다. 또 요일의 형성 과정에 대한 각종 역사 자료를 찾아보면 자연스럽게 이해할 수 있습니다. 이에 대한 대한 자세한 설명은 기본신앙 6항의 교육 영상을 참고하시기 바랍니다."
				},
				{
					title : "참예수교회에서 안식일을 성일로 준수하는 것은 안식교단의 것과 어떻게 다릅니까?",
					description : "안식교단은 안식일을 ‘구원의 표＇로써생명과 같이 여깁니다. 그래서 과도하게 ‘율법적 안식일 준수’의 모습으로 나타납니다. 그러나 본회에서는 ‘사람이 안식일을 위하여 있는 것이 아니라 안식일이 사람을 위하여 있는 것＇이라는 주님의 안식일 준수 대전제의 가르침을 기초로 ‘은혜 아래의 안식일 준수’를 추구합니다."
				},
			]
		},
		"08":
		{
			subject : "제도와 절기",
			faq :
			[
				{
					title : "참예수교회는 교회 운용에 어떤 제도를 채택하고 있습니까?",
					description : "본회는 교회의 소유권이 목회자나 장로 개인에게 귀속된 개교회제도로 운용되는 것이 아니라 교회의 재산과 인사권이 중앙 조직에서 통제되는 총회중심제도로 운용되고 있습니다. 따라서 교회의 재산은 총회에 등록되어 있으며 목회자는 일정 기간이 임지를 교체하고 순환됩니다. 이런 제도를 소유하고 있으므로 교회의 사유화를 통해 발생하는 성직자의 대형 재정 비리, 윤리적 타락의 상황이 조장 되지 않습니다."
				},
				{
					title : "참예수교회는 왜 성탄절(크리스마스)을 기념하지 않습니까?",
					description : "성탄절은 예수 그리스도의 진정한 탄생일이 아닙니다. 여느 피조물과 같이 그분의 탄생을 기념하는 것은 창조주를 피조물의 위치로 격하시키는 그릇된 행위 입니다. 뿐만 아니라 성탄절의 기원은 이교도의 태양신 숭배의 신앙을 배경으로 지켰던 동짓날 축제로부터 시작된 것입니다. 위와 같은 여러 가지 이유로 본회에서는 성탄절을 기념하지 않습니다."
				},
				{
					title : "참예수교회에서는 특별히 기념하는 절기가 있습니까?",
					description : "본회는 구약율법에 속한 어떤 절기나 신약 시대에 형성된 어떤 절기도 지키지 않습니다. 구약 시대의 유월절, 오순절, 초막절과 같은 절기들은 그리스도께서 십자가를 통해 성취하신 구속사의 그림자에 불과한 것으로 여기기 때문입니다. 또 일반 개신교의 맥추절, 추수감사절 등의 절기는 주님이 세우신 것도 아니고 지킬 것을 명령하신 일도 없으므로 성탄절과 같이 일체 지키지 않습니다."
				},
			]
		},
		"09":
		{
			subject : "종말론",
			faq :
			[
				{
					title : "참예수교회는 그리스도의 재림에 대해서 어떤견해를 가지고 있습니까?",
					description : "사도행전 1장에 승천 기사를 기록하고 있듯이 예수 그리스도께서 구름 가운데로 승천하신 것처럼 구름 가운데서 재림하실 것으로 믿고 있습니다. 여느 신흥 종교의 교단 교파처럼 어떤 인물이 이미 재림한 예수라던가 죽은 인물이 재림한 예수라는 주장은 전혀받아들이지 않습니다."
				},
				{
					title : "참예수교회는 시한부 종말론에 대해서 어떤견해를 가지고 있습니까?",
					description : "본회는 일반 개신교에서 그렇듯이 그리스도의 재림하실 미래가 있다는 것에 대해서는 믿으나 여느 신흥 종교에서처럼 특정한 날짜에 재림하신다는 시한부 종말론은 거부합니다. 그날이 임박하면 말일 가까왔다는 여러 가지 징조는 나타나겠으나 마태복음 24:36절에서 명시하는 바와 같이 정확한 그 날과 그 시는 아무도 모르고 오로지 하늘의 하나님만이 알고 계신다고 믿고 있습니다."
				},
			]
		}
	}

	const BOOKS = [
		// {
		// 	book_id: "001",
		// 	book_title: "성경의 핵심 진리",
		// 	book_img: "./images/book/book001.jpg",
		// 	book_pdf: "book001",
		// 	book_description: "원본인 중문의 ‘성경의 핵심 진리＇(구 성경요도)는 1960년에 처음 출판되었고 짧은 기간에 2천부가 판매되었다. 서술식이 아닌 요약식의 구성은 본서의 한계를 나타내고 있지만 순수한 성경의 가르침은 오늘날에도 진지하게 성경을 연구하려는 분들에게 좋은 안내자가 될 것이다."
		// },
		{
			book_id: "002",
			book_title: "성령론",
			book_img: "./images/book/book002.jpg",
			book_pdf: "book002",
			book_description: "성령론은 대만 참예수교회의 1세대 지도자요 교회 역사의 산 증인이신 사순도 장로님의 역작이다. 오랜 기간 ‘성령보’라는 월간지에 연재된 내용을 단행본으로 출간했고 1913년 한국 참예수교회 빛처럼 출판사에서 출간하게 되었다. 이는 본회의 성령론이 얼마나 성경적인지를 보여주고 성령에 대한 진리를 갈구하는 자들에게 좋은 길잡이가 될 것이다."
		},
		{
			book_id: "003",
			book_title: "참예수교회 한국설립 70주년 기념호",
			book_img: "./images/book/book003.jpg",
			book_pdf: "book003",
			book_description: "2018년은 참예수교회 한국 총회 선교 70주년이 되는 해이다. 이를 기념하여 참한총의 빛처럼 출판사에서는 그 동안 30주년, 30주년, 50주년 기념호를 총망라하여 70주년 기념호를 발행하게 되었다. 참예수교회의 역사에 대해서 궁금한 분들은 이 한 권으로 그 발자취를 더듬을 수 있을 것이다."
		},
		{
			book_id: "004",
			book_title: "한국 땅에 임한 성령의 역사",
			book_img: "./images/book/book004.jpg",
			book_pdf: "book004",
			book_description: "2018년은 참예수교회 한국 총회 선교 70주년이 되는 해이다. 이를 기념하여 참한총의 빛처럼 출판사에서는 70주년 기념호의 부록의 성격으로 본 사진집을 발행하게 되었다. 이 사진집은 과거를 추억하는 신도들에게 소중한 자료가 될 것이다."
		}
	]

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;
		// console.log(objs.menu_li);

		switch (currentScene) {
			case 0:
				console.log('0 play');
			break;
			case 1:     // 역사
                // objs.slides.style.position = 'fixed';
				console.log('1 play');
				//  let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
				//  objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
				if (scrollRatio <= 0.2) {
					objs.menu.style.opacity = calcValues(values.menu_opacity_in, currentYOffset);
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
				} else {
					objs.menu.style.opacity = 1;
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
				}


                if(scrollRatio <=0.2) {
					removeActive();
					objs.menu_li[0].classList.add('active_on');
					objs.tit1.style.opacity = calcValues(values.tit1_opacity_in, currentYOffset);
				
				} else if(scrollRatio <=0.32) {
					removeActive();
					objs.menu_li[1].classList.add('active_on');
                    objs.tit1.style.opacity = calcValues(values.tit1_opacity_out, currentYOffset);
                    objs.tit2.style.opacity = calcValues(values.tit2_opacity_in, currentYOffset);
				} else if(scrollRatio <=0.45) {
					removeActive();
					objs.menu_li[2].classList.add('active_on');
                    objs.tit2.style.opacity = calcValues(values.tit2_opacity_out, currentYOffset);
                    objs.tit3.style.opacity = calcValues(values.tit3_opacity_in, currentYOffset); 
				} else if(scrollRatio <=0.56) {
					removeActive();
					objs.menu_li[3].classList.add('active_on');
                    objs.tit3.style.opacity = calcValues(values.tit3_opacity_out, currentYOffset);
                    objs.tit4.style.opacity = calcValues(values.tit4_opacity_in, currentYOffset); 
				} else if(scrollRatio <=0.66) {
					removeActive();
					objs.menu_li[4].classList.add('active_on');
                    objs.tit4.style.opacity = calcValues(values.tit4_opacity_out, currentYOffset);
                    objs.tit5.style.opacity = calcValues(values.tit5_opacity_in, currentYOffset); 
				} else if(scrollRatio <=0.81) {
					removeActive();
					objs.menu_li[5].classList.add('active_on');
                    objs.tit5.style.opacity = calcValues(values.tit5_opacity_out, currentYOffset);
                    objs.tit6.style.opacity = calcValues(values.tit6_opacity_in, currentYOffset); 
                } else {
					removeActive();
					objs.tit6.style.opacity = calcValues(values.tit6_opacity_out, currentYOffset);
				} 
				
				function removeActive(){
					for (var i = 0; i < objs.menu_li.length; i++){
						objs.menu_li[i].classList.remove('active_on');
					}
				}
                
			break;
            case 2:		// 교회 분포 
				console.log('2 play');
				const spots = document.querySelectorAll('#map1 .spot');
				const spots2 = document.querySelectorAll('#map2 .spot');

				const interval1 = 0.8 / MAPSOPT1.length;
				const interval2 = 0.8 / MAPSOPT2.length;


				for(i = 0; i < spots.length; i++){
					spots[i].style.opacity = calcValues([0, 1, { start: interval1*i, end: interval1*1.05*i}], currentYOffset);
				}
				for(i = 0; i < spots2.length; i++){
					spots2[i].style.opacity = calcValues([0, 1, { start: interval2*i, end: interval2*1.05*i}], currentYOffset);
				}
				

				console.log("slide : ", sceneInfo[2].currentSlide);
				let currentSlide = sceneInfo[2].currentSlide;
				let fr_map = null;
				let map = null;
				let mapSpot = null;
				if(currentSlide == 0) {
					fr_map = objs.fr_map1;
					map = sceneInfo[2].objs.map1;
					mapSpot = MAPSOPT1;
					interval = interval1;
				} else {
					fr_map = objs.fr_map2;
					map = sceneInfo[2].objs.map2;
					mapSpot = MAPSOPT2;
					interval = interval2;
				}
				// 지도 size
				const map_size = map.style.width;
				
				let currentSpot = Math.round(currentYOffset/scrollHeight/interval);
				currentSpot = currentSpot >= mapSpot.length ? mapSpot.length -1 : currentSpot;
				currentSpot = currentSpot < 0 ? 0 : currentSpot;

				let angle = fr_map.scrollLeft + winWith;
				currentLeft = mapSpot[currentSpot].left * parseInt(map_size) * 0.01;

				if(currentSpot == 0) fr_map.scrollLeft = currentLeft - winWith / 2;

				if(currentLeft < fr_map.scrollLeft || currentLeft > angle) {
					console.log("넘어감");
					fr_map.scrollLeft = currentLeft - winWith / 2;
				} 


			break;
			case 3:
				console.log('3 play');
			break;
			case 4:
				console.log('4 play');
			break;
			case 5:
				console.log('5 play');
			break;
			case 6:
				console.log('6 play');
			break;
        }
	}


	function setCanvasImages() {
		let imgElem;
		for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
			imgElem = new Image();
			imgElem.src = `./video/dove/${1 + i}.png`;
			sceneInfo[1].objs.videoImages.push(imgElem);
		}
	}
	
	
    function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		console.log("resize");
		for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if (sceneInfo[i].type === 'normal')  {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            
            // 화면 슬라이드 폭 세팅
            if (sceneInfo[i].slides != null) {
                winWith = window.innerWidth;
                
                sceneInfo[i].objs.slidesWrap.style.width = winWith * sceneInfo[i].slides + 'px';
                sceneInfo[i].objs.slidesWrap.style.height = window.innerHeight+'px';
                
				let slideObj = sceneInfo[i].objs.slide;
                for(let i = 0; i < slideObj.length; i++){
					slideObj[i].style.width = winWith+'px';
					console.log("win : ", winWith+'px');
                }
                
            } 
		}

		yOffset = window.pageYOffset;

		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
        
		document.body.setAttribute('id', `show-scene-${currentScene}`);

		const heightRatio = window.innerHeight / 1080;
		sceneInfo[1].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

		
		// 기타 obj Size Setting
		sceneInfo[2].objs.map1.style.width = window.innerHeight * 1.8 + 'px';
		sceneInfo[2].objs.map2.style.width = window.innerHeight * 1 + 'px';
		
		setMapSpot(document.querySelector('#map1'), MAPSOPT1);
		setMapSpot(document.querySelector('#map2'), MAPSOPT2);

		setFaqContentList("01");
		setBelieveModal();
		setBookList();
	}

	/***************************** 
	교회분포
	******************************/
    
	// 지도상 Spot 세팅
	function setMapSpot(mapObj, mapSpotObj){
		for (let i = 0; i < mapSpotObj.length; i++){
			
			let objSpot = document.createElement('div')
			objSpot.classList.add('spot');

			// Label
			let objSpotLabel = document.createElement('div')
			objSpotLabel.classList.add('label');
			var t = document.createTextNode(mapSpotObj[i].name);
			objSpotLabel.appendChild(t);

			objSpot.appendChild(objSpotLabel);

			mapObj.appendChild(objSpot);
			objSpot.style.left = mapSpotObj[i].left + '%';
			objSpot.style.top = mapSpotObj[i].top + '%';

			// Label Show
			objSpot.addEventListener('mouseover', ()=>{
				objSpot.classList.add('show-label');
			});
			objSpot.addEventListener('mouseout', ()=>{
				objSpot.classList.remove('show-label');
			});

			// Modal Popup
			objSpot.addEventListener('click', ()=>{

				setChurchPopup(i)
				// 팝업 Select
				setChurchSelect(mapSpotObj);
				openModal('church-modal');
				sceneInfo[2].currentPop = i;
				console.log("pop_index : ", sceneInfo[2].currentPop);
			});
		}
	}

	// Select 교회선택
	function setChurchSelect(mapSpot){
		let select = document.querySelector('#church-modal .content02 #sel_church');
		for (let i = 0; i < mapSpot.length; i++){
			let opt = document.createElement('option');
			opt.appendChild(document.createTextNode(mapSpot[i].name));
			opt.value = i;
			select.appendChild(opt);
		}

		select.addEventListener('change', (e)=>{
			setChurchPopup(e.target.value);
		});
	}

	// Chruch Event
	function currentSlide(){
		let objs = sceneInfo[2].objs;
		let currentSlide = sceneInfo[2].currentSlide;
		
		objs.slidesWrap.style.left = currentSlide * winWith * -1 + 'px'
		document.querySelector('body, html').scrollTop = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight;
		console.log("scrollTop : ", sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight); 
		if(currentSlide < 1) {
			objs.btnPrev.style.display = 'none';
			objs.btnNext.style.display = 'block';
			
		} else {
			objs.btnPrev.style.display = 'block';
			objs.btnNext.style.display = 'none';
		}
	}

	// goto 한국교회
	sceneInfo[2].objs.btnNext.addEventListener('click', ()=>{
		sceneInfo[2].currentSlide ++;
		console.log("sceneInfo[2].currentSlide ++ : ", sceneInfo[2].currentSlide);
		currentSlide();
	});

	// goto 세계교회
	sceneInfo[2].objs.btnPrev.addEventListener('click', ()=>{
		sceneInfo[2].currentSlide --;
		console.log("sceneInfo[2].currentSlide ++ : ", sceneInfo[2].currentSlide);
		currentSlide();
	});

	// Popup 이전 교회
	sceneInfo[2].objs.btnChPrev.addEventListener('click', ()=>{
		let i = sceneInfo[2].currentPop - 1; 
		if (i < 0) i = mapSpot.length - 1;
		setChurchPopup(i)
	});

	// Popup 다음 교회
	sceneInfo[2].objs.btnChNext.addEventListener('click', ()=>{
		let i = sceneInfo[2].currentPop + 1; 
		if (i > mapSpot.length - 1) i = 0;
		setChurchPopup(i)
	});



	// 교회 상세 Popup 세팅
	function setChurchPopup(i){
		if(sceneInfo[2].currentSlide == 0) mapSpot = MAPSOPT1;
		else  mapSpot = MAPSOPT2;
		let pop = document.querySelector('#church-modal .content02');
		pop.querySelector('.church-name').innerText = mapSpot[i].name;
		pop.querySelector('.since').innerText = mapSpot[i].since;
		pop.querySelector('.site').innerText = mapSpot[i].site;
		pop.querySelector('.desc').innerText = mapSpot[i].desc;
		sceneInfo[2].currentPop = i;
	}

	/***************************** 
	우리의 믿음 
	******************************/

	// 우리의 믿음 모달 팝업 기본 셋
	function setBelieveModal(){
		let board = sceneInfo[3].objs.belief_board;
		board.forEach(function(el){
			el.addEventListener('click', function(e){setBeliefModal(e);});
		});
	}

	// 우리의 믿음 모달 팝업 데이터 처리
	function setBeliefModal(e){
		console.log("el : ", e.target.innerText);
		let num = e.target.innerText;
		let data = belief_data[num];

		sceneInfo[3].objs.modal_title.innerHTML = data.subject;
		sceneInfo[3].objs.modal_description.innerHTML = data.description;
		let image = document.createElement('img');
		image.src = data.image_path;
		sceneInfo[3].objs.modal_image.innerHTML = '';
		sceneInfo[3].objs.modal_image.append(image);

		sceneInfo[3].objs.youtube_list.innerHTML = '';

		for (let i = 0; i < data.youtube.length; i++){
			let li = document.createElement('li');
			let d = data.youtube[i];
			li.style.backgroundImage = "url('"+d.thumb+"')";
			sceneInfo[3].objs.youtube_list.append(li);
			let list = sceneInfo[3].objs.youtube_list.querySelectorAll('li');
			list[i].addEventListener('click', function(){setYoutubeView(d.url, d.thumb, d.title);});
		}

		openModal('belief_modal');
	}

	function setYoutubeView(url, image, title){
		let youtube = sceneInfo[3].objs.youtube;
		let ifr = sceneInfo[3].objs.youtube_ifr;
		ifr.src = url;
		youtube.style.display = 'block';
		console.log("youtube : ", url, image, title);
	}

	function closeYoutube(){
		let youtube = sceneInfo[3].objs.youtube;
		youtube.style.display = 'none';
		sceneInfo[3].objs.youtube_ifr.src = '';
	}

	/***************************** 
	FAQ
	******************************/

	// FAQ 컨텐츠 세팅
	function setFaqContentList(num){

		sceneInfo[4].objs.faq_subject.innerHTML = faq_data[num].subject;
		let faq_list = sceneInfo[4].objs.faq_list;
		faq_list.innerHTML = '';
		let faq = faq_data[num].faq;
		if(faq.length > 0){
			setFaqContent(null, faq[0].title, faq[0].description);
			for(let i=0; i < faq.length; i++){
				let li = document.createElement('li');
				li.innerHTML = faq[i].title;
				li.addEventListener("click", function() {setFaqContent(this, faq[i].title, faq[i].description);});
				if(i == 0) {
					li.classList.add('current');
				}
				faq_list.append(li);
			}
		}
	}

	function setFaqContent(obj, title, discription){
		console.log("title", title, discription);
		sceneInfo[4].objs.faq_title.innerHTML = title;
		sceneInfo[4].objs.faq_discription.innerHTML = discription;
		let faq_list = document.querySelectorAll('.faq .faq_list li');
		for(let i = 0; i < faq_list.length; i++){
			faq_list[i].classList.remove('current');
		}
		if(obj != null) obj.classList.add('current');
	}


	/***************************** 
	간행물
	******************************/

	function setBookList(){

		const book_list = sceneInfo[5].objs.book_list;
		BOOKS.forEach(function(book, idx){
			let li = document.createElement('li');
			const html = `<div class="image">
							<img src="${book.book_img}" />
						</div>
						<div class="title">${book.book_title}</div>
						<p>${book.book_description}</p>
						<a href="javascript:modalBook(${idx});" class="book_more">
						<span class="more_link">
							<span class="more_arr"></span>
							<span class="more_arr"></span>
							<span class="more_arr"></span>
							<span class="more_txt">샘플보기</span>
						</span>
						<span class="more_line"></span>
						`;
			li.innerHTML = html;
			book_list.append(li);
		});

	}

	function modalBook(idx){
		const pdf = document.querySelector('#pdf_view');
		pdf.src = `./pdf/web/viewer.html?fileNm=${BOOKS[idx].book_pdf}`;
		openModal('books_modal');
	}



	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;

		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			}
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (delayedYOffset < prevScrollHeight) {
			enterNewScene = true;
			// 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (enterNewScene) return;
        playAnimation();
	}
    
	function checkMenu() {
		if (yOffset > window.innerHeight - 50) {
			document.body.classList.add('local-nav-sticky');
		} else {
			document.body.classList.remove('local-nav-sticky');
		}
	}
    
	function calcValues(values, currentYOffset) {
		let rv;
		// 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;
        // console.log("scrollHeight : ", scrollHeight);
        // console.log("scrollRatio : ", scrollRatio);
		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}


	function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

		if (!enterNewScene) {
			if (currentScene === 1 ) {
				const currentYOffset = delayedYOffset - prevScrollHeight;
				const objs = sceneInfo[currentScene].objs;
				const values = sceneInfo[currentScene].values;
				let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
				if (objs.videoImages[sequence]) {
					objs.context.clearRect(0,0,objs.canvas.width, objs.canvas.height);
					objs.context.drawImage(objs.videoImages[sequence], 0, 0);
				} else {
				}
			}
		}

        // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
        // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
        if (delayedYOffset < 1) {
            scrollLoop();
            // sceneInfo[1].objs.canvas.style.opacity = 1;
            // sceneInfo[1].objs.context.drawImage(sceneInfo[1].objs.videoImages[0], 0, 0);
        }
        if (delayedYOffset < 1) {
            scrollLoop();
        }
        // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
        if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            let tempYOffset = yOffset;
            scrollTo(0, tempYOffset - 1);
        }

		rafId = requestAnimationFrame(loop);

		if (Math.abs(yOffset - delayedYOffset) < 1) {
			cancelAnimationFrame(rafId);
			rafState = false;
		}
	}
    
    window.addEventListener('load', () => {
		setLayout();

		// 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
            let siId = setInterval(() => {
                scrollTo(0, tempYOffset);
                tempYOffset += 5;

                if (tempScrollCount > 20) {
                    clearInterval(siId);
                }
                tempScrollCount++;
            }, 20);
        }

    
        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            scrollLoop();
            checkMenu();
  			
            if (!rafState) {
  				rafId = requestAnimationFrame(loop);
  				rafState = true;
  			}
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                
                sceneInfo[3].values.rectStartY = 0;  
            }
			setLayout();
            // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
            // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
            // 리사이즈에 일일이 대응시키기가 까다롭습니다.
            // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
            // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
            // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.
            if (currentScene === 3 && window.innerWidth > 450) {
                let tempYOffset = yOffset;
                let tempScrollCount = 0;
                if (tempYOffset > 0) {
                    let siId = setInterval(() => {
                        scrollTo(0, tempYOffset);
                        tempYOffset -= 50;

                        if (tempScrollCount > 20) {
                            clearInterval(siId);
                        }
                        tempScrollCount++;
                    }, 20);
                }
            }
        });

        window.addEventListener('orientationchange', () => {
            setTimeout(setLayout, 500);
		});

	});
	
	// 동적 이미지 세팅
	setCanvasImages();

    
// })();


function openModal(id){
	let modal = document.querySelector('#'+id);
	let backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');
	modal.appendChild(backdrop);
	modal.classList.add('show-modal');
	backdrop.addEventListener('click', ()=>{
		modal.classList.remove('show-modal');
		let backdrop = document.querySelector('#'+ id + ' .backdrop');
		backdrop.remove();
	});
}
