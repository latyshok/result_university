import { useState } from "react";
import styles from "./app.module.css";

function isValidValue(value) {
	return value && value.length >= 3;
}

function formatDate(date) {
	return new Intl.DateTimeFormat("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false, // 24-часовой формат
	})
		.format(date)
		.replace(", ", " ");
}

function App() {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");

	const onInputButtonClick = () => {
		const promptValue = prompt(
			"Введите новое значение (минимум 3 символа):"
		)?.trim();
		if (isValidValue(promptValue)) {
			setValue(promptValue);
			setError("");
		} else {
			setError("Введенное значение должно содержать минимум 3 символа");
		}
	};

	const onAddButtonClick = () => {
		if (isValidValue(value)) {
			setList((list) => [...list, { id: Date.now(), value: value }]);
			setValue("");
			setError("");
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles["page-heading"]}>Ввод значения</h1>

			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "
				<output className={styles["current-value"]}>{value}</output>"
			</p>

			{error && <div className={styles.error}>{error}</div>}

			<div className={styles["buttons-container"]}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValidValue(value)}
				>
					Добавить в список
				</button>
			</div>

			<div className={styles["list-container"]}>
				<h2 className={styles["list-heading"]}>Список:</h2>
				{list.length ? (
					<ul className={styles.list}>
						{list.map(({ id, value }) => (
							<li key={id} className={styles["list-item"]}>
								{value} ({formatDate(id)})
							</li>
						))}
					</ul>
				) : (
					<p className={styles["no-margin-text"]}>
						Нет добавленных элементов
					</p>
				)}
			</div>
		</div>
	);
}

export default App;
