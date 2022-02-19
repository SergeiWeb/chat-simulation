const chatElements = document.querySelectorAll('.chat-element')
const chatContainer = document.querySelector('.chat-container')

let count = 0

chatElements.forEach((elem, idx) => {
	elem.style.opacity = '0'
})

const scrollToSection = target => {
	const topOffset = 0
	const elementPosition = target.getBoundingClientRect().top
	const offsetPosition = elementPosition - topOffset

	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	})
}

const scrolDown = height => {
	chatContainer.scrollBy({
		top: height,
		behavior: 'smooth',
	})
}

const plus = () => {
	chatElements[count].style.cssText = `
		opacity: 0;
		display: flex !important;
	`

	setTimeout(() => {
		chatElements[count].style.opacity = '1'
		chatElements[count].classList.add('show')
		scrolDown(chatContainer.scrollHeight)
		count++
	}, 500)

	console.log(count)

	if (count < chatElements.length - 1) setTimeout(plus, +chatContainer.dataset.time || 2000)
}

if (chatElements.length) {
	plus()
}