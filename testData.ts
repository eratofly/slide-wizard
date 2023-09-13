import {
    Editor,
    CommandHistory,
    Command,
    FocusState,
    Presentation,
    Slide,
    SlideObject,
    TextObject,
    Char,
    Image,
    Crop,
    Primitive,
} from './types'

const rect: Primitive = {
    x: 11,
    y: 3,
    width: 5,
    height: 11,
    rotateAngle: 180,
    type: 'Rectangle',
    color: '#ff00ff',
    opacity: 0.5,
    borderColor: '#034fff',
    borderWidth: 1,
}

const triangle: Primitive = {
    x: 9,
    y: 8,
    width: 7,
    height: 6,
    rotateAngle: 5,
    type: 'Triangle',
    color: '#444444',
    opacity: 0.3,
    borderColor: '#222222',
    borderWidth: 1,
}

const circle: Primitive = {
    x: 1,
    y: 0,
    width: 51,
    height: 34,
    rotateAngle: 0,
    type: 'Ellipse',
    color: '#fffff0',
    opacity: 0,
    borderColor: '#000fff',
    borderWidth: 3,
}

const imageCrop: Crop = {
    x: 15,
    y: 0,
    width: 60,
    height: 90,
}

const image: Image = {
    x: 100,
    y: 50,
    width: 30,
    height: 1,
    rotateAngle: 90,
    path: 'https://',
    crop: imageCrop,
}

const slide2: Slide = {
    backgroundImage: 'https://',
    backgroundColor: '#ffffff',
    slideObjects: [image, rect, triangle],
}

const letterB: Char = {
    value: 'b',
    fontFamily: 'Arial',
    color: '#625678',
    size: 20,
    opacity: 0.5,
    bold: false,
    italic: true,
}

const letterA: Char = {
    value: 'A',
    fontFamily: 'Arial',
    color: '#625678',
    size: 14,
    opacity: 0,
    bold: true,
    italic: false,
}

const textObject: TextObject = {
    x: 10,
    y: 20,
    width: 50,
    height: 14,
    rotateAngle: 0,
    chars: [letterA, letterB],
}

const slide1: Slide = {
    backgroundImage: null,
    backgroundColor: '#000000',
    slideObjects: [textObject, circle],
}

const presentation: Presentation = {
    title: 'The best presentation',
    slides: [slide1, slide2],
}

const focusState: FocusState = {
    focusSlide: 0,
    focusItem: null,
}

const commands: Array<Command> = [{}]

const commandHistory: CommandHistory = {
    commands: commands,
}

const editor: Editor = {
    presentation: presentation,
    focusState: focusState,
    commandHistory: commandHistory,
}