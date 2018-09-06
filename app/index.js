'use strict'

require('dotenv').config()

const SlackBot = require('slackbots')
const axios = require('axios')
const Koa = require('koa')

// 서버 설정
const app = new Koa()
const port = process.env.PORT || 5000
app.use(async ctx => { // 웹에서 heroku 배포 url 접속시 표시할 내용
  ctx.body = '슬랙봇 실행중'
})
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

// 봇 초기화
const bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'tumblert'
})

// 시작 핸들러
bot.on('start', () => {
  const params = {
    icon_emoji: ':money_with_wings:'
  }

  bot.postMessageToChannel(
    'general',
    '비나이다, 비나이다, 펀딩 한 자리만 던져주십사..! @tumblert',
    params
  )
})

// Error Handler
bot.on('error', (err) => {
  console.error(err)
})

// Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message') {
    return;
  }

  handleMessage(data.text)
})

// 컨트롤러 불러오기
const ctrl = require('./controller')

// Response to Data
async function handleMessage (message) {
  if(message.includes(' chucknorris')) {
    const params = {
      icon_emoji: ':laughing:'
    }

    const joke = await ctrl.chuckJoke()
    await bot.postMessageToChannel(
      'general',
      `Chuck Norris : ${joke}`,
      params
    )

  } else if (message.includes(' yomama')) {
    const params = {
      icon_emoji: ':laughing:'
    }

    const joke = await ctrl.yomamaJoke()
    await bot.postMessageToChannel(
      'general',
      `yomama : ${joke}`,
      params
    )
  } else if (message.includes(' help')) {
    runHelp()
  }
}

// show help text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel(
    'general',
    `Type @tumblert with either 'chucknorris', 'yomama' to get a joke`
    , params
  )
}
