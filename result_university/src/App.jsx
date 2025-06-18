import {useState} from "react";
import steps from './data.json'
import styles from './app.module.css'

function App() {
	const [activeIndex, setActiveIndex] = useState(0);

	const isCurrentStepLast = steps.length - 1 === activeIndex;
	const isCurrentStepFirst = 0 === activeIndex;

	const onNextStep = () => {
		if (!isCurrentStepLast) {
			setActiveIndex((value) => value + 1);
		}
	}

	const onPrevStep = () => {
		if (!isCurrentStepFirst) {
			setActiveIndex((value) => value - 1);
		}
	}

	const onSelectStep = (index) => {
		setActiveIndex(index);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li key={item.id} className={
								`${styles['steps-item']} ${index <= activeIndex ? styles.done : ''} ${index === activeIndex ? styles.active : ''}`
							}>
								<button onClick={() => onSelectStep(index)}
										className={styles['steps-item-button']}>{index + 1}</button>
								Шаг {index + 1}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button disabled={isCurrentStepFirst} onClick={onPrevStep} className={styles.button}>
							Назад
						</button>
						{isCurrentStepLast ? (
							<button onClick={() => {onSelectStep(0)}} className={styles.button}>
								Начать сначала
							</button>
						) : (
							<button onClick={onNextStep} className={styles.button}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App;
