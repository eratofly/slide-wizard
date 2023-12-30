import { Primitive, PrimitiveType } from '../../model/types'
import React from 'react'
import { RectangleView } from '../rectangleView/RectangleView'
import { EllipseView } from '../ellipseView/EllipseView'
import { TriangleView } from '../triangleView/TriangleView'

type PrimitiveObjectViewProps = {
	primitive: Primitive
	slideWidth: number
	onClick: () => void
}

function PrimitiveObjectView(props: PrimitiveObjectViewProps) {
	const { primitive, slideWidth, onClick } = props

	switch (primitive.primitiveType) {
		case PrimitiveType.RECTANGLE:
			return <RectangleView rectangle={primitive} slideWidth={slideWidth} onClick={onClick} />
		case PrimitiveType.ELLIPSE:
			return <EllipseView ellipse={primitive} slideWidth={slideWidth} onClick={onClick} />
		case PrimitiveType.TRIANGLE:
			return <TriangleView triangle={primitive} slideWidth={slideWidth} onClick={onClick} />
	}
}

export { PrimitiveObjectView }
