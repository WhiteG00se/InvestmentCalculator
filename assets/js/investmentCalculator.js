document.getElementById("calculateSavings").onsubmit = (event) => {
	event.preventDefault()
	calculateSavings()
}

document.getElementById("calculatePayout").onsubmit = (event) => {
	event.preventDefault()
	calculatePayout()
}

function calculatePayout() {
	const yearlyPayoutRate = Number(document.getElementById("yearlyPayoutRate").value) / 100
	let myTable = document.getElementById("payoutCalculatorTable")
	for (var i = 1, row; (row = myTable.rows[i]); i++) {
		let currentPortfolieSize = myTable.rows[i].cells[0].innerHTML
		console.log(currentPortfolieSize)
		myTable.rows[i].cells[1].innerHTML = Math.round((currentPortfolieSize * yearlyPayoutRate) / 12)
	}
}

function calculateSavings() {
	const startAmount = Number(document.getElementById("startAmount").value)
	const monthlySavings = Number(document.getElementById("monthlySavings").value)
	const yearlyReturns = Number(document.getElementById("yearlyReturns").value) / 100
	const monthlyReturns = Math.pow(yearlyReturns + 1, 1 / 12)
	const yearsToConsider = Number(document.getElementById("yearsToConsider").value)
	const monthToConsider = yearsToConsider * 12
	const outputInterval = 12 // in months

	class Month {
		constructor(currentMonth) {
			if (currentMonth > 0) {
				this.savingsAfterXMonths = (months[currentMonth - 1].savingsAfterXMonths + monthlySavings) * monthlyReturns
			} else {
				this.savingsAfterXMonths = startAmount
			}
			this.monthlyReturnsAfterXMonths = this.savingsAfterXMonths * (monthlyReturns - 1)
		}
	}

	let months = []
	for (let i = 0; i <= monthToConsider; i++) {
		months[i] = new Month(i)
	}
	let results = document.getElementById("results")
	results.innerHTML = ""
	let newLi = document.createElement("div")
	results.appendChild(newLi)
	for (let i = 0; i <= monthToConsider; i += outputInterval) {
		let newLi = document.createElement("div")
		newLi.className += "list-group-item list-group-item-action"
		newLi.innerHTML = `savings after ${i / 12} year(s) : ${Math.round(months[i].savingsAfterXMonths)}€
		<br> monthly returns after ${i / 12} year(s) : ${Math.round(months[i].monthlyReturnsAfterXMonths)}€`
		results.appendChild(newLi)
	}
}
