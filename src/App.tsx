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
  { mbti: "ISTJ", beeType: "일벌", description: "묵묵히 일 잘하는 성실러, 시스템 충실 1등 시민벌" },
  { mbti: "ISFJ", beeType: "무해벌", description: "누구보다 다정하고 조용한 보호자 타입. 남을 배려하는 꿀성격, 무해벌 그자체!" },
  { mbti: "INFJ", beeType: "왕자벌", description: "조용하지만 깊이 있는 이상주의자, 품격 있는 사색벌." },
  { mbti: "INTJ", beeType: "왕벌", description: "멀리 보는 전략가, 침묵 속에서 계획 다 짜는 리더벌" },
  { mbti: "ISTP", beeType: "호박벌", description: "조용하지만 날카롭고 유연한 실전형 전사벌" },
  { mbti: "ISFP", beeType: "땅벌", description: "말없이 자연을 즐기는 힐링 타입, 감성 자연벌" },
  { mbti: "INFP", beeType: "벌벌", description: "세상 겁많고 순수한 상상력 풍부한 몽상벌" },
  { mbti: "INTP", beeType: "애기벌", description: "엉뚱한 천재, 질문과 상상력으로 가득한 뇌섹벌" },
  { mbti: "ESTP", beeType: "말벌", description: "행동 먼저, 생각은 나중! 스릴 즐기는 액션벌" },
  { mbti: "ESFP", beeType: "댄스벌", description: "무대 체질 파티피플! 춤과 끼 넘치는 하이텐션 벌" },
  { mbti: "ENFP", beeType: "허니벌", description: "상큼발랄 에너지 폭탄, 세상과 사람을 사랑하는 꿀벌" },
  { mbti: "ENTP", beeType: "싸움벌", description: "토론 대장! 항상 논리 싸움 준비 완료, 존재감 확실한 반항벌" },
  { mbti: "ESTJ", beeType: "장수말벌", description: "시스템을 장악하는 관리형 리더벌, 실용과 실행의 아이콘!" },
  { mbti: "ESFJ", beeType: "공주벌", description: "모두를 챙기고 아끼는 따뜻한 케어 리더, 꿀같은 인싸벌" },
  { mbti: "ENFJ", beeType: "스윗벌", description: "모두의 중심! 카리스마 있고 남 챙기는 감정 리더벌" },
  { mbti: "ENTJ", beeType: "여왕벌", description: "분석적이고 효율 중심, 조직의 큰 그림을 그리는 비전가득벌" }
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
                <h2 className="bee-type">{finalResult.beeType}</h2>
                <h3 className="mbti-type">{finalResult.mbti}</h3>
                <p className="bee-description">{finalResult.description}</p>
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
    </div>
  )
}

export default App
