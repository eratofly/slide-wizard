type Primitive = SlideObject & {
    type: 'Rectangle' | 'Ellipse' | 'Triangle',
    color: string,
    opacity: number,
    borderColor: string,
    borderWidth: number,
}

type Crop = {
    x: number,
    y: number,
    width: number,
    height: number,
}

type Image = SlideObject & {
    path: string,
    crop: Crop | null,
}

type Char = {
    value: string,
    fontFamily: string,
    color: string,
    size: number,
    opacity: number,
    bold: boolean,
    italic: boolean,
}

type TextObject = SlideObject & {
    chars: Array<Char>,
}

type SlideObject = {
    x: number,
    y: number,
    width: number,
    height: number,
    rotateAngle: number,
}

type Slide = {
    backgroundImage: string | null,
    backgroundColor: string,
    slideObjects: Array<TextObject | Image | Primitive>,
}

type Presentation = {
    title: string,
    slides: Array<Slide>,
}

type FocusState = {
    focusSlide: number,
    focusItem: number | null,
}

type Command = {}

type CommandHistory = {
    commands: Array<Command>,
}

type Editor = {
    presentation: Presentation,
    focusState: FocusState,
    commandHistory: CommandHistory,
}

export {
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
}