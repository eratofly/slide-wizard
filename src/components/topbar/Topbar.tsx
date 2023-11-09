import React from 'react'
import styles from './Topbar.module.css'
import { Button } from '../button/Button'
import { PresentationTitle } from '../presentationTitle/PresentationTitle'
import { Toolbar } from '../toolbar/Toolbar'
import logo from '../../content/logo.svg'

function Topbar() {
	return (
		<div className={styles.topbar}>
			<div className={styles.titlebar}>
				<Button text="File" typeButton="main" />
				<PresentationTitle presentationName="vfvdvdvfdvfdvdfvdf" />
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<Toolbar />
		</div>
	)
}

export default Topbar
