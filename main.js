const chatElements = document.querySelectorAll('.chat-element')
const chatContainer = document.querySelector('.chat-container')
const htmlContain = document.querySelector('.html_contain')

if (htmlContain) {
	chatContainer.style.height = `${htmlContain.offsetHeight}px`
}

let count = 0
let array = []

chatElements.forEach((elem, idx) => {
	elem.style.opacity = '0'
	array.push(elem.dataset.timeout)
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
	}, Math.min(...array) / 2)

	if (count < chatElements.length - 1)
		setTimeout(plus, +chatElements[count].dataset.timeout)
}

if (chatElements.length) {
	plus()
}
