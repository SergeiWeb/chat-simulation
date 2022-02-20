const chats = document.querySelectorAll('.chat')
const htmlContain = document.querySelector('.html__contain')

let COUNTER = 0
let res = 0

chats.forEach((chat, id) =>
	chat.setAttribute('data-play', id === 0 ? true : false)
)

const chatFunc = () => {
	res = 0

	const chatElements = chats[COUNTER].querySelectorAll('.chat-element')
	const chatContainer = chats[COUNTER].querySelector('.chat-container')

	chats.forEach(chat => {
		if (chat.dataset.play === 'false') {
			chat.style.display = 'none'

			chat.classList.remove('hide')

			document.querySelectorAll('.chat-element').forEach(chaEl => {
				chaEl.classList.remove('show')
				chaEl.style.cssText = `
						display: none !important;
					`
			})
		} else {
			chat.style.display = 'flex'
		}
	})

	if (htmlContain) {
		chatContainer.style.height = `${htmlContain.offsetHeight}px`
	}

	let count = 0
	let array = []

	chatElements.forEach((elem, idx) => {
		elem.style.opacity = '0'
		array.push(elem.dataset.timeout)
	})

	array.map(sec => (res += +sec))

	const scrolDown = height => {
		chatContainer.scrollBy({
			top: height,
			behavior: 'smooth',
		})
	}

	const showMessage = () => {
		chatElements[count].style.cssText = `
			opacity: 0;
			display: flex !important;
		`

		setTimeout(() => {
			chatElements[count].style.opacity = '1'
			chatElements[count].classList.add('show')
			scrolDown(chatContainer.scrollHeight)
			count++
		}, Math.min(...array) / 2)

		if (count < chatElements.length - 1) {
			setTimeout(showMessage, +chatElements[count].dataset.timeout)
		}
	}

	if (chatElements.length) {
		showMessage()
	}

	COUNTER++

	if (!chats[COUNTER]) {
		COUNTER = 0
	}

	setTimeout(() => {
		chats.forEach(el => (el.dataset.play = false))
		if (chats[COUNTER - 1]) {
			chats[COUNTER - 1].classList.add('hide')
		}

		setTimeout(() => {
			chats[COUNTER].display = 'flex'
			chats[COUNTER].dataset.play = true
			chatFunc()
		}, 1000)
	}, res)
}

chatFunc()
