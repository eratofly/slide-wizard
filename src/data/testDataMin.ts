import {
	Color,
	Command,
	CommandHistory,
	Editor,
	Selection,
	Presentation,
	Slide,
} from '../model/types'

const bgcSlide1: Color = {
	hex: '#0000ff',
	opacity: 0.5,
}

const slide1: Slide = {
	id: 'a1b2c3',
	backgroundColor: bgcSlide1,
	slideObjects: [],
}

const presentation: Presentation = {
	slides: [slide1],
}

const selection: Selection = {
	slideId: 'a1b2c3',
}

const commands: Array<Command> = [{}]

const commandHistory: CommandHistory = {
	commands,
}

const editor: Editor = {
	presentation,
	selection,
	commandHistory,
}

export { editor as startEditor }
