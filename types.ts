enum ObjectType {
    Text = 'text',
    Image = 'image',
    Primitive = 'primitive',
}

type SlideObject = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    rotateAngle: number,
}

type Color = {
    hex: string,
    opacity: number,
}
enum PrimitiveType {
    Rectangle = 'rectangle',
    Ellipse = 'ellipse',
    Triangle = 'triangle',
}

type Primitive = SlideObject & {
    objectType: ObjectType.Primitive,
    primitiveType: PrimitiveType,
    color: Color,
    borderColor: Color,
    borderWidth: number,
}

type Crop = {
    x: number,
    y: number,
    width: number,
    height: number,
}

type Image = SlideObject & {
    objectType: ObjectType.Image,
    path: string,
    crop?: Crop,
}

type Char = {
    value: string,
    fontFamily: string,
    color: Color,
    size: number,
    bold: boolean,
    italic: boolean,
}

type TextObject = SlideObject & {
    objectType: ObjectType.Text,
    chars: Array<Char>,
}

type Slide = {
    id: string,
    backgroundImage?: string,
    backgroundColor: Color,
    slideObjects: Array<TextObject | Image | Primitive>,
}

type Presentation = {
    title: string,
    slides: Array<Slide>,
}

type Selection = {
    slideId: string,
    objectId?: string,
}

type Command = {}

type CommandHistory = {
    commands: Array<Command>,
}

type Editor = {
    presentation: Presentation,
    selection: Selection,
    commandHistory: CommandHistory,
}

export {
    Editor,
    CommandHistory,
    Command,
    Selection,
    Presentation,
    Slide,
    TextObject,
    Char,
    Image,
    Crop,
    Primitive,
    PrimitiveType,
    SlideObject,
    Color,
    ObjectType,
}