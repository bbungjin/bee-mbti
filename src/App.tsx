import { useState } from 'react'
import './App.css'

interface Question {
  id: number
  text: string
  option1: string
  option2: string
  type: 'EI' | 'SN' | 'TF' | 'JP'
}

interface Result {
  beeType: string
  mbti: string
  description: string
}

const questions: Question[] = [
  { 
    id: 1, 
    text: "꿀벌이 오늘도 바쁘게 날아다닌다.",
    option1: "🍯 \"저러다 과로로 쓰러지면 어쩌지…\" 걱정된다.",
    option2: "🌻 \"와 열정 멋져, 나도 뭔가 해야 할 것 같아!\" 의욕 뿜뿜",
    type: 'TF'
  },
  { 
    id: 2, 
    text: "꿀벌이 꽃 위에 앉았다. 그 순간 나는...",
    option1: "📸 사진부터 찍는다. 색감이 너무 예뻐서!",
    option2: "👀 멀찍이 피한다. 괜히 나도 쏠까봐 무서워…",
    type: 'SN'
  },
  { 
    id: 3, 
    text: "꿀벌 관련 강연에 참여하게 됐다.",
    option1: "✍️ 앞자리 앉아서 질문 준비 완료.",
    option2: "🫣 뒤에서 조용히 듣다 몰래 빠질 타이밍 계산 중…",
    type: 'EI'
  },
  { 
    id: 4, 
    text: "친구가 \"꿀벌을 보호하는 캠페인 할래?\" 제안했다.",
    option1: "🤝 좋지! 사람들도 만나고 꿀벌도 알리고~",
    option2: "🧠 벌… 꿀… 음… 자료조사부터 해보고 생각해보자",
    type: 'TF'
  },
  { 
    id: 5, 
    text: "꿀벌이 말을 걸어온다면?",
    option1: "🐝 \"너무 귀엽다! 너도 나랑 친구하자!\"",
    option2: "🐝 \"너… 말도 하니? 이건 과학적으로 설명이 안 되는데…\"",
    type: 'SN'
  },
  { 
    id: 6, 
    text: "꿀벌을 키워야 하는 상황이다.",
    option1: "🍯 이름도 지어주고 일지까지 작성함. 완전 정성.",
    option2: "🍯 그냥 잘 사는지만 확인하고 거리는 둔다.",
    type: 'JP'
  },
  { 
    id: 7, 
    text: "\"벌\" 하면 떠오르는 단어는?",
    option1: "💛 \"노란색, 꿀, 꽃, 귀여움\"",
    option2: "⚠️ \"침, 위협, 벌집 사고, 도망\"",
    type: 'SN'
  },
  { 
    id: 8, 
    text: "벌이 만든 꿀을 보면 나는…",
    option1: "🥄 한 숟갈 퍼서 맛본다. 천연 꿀 사랑해!",
    option2: "📚 \"이거 채밀 과정이 어떤 생태적 의미가 있는지 궁금한데…\"",
    type: 'SN'
  },
  { 
    id: 9, 
    text: "친구가 벌에게 쏘였다고 울면서 얘기한다!",
    option1: "🧤 \"벌이 왜 그랬는지 이유는 알아야 하지 않아?\"",
    option2: "🧸 \"헉 괜찮아? 너 얼마나 놀랐겠어...\"",
    type: 'TF'
  },
  { 
    id: 10, 
    text: "공원에서 벌 한 마리가 머리 위를 맴돈다!",
    option1: "🍃 \"벌이 날아다니네. 꽃이 근처에 있나 보군.\"",
    option2: "🔮 \"혹시... 오늘 징조가 안좋은?\"",
    type: 'SN'
  }
]

