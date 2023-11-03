import React from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'

type TopbarProps = {
	presentationTitle?: string
}

function Topbar(props: TopbarProps) {
	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<Button text="File" typeButton="main" />
				<PresentationTitle presentationName={props.presentationTitle} />
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar />
		</div>
	)
}

export default Topbar
