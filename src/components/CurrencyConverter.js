import { useState } from 'react'
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

function CurrenyConverter() {

	const currencies = ['BTC', 'ETH', 'USD', 'NZD', 'XRP', 'LTC', 'ADA']
	const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
	const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
	const [amount, setAmount] = useState(1)
	const [exchangeRate, setExchangeRate] = useState(0)
	const [result, setResult] = useState(0)

	const convert = () => {

		const options = {
			method: 'GET',
			url: 'https://alpha-vantage.p.rapidapi.com/query',
			params: { from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency },
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
				'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
			}
		};

		axios.request(options).then((response) => {
			setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
			setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
		}).catch((error) => {
			console.error(error)
		});
	}

	return (
		<div className="currency-converter">
			<h2 className='heading'>Currency Converter</h2>

			<div className="inputbox">
				<table>
					<tbody>
						<tr>
							<td>Primary Currency:</td>
							<td>
								<input
									className='inputs'
									type="number"
									name="currency-amount-1"
									value={amount}
									onChange={(event) => setAmount(event.target.value)}
								/>
							</td>
							<td>
								<select
									value={chosenPrimaryCurrency}
									name="currency-option-1"
									className="curreny-options"
									onChange={(event => setChosenPrimaryCurrency(event.target.value))}
								>
									{currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
								</select>
							</td>
						</tr>
						<br />
						<tr>
							<td>Secondary Currency:</td>
							<td>
								<input
									id='secondary-input'
									className='inputs'
									name="currency-amount-2"
									value={result}
									disabled = {true}
								/>
							</td>
							<td>
								<select
									value={chosenSecondaryCurrency}
									name="currency-option-2"
									className="curreny-options"
									onChange={(event => setChosenSecondaryCurrency(event.target.value))}
								>
									{currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
								</select>
							</td>
						</tr>
					</tbody>
				</table>

				<button id='convert-button' onClick={convert}>Convert</button>
			</div>

			<ExchangeRate 
			 exchangeRate = {exchangeRate}
			 chosenPrimaryCurrency = {chosenPrimaryCurrency}
			 chosenSecondaryCurrency = {chosenSecondaryCurrency}
			/>
		</div>
	)
}

export default CurrenyConverter