const results: Result[] = [
  { mbti: "ISTJ", beeType: "일벌", description: "🐝묵묵히 일 잘하는 성실러, 시스템 충실 1등 시민벌인 '일벌'\n\n🐝튼튼한 근면성실함으로 꿀벌 사회의 안정과 질서를 지키는 핵심 일꾼이에요.\n\n🐝책임감이 강하고 계획적이며, 맡은 바 업무를 끝까지 완수하는 신뢰받는 존재죠.\n\n🐝말없이도 꿀벌 무리 전체가 원활히 움직일 수 있도록 기초를 다지는 든든한 버팀목이에요." },
  { mbti: "ISFJ", beeType: "호박벌", description: "🐝누구보다 다정하고 조용한 보호자 타입, 꿀벌들 사이에서도 가장 온순한 '호박벌'\n\n🐝늘 주변 벌들의 안녕과 벌집의 평화를 세심하게 챙기며, 보이지 않는 곳에서 묵묵히 힘이 되어줘요.\n\n🐝겉으로는 소박해 보여도, 위급한 순간엔 강한 책임감으로 누구보다 헌신적으로 벌집을 지켜요.\n\n🐝사소한 변화에도 민감하게 반응하며, 모두가 편안하고 안전하게 지낼 수 있도록 배려해요.\n\n🐝따뜻한 마음과 꾸준한 노력으로 벌집 공동체의 든든한 버팀목이 되는 존재예요." },
  { mbti: "INFJ", beeType: "사색벌", description: "🐝조용하지만 깊이 있는 이상주의자, 품격 있는 '사색벌'\n\n🐝꽃밭 한가운데서도 세상의 흐름과 벌집의 미래를 고민하며, 꿀처럼 진득한 생각을 모아요.\n\n🐝겉으로는 온화하고 차분하지만, 마음속에는 확고한 신념과 비전을 품고 있어요.\n\n🐝다른 벌들의 마음을 읽고 공감하며, 갈등을 최소화하는 조정자 역할을 자처해요.\n\n🐝작은 날갯짓도 의미 있게 만들고자 하는, 벌집의 철학자이자 꿈꾸는 비전가예요." },
  { mbti: "INTJ", beeType: "전략벌", description: "🐝멀리 내다보는 날카로운 시선과 철저한 계획으로 벌집을 이끄는 '전략벌'\n\n🐝침묵 속에서 모든 수를 계산하며, 한 번의 날갯짓도 허투루 쓰지 않아요.목표를 정하면 꿀처럼 달성할 때까지 포기하지 않는 완벽주의자 성향이 있어요.\n\n🐝다른 벌들이 보지 못하는 미래를 내다보고, 위험은 미리 차단하며 기회를 잡아요.\n\n🐝말보다 행동과 성과로 신뢰를 쌓는, 군단의 보이지 않는 두뇌를 가졌어요." },
  { mbti: "ISTP", beeType: "전사벌", description: "🐝조용하지만 날카롭고, 어떤 상황에서도 유연하게 대처하는 실전형 '전사벌'\n🐝필요할 땐 신속하게 움직이며, 불필요한 소음 없이 목표를 달성합니다.\n🐝위기 상황에서도 침착함을 잃지 않고, 냉철한 판단으로 벌집을 지키는 든든한 방패이자 창이에요.\n🐝겉으로는 무심해 보여도, 위험이 닥치면 누구보다 빠르게 날아오르는 행동파예요." },
  { mbti: "ISFP", beeType: "힐링벌", description: "🐝조용하고 섬세한 감성으로 자연과 조화를 이루며 살아가는 '힐링벌'\n\n🐝순간의 아름다움을 소중히 여기고, 스스로의 감정을 깊이 느끼며 평화로운 일상을 추구해요.\n\n🐝바쁜 벌들 사이에서도 자신의 리듬을 지키며, 따뜻한 마음으로 주변에 작은 위로와 안정감을 선사하는 자연 속 힐러 같은 존재예요." },
  { mbti: "INFP", beeType: "몽상벌", description: "🐝세상 겁많고 순수한 상상력 풍부한 당신은 '몽상벌'\n\n🐝세상의 불완전함에 민감하지만, 그만큼 순수한 마음과 따뜻한 감성으로 세상을 바라봐요.\n\n🐝겁이 많아 조심스럽지만, 상상력과 창의성으로 자신만의 아름다운 세계를 만들어 가요.\n\n🐝조용히 생각에 잠기며, 언젠가 이상을 현실로 바꿀 희망을 품은 순수한 영혼을 가졌어요." },
  { mbti: "INTP", beeType: "탐험벌", description: "🐝엉뚱한 천재, 질문과 상상력으로 가득한 당신은 '탐험벌'\n\n🐝호기심과 논리로 가득 찬 탐험벌은 세상의 미스터리를 파헤치는 지적 모험가예요.\n\n🐝기존의 틀에 얽매이지 않고 새로운 아이디어와 이론을 자유롭게 탐구하며, 복잡한 문제를 깊이 파고드는 사고력의 소유자예요.\n\n🐝때로는 엉뚱하고 독특한 발상으로 주변을 놀라게 하지만, 그 모든 질문과 상상은 더 나은 이해와 발전을 위한 열정의 표현이에요." },
  { mbti: "ESTP", beeType: "스파크벌", description: "🐝어디서든 분위기와 에너지를 점화하는 spark벌\n\n🐝즉각적이고 대담한 행동으로 주위에 활력을 불어넣는 에너지 폭발자예요.\n\n🐝모험과 도전을 즐기며, 상황을 빠르게 파악해 즉흥적으로 움직이는 스릴을 즐겨요.\n\n🐝어떤 자리든 스파크처럼 번뜩이며 분위기를 뜨겁게 만들고, 주변 사람들에게 용기와 자신감을 전파하는 천생의 리더이자 분위기 메이커예요.\n\n🐝활기찬 순간을 사랑하는 진정한 에너지 충전소 역할이에요." },
  { mbti: "ESFP", beeType: "댄스벌", description: "🐝무대 체질 파티피플! 춤과 끼 넘치는 하이텐션인 당신은 '댄스벌'\n\n🐝언제 어디서나 모두의 시선을 사로잡는 무대의 주인공이에요.\n\n🐝활기찬 에너지와 타고난 끼로 분위기를 띄우고, 사람들과 어울리며 즐거움을 나눠요.\n\n🐝음악과 춤을 통해 자신의 감정을 표현하고, 주변에 긍정적인 에너지를 퍼뜨리며 모두가 함께 즐길 수 있는 순간을 만들어요." },
  { mbti: "ENFP", beeType: "허니벌", description: "🐝상큼발랄 에너지 폭탄, 세상과 사람을 사랑하는 당신은 '허니벌'\n\n🐝호기심 많고 따뜻한 마음으로 주변에 긍정적인 기운을 전하는 활력 충만한 사람이에요.\n\n🐝누구와도 금세 친구가 되고, 다양한 아이디어와 꿈으로 가득 차 있어 언제나 새로운 가능성을 탐색해요.\n\n🐝사람들의 이야기에 귀 기울이며 깊은 공감을 나누고, 세상을 더 밝고 따뜻하게 만드는 데 앞장서는 사랑 가득한 에너지 뿜뿜한 성격이에요." },
  { mbti: "ENTP", beeType: "싸움벌", description: "🐝토론 대장! 항상 논리 싸움 준비 완료, 존재감 확실한 당신은 '싸움벌'\n\n🐝날카로운 지성과 유머 감각으로 언제든 토론의 장을 지배하는 논쟁가예요.\n\n🐝새로운 아이디어를 거침없이 던지며 기존 틀을 깨뜨리는 반항적인 매력으로 주변을 끌어당겨요.\n\n🐝도전 정신이 강해 논리 싸움에서도 물러서지 않고, 상대방의 생각을 뒤흔드는 능수능란한 전략가이기도 해요.\n\n🐝활발한 존재감으로 언제나 중심에 서서 변화를 주도하는 다이나믹한 성격을 가졌어요." },
  { mbti: "ESTJ", beeType: "사령관벌", description: "🐝시스템을 장악하는 관리형 리더벌, 실용과 실행의 아이콘인 당신은 '사령관벌'\n\n🐝단호하고 강한 리더십으로 벌집 전체를 체계적으로 운영하는 사령관같은 성격이에요.\n\n🐝현실적이고 실용적인 판단으로 목표 달성을 위해 명확한 계획을 세우고, 조직의 규칙과 질서를 엄격히 지키며 실행에 옮기는 데 탁월해요.\n\n🐝맡은 바 책임을 철저히 완수하며, 주변 벌들에게 신뢰받는 든든한 관리자이자 강력한 추진력을 가졌어요." },
  { mbti: "ESFJ", beeType: "하모니벌", description: "🐝모두를 챙기고 아끼는 따뜻한 케어 리더, 꿀같은 인싸인 당신은 '하모니벌'\n\n🐝타인의 감정에 세심히 공감하며 주변 분위기를 부드럽게 만드는 따뜻한 사회적 연결고리예요.\n\n🐝항상 주변 벌들의 필요를 먼저 살피고, 조화와 협력을 위해 노력하는 마음씨 좋은 케어 리더기도 해요.\n\n🐝사교적이고 친근한 매력으로 누구와도 금세 친구가 되어, 벌집 전체에 화합과 웃음을 선사하는 꿀처럼 달콤한 성격이에요." },
  { mbti: "ENFJ", beeType: "스윗벌", description: "🐝모두의 중심! 카리스마 있지만 감성도 있는 감성 리더벌인 당신은 '스윗벌'\n\n🐝강렬한 카리스마와 따뜻한 공감 능력을 동시에 지닌 진정한 리더예요.\n\n🐝주변 벌들의 잠재력을 발견해 이끌고, 모두가 함께 성장할 수 있도록 세심하게 배려해요.\n\n🐝어려운 순간에도 긍정적인 에너지로 무리를 하나로 묶는 스윗하고 든든한 중심축이에요." },
  { mbti: "ENTJ", beeType: "여왕벌", description: "🐝분석적이고 효율 중심, 조직의 큰 그림을 그리는 당신은 비전가득한 '여왕벌'\n🐝강력한 리더십과 전략적 사고로 벌집 전체를 이끄는 조직의 중심이에요.\n🐝목표 달성을 위해 철저하게 계획을 세우고, 효율성을 극대화하는 데 집중해요.\n🐝결단력과 추진력으로 어려운 상황도 과감히 헤쳐 나가며, 미래를 내다보는 비전을 품고 무리를 하나로 묶는 진정한 리더예요." }
]

