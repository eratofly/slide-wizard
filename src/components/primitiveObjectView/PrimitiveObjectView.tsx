import { Primitive, PrimitiveType } from '../../model/types'
import React from 'react'
import { RectangleView } from '../rectangleView/RectangleView'
import { EllipseView } from '../ellipseView/EllipseView'
import { TriangleView } from '../triangleView/TriangleView'

type PrimitiveObjectViewProps = {
	primitive: Primitive
	slideWidth: number
}

function PrimitiveObjectView(props: PrimitiveObjectViewProps) {
	const { primitive, slideWidth } = props

	let object
	switch (primitive.primitiveType) {
		case PrimitiveType.RECTANGLE:
			object = <RectangleView rectangle={primitive} slideWidth={slideWidth} />
			break
		case PrimitiveType.ELLIPSE:
			object = <EllipseView ellipse={primitive} slideWidth={slideWidth} />
			break
		case PrimitiveType.TRIANGLE:
			object = <TriangleView triangle={primitive} slideWidth={slideWidth} />
			break
	}

	return object
}

export { PrimitiveObjectView }
