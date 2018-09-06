const SlackBot = require('slackbots')
const axios = require('axios')
const express = require('express')

const app = express()
app.set('port', process.env.PORT || 5000)
app.get('/', (res, req) => {
  res.body = "슬랙 봇 실행중"
})
app.listen(process.env.PORT || port)

require('dotenv').config()

// 봇 초기화
const bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'tumblert'
})

// 스타트 핸들러 
bot.on('start', () => {
  const params = {
    icon_emoji: ':money_with_wings:'
  }

  bot.postMessageToChannel(
    'general', 
    '비나이다, 비나이다, 굿즈 하나만 던져주십사ㅜㅜ @tumblert',
    params)
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

// Response to Data
function handleMessage (message) {
  if(message.includes(' chucknorris')) {
    chuckJoke()
  } else if (message.includes(' yomama')) {
    yoMamaJoke()
  } else if (message.includes(' help')) {
    runHelp()
  }
}

// Tell a Chuck Norris Joke
function chuckJoke () {
  const url = "http://api.icndb.com/jokes/random"
  axios.get(url)
    .then(res => {
      const joke = res.data.value.joke
      
      const params = {
        icon_emoji: ':laughing:'
      }

      bot.postMessageToChannel(
        'general',
        `Chuck Norris : ${joke}`,
        params
      )

    })
}

// Tell a yoMamaJoke
function yoMamaJoke () {
  const url = "https://api.yomomma.info/"
  axios.get(url)
    .then(res => {
      const joke = res.data.joke

      const params = {
        icon_emoji: ':laughing:'
      }

      bot.postMessageToChannel(
        'general',
        `yoMama : ${joke}`,
        params
      )

    })
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