function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'question' | 'result'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{type: string, answer: boolean}[]>([])
  const [animating, setAnimating] = useState(false)
  const [animClass, setAnimClass] = useState('')

  // 환경 매거진 모달 상태
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  
  // 결과 상세보기 모달 상태
  const [isResultDetailOpen, setIsResultDetailOpen] = useState(false)

  const handleStart = () => {
    setCurrentStep('question')
    setCurrentQuestion(0)
    setAnswers([])
    setAnimClass('slide-in-right')
    setTimeout(() => setAnimClass(''), 240)
  }

  const handleAnswer = (answer: boolean) => {
    if (animating) return

    setAnswers(prev => {
      const next = [...prev]
      if (currentQuestion < next.length) {
        next[currentQuestion] = { type: questions[currentQuestion].type, answer }
      } else {
        next.push({ type: questions[currentQuestion].type, answer })
      }
      return next
    })

    setAnimating(true)
    setAnimClass('slide-out-left')
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(q => q + 1)
        setAnimClass('slide-in-right')
        setTimeout(() => { setAnimClass(''); setAnimating(false) }, 240)
      } else {
        setCurrentStep('result')
        setAnimating(false)
        setAnimClass('')
      }
    }, 220)
  }

  const handlePrev = () => {
    if (animating || currentQuestion === 0) return
    setAnimating(true)
    setAnimClass('slide-out-right')
    setTimeout(() => {
      setCurrentQuestion(q => q - 1)
      setAnimClass('slide-in-left')
      setTimeout(() => { setAnimClass(''); setAnimating(false) }, 240)
    }, 220)
  }

  const calculateResult = (answers: {type: string, answer: boolean}[]): Result => {
    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0
    answers.forEach(answer => {
      if (answer.type === 'EI') {
        if (answer.answer) E++; else I++
      } else if (answer.type === 'SN') {
        if (answer.answer) S++; else N++
      } else if (answer.type === 'TF') {
        if (answer.answer) F++; else T++
      } else if (answer.type === 'JP') {
        if (answer.answer) J++; else P++
      }
    })

    const mbti = [
      E > I ? 'E' : 'I',
      S > N ? 'S' : 'N',
      T > F ? 'T' : 'F',
      J > P ? 'J' : 'P'
    ].join('')

    return results.find(r => r.mbti === mbti) || results[0]
  }

  const handleRestart = () => {
    setCurrentStep('start')
    setCurrentQuestion(0)
    setAnswers([])
    setAnimating(false)
    setAnimClass('')
  }

  const openNewsletter = () => {
    setIsNewsletterOpen(true)
    setEmail('')
    setEmailError('')
  }
  const closeNewsletter = () => {
    setIsNewsletterOpen(false)
  }
  
  const openResultDetail = () => {
    setIsResultDetailOpen(true)
  }
  const closeResultDetail = () => {
    setIsResultDetailOpen(false)
  }
  const submitNewsletter = () => {
    const ok = /.+@.+\..+/.test(email)
    if (!ok) {
      setEmailError('올바른 이메일을 입력해주세요.')
      return
    }
    alert('환경 매거진 구독이 신청되었습니다!')
    setIsNewsletterOpen(false)
  }

  const progress = currentStep === 'question' ? ((currentQuestion + 1) / questions.length) * 100 : 0
  const finalResult = currentStep === 'result' ? calculateResult(answers) : null

  return (
    <div className="app">
      <div className="card">
        {currentStep === 'start' && (
          <>
            <div className="header">
              <h1 className="title">🐝 꿀비티아이</h1>
              <img src={`${import.meta.env.BASE_URL}bee_logo.png`} alt="Bee Logo" className="bee-logo" />
              <img src={`${import.meta.env.BASE_URL}cute_bee-removebg-preview.png`} alt="Cute Bee" className="cute-bee" />
              <p className="subtitle">10가지 질문으로<br />당신의 벌 성향을 알아보세요!</p>
            </div>
            <div className="start-screen">
              <div className="start-inner" />
              <div className="start-cta">
                <button className="start-button" onClick={handleStart}>시작하기</button>
              </div>
            </div>
          </>
        )}

        {currentStep === 'question' && (
          <>
            <div className="header">
              <div className="header-row">
                <button className="back-button" onClick={handlePrev} disabled={animating || currentQuestion === 0} aria-label="이전으로">←</button>
                <div className="title" />
                <div className="header-spacer" />
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="progress-text">{currentQuestion + 1} / {questions.length}</span>
              </div>
            </div>
            <div className={`main ${animating ? 'is-animating' : ''}`}>
              <div className={`question-viewport`}>
                <div className={`question-panel ${animClass}`}>
                  <div className="question-block">
                    <div className="q-number">Q{currentQuestion + 1}</div>
                    <h2 className="q-text">{questions[currentQuestion].text}</h2>
                  </div>
                  <div className="answer-buttons">
                    <button
                      className="answer-button option1-button"
                      onClick={() => handleAnswer(true)}
                      title={questions[currentQuestion].option1}
                    >
                      {questions[currentQuestion].option1}
                    </button>
                    <button
                      className="answer-button option2-button"
                      onClick={() => handleAnswer(false)}
                      title={questions[currentQuestion].option2}
                    >
                      {questions[currentQuestion].option2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 'result' && finalResult && (
          <>
            <div className="header">
              <div className="header-row">
                <button className="back-button" onClick={() => setCurrentStep('question')} aria-label="다시 보기">←</button>
                <h1 className="title">결과</h1>
                <div className="header-spacer" />
              </div>
            </div>
            <div className="result-screen">
              <div className="result-content">
                  <img 
                    src={`${import.meta.env.BASE_URL}mbti-bee/${finalResult.mbti.toLowerCase()}.png`} 
                    alt={`${finalResult.mbti} 벌`} 
                    className="result-bee-image"
                  />
                <div className="result-header">
                  <div className="result-text">
                    <h2 className="bee-type">{finalResult.beeType}</h2>
                    <h3 className="mbti-type">{finalResult.mbti}</h3>
                  </div>
                </div>
                <div className="bee-description-container">
                  <p className="bee-description">
                    {finalResult.description.split('\n')[0]}...
                  </p>
                  <button className="detail-button" onClick={openResultDetail}>
                    자세히 보기
                  </button>
                </div>
              </div>
              <div className="restart-wrap">
                <button className="restart-button" onClick={handleRestart}>다시 테스트하기</button>
              </div>
              <div className="newsletter-wrap">
                <button className="newsletter-button" onClick={openNewsletter}>환경 매거진 받기</button>
              </div>
            </div>
          </>
        )}
      </div>

      {isNewsletterOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h3>환경 매거진 구독</h3>
              <button className="modal-close" onClick={closeNewsletter} aria-label="닫기">×</button>
            </div>
            <div className="modal-body">
              <label className="input-label" htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                className={`input ${emailError ? 'input-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
              />
              {emailError && <p className="input-help">{emailError}</p>}
            </div>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={closeNewsletter}>취소</button>
              <button className="modal-btn primary" onClick={submitNewsletter}>구독하기</button>
            </div>
          </div>
        </div>
      )}

      {isResultDetailOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal result-detail-modal">
            <div className="modal-header">
              <h3>{finalResult?.beeType} - {finalResult?.mbti}</h3>
              <button className="modal-close" onClick={closeResultDetail} aria-label="닫기">×</button>
            </div>
            <div className="modal-body">
              <div className="result-detail-content">
                <img 
                  src={`${import.meta.env.BASE_URL}mbti-bee/${finalResult?.mbti.toLowerCase()}.png`} 
                  alt={`${finalResult?.mbti} 벌`} 
                  className="detail-bee-image"
                />
                <div className="detail-text">
                  <h4 className="detail-bee-type">{finalResult?.beeType}</h4>
                  <p className="detail-description">{finalResult?.description}</p>
                </div>
              </div>
            </div>
            {/* <div className="modal-actions">
              <button className="modal-btn primary" onClick={closeResultDetail}>닫기</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
